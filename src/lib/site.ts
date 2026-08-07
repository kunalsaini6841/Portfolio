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

/**
 * Opens Gmail's web composer with the recipient pre-filled.
 *
 * Preferred over `mailto:` for the primary CTA: mailto does nothing at all on
 * machines with no default mail client registered, which covers most people
 * using webmail. The raw mailto address is still offered in the contact table
 * for anyone running a native client.
 */
export function gmailComposeUrl(to: string): string {
  const params = new URLSearchParams({ view: "cm", fs: "1", to });
  return `https://mail.google.com/mail/?${params.toString()}`;
}

export const NAV_LINKS = [
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Skills" },
  { href: "/#experience", label: "Experience" },
  { href: "/#work", label: "Work" },
  { href: "/#contact", label: "Contact" },
] as const;
