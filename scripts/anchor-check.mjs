import { chromium } from "playwright";

/**
 * Clicks each nav anchor and reports where the section title actually lands
 * relative to the bottom of the sticky nav. A healthy gap is roughly 16-48px;
 * a large number means the anchor is dropping the reader onto empty space.
 */
const BASE = process.argv[2] ?? "http://localhost:3000";
const OUT = process.argv[3];
const IDS = ["about", "skills", "experience", "work", "certifications", "contact"];

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
  reducedMotion: "reduce", // kill smooth scroll so measurements settle instantly
});
const page = await ctx.newPage();
let failures = 0;

for (const id of IDS) {
  await page.goto(`${BASE}/#${id}`, { waitUntil: "networkidle" });
  await page.evaluate(() =>
    document.querySelectorAll(".reveal").forEach((n) => n.setAttribute("data-visible", "true")),
  );
  await page.waitForTimeout(400);

  const m = await page.evaluate((anchorId) => {
    const navBottom = document.querySelector("header")?.getBoundingClientRect().bottom ?? 0;
    const target = document.getElementById(anchorId);
    // Measure the anchor itself — section internals nest differently, so
    // hunting for a heading gives false failures.
    const anchorTop = target ? Math.round(target.getBoundingClientRect().top) : null;
    const heading = target?.parentElement?.querySelector("h2");
    return {
      navBottom: Math.round(navBottom),
      anchorTop,
      headingTop: heading ? Math.round(heading.getBoundingClientRect().top) : null,
      // The last section can't reach the top — the document simply runs out.
      atDocumentEnd:
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2,
    };
  }, id);

  const gap = m.anchorTop !== null ? m.anchorTop - m.navBottom : null;
  const ok = gap !== null && gap >= 0 && (gap <= 60 || m.atDocumentEnd);
  if (!ok) failures++;
  const note = m.atDocumentEnd && gap > 60 ? "  (bottom of page — offset unavoidable)" : "";
  console.log(
    `${ok ? "ok  " : "FAIL"} #${id.padEnd(15)} navBottom=${m.navBottom}  anchorTop=${m.anchorTop}  headingTop=${m.headingTop}  gap=${gap}px${note}`,
  );

  if (OUT) await page.screenshot({ path: `${OUT}/anchor-${id}.png` });
}

await browser.close();
console.log(failures === 0 ? "\nALL ANCHORS OK" : `\n${failures} ANCHOR(S) OFF`);
process.exit(failures === 0 ? 0 : 1);
