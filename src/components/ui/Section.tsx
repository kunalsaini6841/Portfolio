import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function Shell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[78rem] px-5 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </div>
  );
}

type SectionProps = {
  id: string;
  index: string;
  title: string;
  intro?: string;
  children: ReactNode;
  className?: string;
};

/**
 * Editorial section frame: numbered eyebrow, serif title, hairline rule.
 * The number/title pair is the repeating rhythm that holds the page together.
 */
export function Section({
  id,
  index,
  title,
  intro,
  children,
  className = "",
}: SectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section
      aria-labelledby={headingId}
      className={`py-(--spacing-section) ${className}`}
    >
      <Shell>
        {/* The anchor sits level with the title rule rather than on the
            <section>, whose large top padding would otherwise land nav links
            on a screenful of empty space above the heading. */}
        <span id={id} aria-hidden="true" className="block" />

        <Reveal>
          <div className="flex flex-col gap-4 border-t border-rule pt-6 md:flex-row md:items-baseline md:justify-between md:gap-12">
            <div className="flex items-baseline gap-5">
              <span className="font-mono text-micro text-accent">{index}</span>
              <h2
                id={headingId}
                className="font-serif text-title text-ink"
              >
                {title}
              </h2>
            </div>
            {intro ? (
              <p className="max-w-md text-sm leading-relaxed text-ink-muted md:text-right">
                {intro}
              </p>
            ) : null}
          </div>
        </Reveal>

        <div className="mt-12 md:mt-16">{children}</div>
      </Shell>
    </section>
  );
}
