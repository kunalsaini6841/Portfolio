import { chromium } from "playwright";

/**
 * Clicks the footer links on each page and asserts they actually do something:
 * "Back to top" must return the reader to the top, and "Email" must open a
 * composer rather than a mailto that silently dies without a mail client.
 */
const BASE = process.argv[2] ?? "http://localhost:3000";
const PAGES = ["/", "/projects/honeypot-threat-detection"];

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  reducedMotion: "reduce",
});
const page = await ctx.newPage();
const problems = [];

for (const path of PAGES) {
  await page.goto(BASE + path, { waitUntil: "networkidle" });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(300);
  const before = await page.evaluate(() => Math.round(window.scrollY));

  await page.getByRole("link", { name: /back to top/i }).click();
  await page.waitForTimeout(600);
  const after = await page.evaluate(() => Math.round(window.scrollY));

  if (after > 8) {
    problems.push(`${path}: "Back to top" left scrollY at ${after} (was ${before})`);
  } else {
    console.log(`ok   ${path.padEnd(38)} back-to-top ${before} -> ${after}`);
  }

  const emailHref = await page
    .locator("footer")
    .getByRole("link", { name: /^email$/i })
    .getAttribute("href");
  const opensComposer = /mail\.google\.com/.test(emailHref ?? "");
  if (!opensComposer) {
    problems.push(`${path}: footer Email -> ${emailHref} (will dead-end without a mail client)`);
  } else {
    console.log(`ok   ${path.padEnd(38)} footer email opens a composer`);
  }
}

await browser.close();

if (problems.length === 0) {
  console.log("\nFOOTER OK");
  process.exit(0);
}
console.log("\nPROBLEMS:");
problems.forEach((p) => console.log("  - " + p));
process.exit(1);
