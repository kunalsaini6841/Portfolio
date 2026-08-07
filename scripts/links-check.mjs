import { chromium } from "playwright";

/**
 * Audits every link on every page: no dead internal anchors, no external link
 * missing rel="noopener", and the contact CTAs point where they should.
 * Catches the class of bug where a button looks fine but goes nowhere.
 */
const BASE = process.argv[2] ?? "http://localhost:3000";
const EMAIL = "kunalsaini6841@gmail.com";
const PAGES = [
  "/",
  "/projects/financial-rag-assistant",
  "/projects/honeypot-threat-detection",
];

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const problems = [];

// Anchors written as "/#work" are cross-page links resolved against the
// homepage, so collect its ids up front rather than looking for them on
// whichever page the link happens to appear on.
await page.goto(BASE + "/", { waitUntil: "networkidle" });
const homeIds = new Set(
  await page.evaluate(() => [...document.querySelectorAll("[id]")].map((el) => el.id)),
);

for (const path of PAGES) {
  await page.goto(BASE + path, { waitUntil: "networkidle" });

  const links = await page.evaluate(() =>
    [...document.querySelectorAll("a[href]")].map((a) => ({
      href: a.getAttribute("href"),
      text: (a.textContent || "").replace(/\s+/g, " ").trim().slice(0, 40),
      target: a.getAttribute("target"),
      rel: a.getAttribute("rel") || "",
    })),
  );

  for (const l of links) {
    if (l.href.startsWith("/#")) {
      const id = l.href.slice(2);
      if (!homeIds.has(id)) {
        problems.push(`${path}: "${l.text}" -> ${l.href} has no target on the homepage`);
      }
    } else if (l.href.startsWith("#")) {
      const id = l.href.slice(1);
      // Attribute selector rather than "#id" — no escaping needed in Node.
      const exists = await page.locator(`[id="${id}"]`).count().catch(() => 0);
      if (!exists) problems.push(`${path}: anchor "${l.href}" (${l.text}) has no target`);
    }
    if (l.target === "_blank" && !/noopener/.test(l.rel)) {
      problems.push(`${path}: "${l.text}" opens a new tab without rel=noopener`);
    }
    if (/^https?:/.test(l.href)) {
      const res = await page.request.head(l.href).catch(() => null);
      const status = res?.status() ?? 0;
      // Some hosts reject HEAD; only flag hard 404/410.
      if (status === 404 || status === 410) {
        problems.push(`${path}: "${l.text}" -> ${l.href} returned ${status}`);
      }
    }
  }
}

// Contact CTA specifics.
await page.goto(`${BASE}/#contact`, { waitUntil: "networkidle" });
const sendHref = await page
  .getByRole("link", { name: /send an email/i })
  .getAttribute("href");
if (!sendHref?.includes(encodeURIComponent(EMAIL)) && !sendHref?.includes(EMAIL)) {
  problems.push(`contact: "Send an email" does not target ${EMAIL} (got ${sendHref})`);
}
const mailtoCount = await page.locator(`a[href="mailto:${EMAIL}"]`).count();
if (mailtoCount === 0) {
  problems.push("contact: no plain mailto: link offered for native mail clients");
}

await browser.close();

if (problems.length === 0) {
  console.log("ALL LINKS OK");
  process.exit(0);
}
console.log("PROBLEMS:");
problems.forEach((p) => console.log("  - " + p));
process.exit(1);
