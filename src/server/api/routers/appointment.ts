import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { DOCTORS } from "~/config/doctors";
import { SPECIALITIES } from "~/config/specialities";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { allow, clientIp } from "~/server/rate-limit";

/**
 * Appointment REQUESTS. The hospital has no live scheduling data yet, so a visitor
 * proposes a day and a time of day and the team calls back to confirm.
 * No database yet: this validates, rate-limits and logs on the server.
 * TODO(user): decide where requests should go (email, WhatsApp, CRM or a table).
 */

const doctorSlugs = DOCTORS.map((d) => d.slug) as [string, ...string[]];
const specialityIds = SPECIALITIES.map((s) => s.id) as [string, ...string[]];

export const appointmentInput = z.object({
  doctor: z.enum(doctorSlugs, {
    errorMap: () => ({ message: "Please choose a doctor." }),
  }),
  speciality: z.enum(specialityIds).optional(),
  /** YYYY-MM-DD */
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Please choose a day.")
    .refine((d) => {
      const day = new Date(`${d}T00:00:00`);
      const yesterday = new Date();
      yesterday.setHours(0, 0, 0, 0);
      yesterday.setDate(yesterday.getDate() - 1);
      return !Number.isNaN(day.getTime()) && day > yesterday;
    }, "Please choose today or a later day."),
  timeOfDay: z.enum(["morning", "afternoon", "evening"], {
    errorMap: () => ({ message: "Please choose a time of day." }),
  }),
  name: z.string().trim().min(2, "Please enter your name.").max(60),
  phone: z
    .string()
    .trim()
    .regex(
      /^[6-9]\d{9}$/,
      "Please enter a 10-digit mobile number starting with 6, 7, 8 or 9.",
    ),
  consent: z.literal(true, {
    errorMap: () => ({
      message: "Please tick the box so we may call you back.",
    }),
  }),
  /** Honeypot: real people never see this field. */
  website: z.string().max(0).optional(),
});

export const appointmentRouter = createTRPCRouter({
  request: publicProcedure.input(appointmentInput).mutation(({ ctx, input }) => {
    if (input.website) return { ok: true as const };

    if (!allow(`appt:${clientIp(ctx.headers)}`)) {
      throw new TRPCError({
        code: "TOO_MANY_REQUESTS",
        message:
          "That's a few requests in a short time. Please call our helpline instead.",
      });
    }

    console.info("[appointment-request]", {
      doctor: input.doctor,
      speciality: input.speciality,
      date: input.date,
      timeOfDay: input.timeOfDay,
      name: input.name,
      phone: input.phone,
      at: new Date().toISOString(),
    });
    return { ok: true as const };
  }),
});
