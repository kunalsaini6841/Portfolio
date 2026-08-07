import Link from "next/link";
import { Shell } from "@/components/ui/Section";

export default function NotFound() {
  return (
    <div className="grid min-h-[70svh] place-items-center pt-24">
      <Shell>
        <p className="font-mono text-micro uppercase text-accent">Error 404</p>
        <h1 className="mt-5 max-w-[14ch] font-serif text-title text-ink">
          This page doesn&apos;t exist.
        </h1>
        <p className="mt-5 max-w-md leading-relaxed text-ink-muted">
          The link may be out of date, or the page may have moved.
        </p>
        <Link
          href="/"
          className="group mt-9 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper transition-transform duration-300 hover:-translate-y-0.5"
        >
          Back home
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      </Shell>
    </div>
  );
}
