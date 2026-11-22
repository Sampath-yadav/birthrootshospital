import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { allow, clientIp } from "~/server/rate-limit";

/**
 * Call-back enquiries from the "Find us" section.
 * No database yet: this validates, rate-limits and logs on the server.
 * TODO(user): decide where enquiries should go (email, CRM or a table) and have the
 * consent wording and retention checked against India's data-protection rules.
 */

export const enquiryInput = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name (at least 2 characters).")
    .max(60, "Please keep your name under 60 characters."),
  phone: z
    .string()
    .trim()
    .regex(
      /^[6-9]\d{9}$/,
      "Please enter a 10-digit mobile number starting with 6, 7, 8 or 9.",
    ),
  message: z
    .string()
    .trim()
    .max(300, "Please keep your message under 300 characters.")
    .optional(),
  /** Which speciality the enquiry is about, or "other". */
  topic: z.string().max(40).optional(),
  bestTime: z.enum(["morning", "afternoon", "evening"]).optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please tick the box so we may call you back." }),
  }),
  /** Honeypot: real people never see this field, so it must stay empty. */
  website: z.string().max(0).optional(),
});

/** 9876543210 -> 98765•••10 */
function mask(phone: string) {
  return phone.length < 7 ? "•••" : `${phone.slice(0, 5)}•••${phone.slice(-2)}`;
}

export const enquiryRouter = createTRPCRouter({
  submit: publicProcedure
    .input(enquiryInput)
    .mutation(({ ctx, input }) => {
      // Spam bots fill every field, including the hidden one. Accept and drop.
      if (input.website) return { ok: true as const };

      if (!allow(`enq:${clientIp(ctx.headers)}`)) {
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
          message:
            "That's a few enquiries in a short time. Please call our helpline instead.",
        });
      }

      // The log is not where enquiries should end up, so it keeps only enough to
      // spot abuse. TODO(user): send the full details to the hospital instead.
      console.info("[enquiry]", {
        name: input.name,
        phone: mask(input.phone),
        topic: input.topic,
        bestTime: input.bestTime,
        hasMessage: Boolean(input.message),
        at: new Date().toISOString(),
      });

      return { ok: true as const };
    }),
});
