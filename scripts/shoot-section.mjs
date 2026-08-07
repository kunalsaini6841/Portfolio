import { chromium } from "playwright";

/**
 * Screenshot a single section, for reviewing one change without rendering the
 * whole page.
 * Usage: node scripts/shoot-section.mjs <selector> <outDir> [theme] [path]
 */
const [selector, outDir, theme = "light", path = "/"] = process.argv.slice(2);
if (!selector || !outDir) {
  console.error(
    "usage: node scripts/shoot-section.mjs <selector> <outDir> [light|dark] [path]",
  );
  process.exit(1);
}

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
  colorScheme: theme === "dark" ? "dark" : "light",
});
const page = await ctx.newPage();
await page.goto(`http://localhost:3000${path}`, { waitUntil: "networkidle" });
await page.evaluate(() =>
  document.querySelectorAll(".reveal").forEach((n) => n.setAttribute("data-visible", "true")),
);
await page.waitForTimeout(500);

const name = selector.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "");

// Section ids live on zero-height anchor spans (see Section.tsx), which have
// nothing to capture — fall back to the section that contains them.
const handle = await page.locator(selector).first().elementHandle();
const target = await handle.evaluateHandle((el) => {
  const { width, height } = el.getBoundingClientRect();
  return width === 0 || height === 0 ? (el.closest("section") ?? el.parentElement) : el;
});

await target.asElement().screenshot({ path: `${outDir}/${name}-${theme}.png` });
await browser.close();
console.log(`shot ${name}-${theme}.png`);
