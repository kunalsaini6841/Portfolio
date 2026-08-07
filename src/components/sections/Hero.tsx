import Link from "next/link";
import { profile, stats } from "@/data/profile";
import { Shell } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative flex min-h-[92svh] items-center pt-28 pb-16"
    >
      {/* Faint vertical grid rules — structure you feel more than see. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 mx-auto hidden max-w-[78rem] px-12 lg:block"
      >
        <div className="grid h-full grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="border-l border-rule/45" />
          ))}
        </div>
      </div>

      <Shell className="relative">
        {profile.availability.isOpen ? (
          <Reveal>
            <p className="inline-flex items-center gap-2.5 rounded-full border border-rule bg-paper-raised px-3.5 py-1.5 font-mono text-micro uppercase text-ink-muted shadow-(--shadow-sm)">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-signal opacity-70" />
                <span className="relative inline-flex size-1.5 rounded-full bg-signal" />
              </span>
              {profile.availability.label}
            </p>
          </Reveal>
        ) : null}

        <Reveal delay={80}>
          <h1
            id="hero-heading"
            className="mt-7 max-w-[16ch] font-serif text-display text-ink"
          >
            {profile.headline.lead}{" "}
            <em className="italic text-accent">{profile.headline.emphasis}</em>
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-8 max-w-2xl text-lede text-ink-muted">
            {profile.subheadline}
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="/#work"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper transition-transform duration-300 hover:-translate-y-0.5"
            >
              View projects
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
            <a
              href={profile.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-rule-strong px-5 py-3 text-sm font-medium text-ink transition-colors duration-300 hover:bg-paper-sunk"
            >
              Download résumé
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="link-draw px-2 py-3 text-sm text-ink-muted transition-colors hover:text-ink"
            >
              GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="link-draw px-2 py-3 text-sm text-ink-muted transition-colors hover:text-ink"
            >
              LinkedIn
            </a>
          </div>
        </Reveal>

        <Reveal delay={340}>
          <dl className="mt-16 grid grid-cols-1 gap-px overflow-hidden border-t border-rule sm:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="border-b border-rule py-6 sm:border-b-0 sm:border-r sm:pr-6 sm:last:border-r-0"
              >
                <dt className="font-mono text-micro uppercase text-ink-faint">
                  {stat.label}
                </dt>
                <dd className="mt-3">
                  <span className="font-serif text-heading text-ink">
                    {stat.value}
                  </span>
                  {stat.unit ? (
                    <span className="ml-1 font-mono text-sm text-ink-muted">
                      {stat.unit}
                    </span>
                  ) : null}
                  <span className="mt-1.5 block text-sm leading-snug text-ink-muted">
                    {stat.sub}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Shell>
    </section>
  );
}
