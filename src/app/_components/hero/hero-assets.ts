import "server-only";

import fs from "node:fs";
import path from "node:path";

import { type HeroAssets } from "~/config/hero";

const PUBLIC = path.join(process.cwd(), "public");

/** Reads PNG dimensions from the IHDR chunk so next/image gets explicit width/height (no CLS). */
function pngSize(file: string) {
  const buf = fs.readFileSync(file);
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

/**
 * Optional hero assets. Drop these into /public/hero and they are picked up automatically:
 *   hero-visual.png   transparent cut-out for the persistent centre visual
 */
export function getHeroAssets(): HeroAssets {
  const visualFile = path.join(PUBLIC, "hero", "hero-visual.png");
  return {
    visual: fs.existsSync(visualFile)
      ? { src: "/hero/hero-visual.png", ...pngSize(visualFile) }
      : null,
  };
}
