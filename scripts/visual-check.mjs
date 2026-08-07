import { chromium } from "playwright";
import fs from "node:fs";

const OUT = process.argv[2];
const BASE = "http://localhost:3000";
fs.mkdirSync(OUT, { recursive: true });

const shots = [
  { name: "home-1440-light", url: "/", w: 1440, h: 1000, theme: "light", full: true },
  { name: "home-1440-dark", url: "/", w: 1440, h: 1000, theme: "dark", full: true },
  { name: "home-768-light", url: "/", w: 768, h: 1000, theme: "light", full: true },
  { name: "home-375-light", url: "/", w: 375, h: 812, theme: "light", full: true },
  { name: "home-320-light", url: "/", w: 320, h: 700, theme: "light", full: false },
  { name: "case-1440-light", url: "/projects/honeypot-threat-detection", w: 1440, h: 1000, theme: "light", full: true },
  { name: "case-375-dark", url: "/projects/financial-rag-assistant", w: 375, h: 812, theme: "dark", full: true },
];

const browser = await chromium.launch();
const report = [];

// Measure real transfer for one cold homepage load.
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await ctx.newPage();
  let js = 0, css = 0, font = 0, other = 0;
  page.on("response", async (res) => {
    try {
      const buf = await res.body();
      const u = res.url();
      if (u.endsWith(".js")) js += buf.length;
      else if (u.endsWith(".css")) css += buf.length;
      else if (/\.(woff2?|ttf)/.test(u)) font += buf.length;
      else other += buf.length;
    } catch { /* redirects and aborted requests have no body */ }
  });
  await page.goto(BASE, { waitUntil: "networkidle" });
  report.push(`NETWORK (uncompressed on the wire from localhost):`);
  report.push(`  JS    ${(js / 1024).toFixed(1)} KB`);
  report.push(`  CSS   ${(css / 1024).toFixed(1)} KB`);
  report.push(`  FONTS ${(font / 1024).toFixed(1)} KB`);
  report.push(`  OTHER ${(other / 1024).toFixed(1)} KB`);
  await ctx.close();
}

for (const s of shots) {
  const ctx = await browser.newContext({
    viewport: { width: s.w, height: s.h },
    deviceScaleFactor: 2,
    colorScheme: s.theme === "dark" ? "dark" : "light",
  });
  const page = await ctx.newPage();
  await page.goto(BASE + s.url, { waitUntil: "networkidle" });

  // Force every reveal to its final state so screenshots aren't half-faded.
  await page.evaluate(() =>
    document.querySelectorAll(".reveal").forEach((n) => n.setAttribute("data-visible", "true")),
  );
  await page.waitForTimeout(700);

  const overflow = await page.evaluate(() => ({
    scrollW: document.documentElement.scrollWidth,
    clientW: document.documentElement.clientWidth,
  }));
  const bad = overflow.scrollW > overflow.clientW + 1;
  report.push(
    `${bad ? "OVERFLOW" : "ok      "} ${s.name.padEnd(20)} scrollW=${overflow.scrollW} clientW=${overflow.clientW}`,
  );

  await page.screenshot({ path: `${OUT}/${s.name}.png`, fullPage: s.full });
  await ctx.close();
}

// Heading order + landmark sanity on the homepage.
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });
  const a11y = await page.evaluate(() => {
    const heads = [...document.querySelectorAll("h1,h2,h3,h4")].map((h) => h.tagName + " " + h.textContent.trim().slice(0, 42));
    const imgsNoAlt = [...document.querySelectorAll("img")].filter((i) => !i.hasAttribute("alt")).length;
    const links = [...document.querySelectorAll("a")];
    const emptyLinks = links.filter((a) => !a.textContent.trim() && !a.getAttribute("aria-label")).length;
    const blankNoRel = links.filter((a) => a.target === "_blank" && !/noopener/.test(a.rel)).length;
    return { heads, h1Count: document.querySelectorAll("h1").length, imgsNoAlt, emptyLinks, blankNoRel };
  });
  report.push("");
  report.push(`A11Y: h1 count=${a11y.h1Count}  img-missing-alt=${a11y.imgsNoAlt}  empty-links=${a11y.emptyLinks}  target-blank-without-noopener=${a11y.blankNoRel}`);
  report.push("HEADINGS:");
  a11y.heads.forEach((h) => report.push("  " + h));
  await ctx.close();
}

await browser.close();
console.log(report.join("\n"));
