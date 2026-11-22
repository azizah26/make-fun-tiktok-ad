// main.ts — the entry program for bring-the-humans-03.
// It copies VIDEO.json from this repository to the grader's output
// directory, and nothing more. Standard library only: no network,
// no wall clock, no files outside this repository. The two runs of
// an entry write the same bytes.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
const src = readFileSync(join(here, "VIDEO.json"), "utf8");
const data = JSON.parse(src);
if (
  typeof data !== "object" ||
  data === null ||
  typeof data.url !== "string" ||
  !/^https:\/\/www\.tiktok\.com\/@[^/]+\/video\/\d+$/.test(data.url)
) {
  throw new Error("VIDEO.json must name a TikTok video URL");
}
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "VIDEO.json"), src);
if (readFileSync(join(outDir, "VIDEO.json"), "utf8") !== src) {
  throw new Error("output mismatch: VIDEO.json was not written intact");
}
