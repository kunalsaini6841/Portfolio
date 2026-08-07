/**
 * Canonical origin for metadata, OG tags and JSON-LD.
 * Vercel injects VERCEL_PROJECT_PRODUCTION_URL automatically; set
 * NEXT_PUBLIC_SITE_URL once a custom domain is attached.
 */
const fromEnv =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined);

export const SITE_URL = fromEnv ?? "http://localhost:3000";

export const NAV_LINKS = [
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Skills" },
  { href: "/#experience", label: "Experience" },
  { href: "/#work", label: "Work" },
  { href: "/#contact", label: "Contact" },
] as const;
