import type { Metadata } from "next";
import { Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google";
import { SiteNav } from "@/components/layout/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { profile } from "@/data/profile";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const display = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const code = JetBrains_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-code",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${profile.name} — ${profile.shortTitle}`,
    template: `%s — ${profile.name}`,
  },
  description:
    "Data Scientist with ~3 years building RAG pipelines, ML models, and AI-driven threat detection. Python, LangChain, GPT-4o, AWS.",
  keywords: [
    "Data Scientist",
    "Machine Learning Engineer",
    "GenAI Engineer",
    "RAG",
    "LangChain",
    "LLM",
    "Python",
    "Kunal Saini",
  ],
  authors: [{ name: profile.name, url: SITE_URL }],
  creator: profile.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: `${profile.name} — Portfolio`,
    title: `${profile.name} — ${profile.shortTitle}`,
    description:
      "RAG pipelines on GPT-4o and Pinecone, ML threat detection at 97% accuracy, and models running on AWS.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.shortTitle}`,
    description:
      "RAG pipelines on GPT-4o and Pinecone, ML threat detection at 97% accuracy, and models running on AWS.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

/**
 * Applies the stored or system theme before first paint.
 * Inlined deliberately — a deferred script would flash the wrong theme.
 */
const themeScript = `
(function(){try{
  var s=localStorage.getItem('theme');
  var d=window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.setAttribute('data-theme', s || (d?'dark':'light'));
}catch(e){document.documentElement.setAttribute('data-theme','light')}})();
`;

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: "Data Scientist",
  email: `mailto:${profile.email}`,
  url: SITE_URL,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Amroha",
    addressRegion: "Uttar Pradesh",
    addressCountry: "IN",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "ITS, Institute of Technology and Science, Greater Noida",
  },
  knowsAbout: [
    "Machine Learning",
    "Generative AI",
    "Retrieval Augmented Generation",
    "Deep Learning",
    "Natural Language Processing",
    "Network Threat Detection",
    "Python",
  ],
  sameAs: [profile.linkedin, profile.github],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body
        className={`${display.variable} ${body.variable} ${code.variable} antialiased`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-sm focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-accent-ink"
        >
          Skip to content
        </a>
        <SiteNav />
        <main id="main" className="relative z-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
