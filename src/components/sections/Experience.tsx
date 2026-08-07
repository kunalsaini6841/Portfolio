import { experience } from "@/data/experience";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function Experience() {
  return (
    <Section id="experience" index="03" title="Experience">
      <ol className="relative">
        {/* Timeline rail, hidden on mobile where the indent would waste width. */}
        <div
          aria-hidden="true"
          className="absolute left-[7.5rem] top-2 bottom-2 hidden w-px bg-rule lg:block"
        />

        {experience.map((role, i) => (
          <li key={role.company}>
            <Reveal delay={i * 90}>
              <article
                className={`relative grid gap-6 py-10 lg:grid-cols-[7.5rem_1fr] lg:gap-12 ${
                  i > 0 ? "border-t border-rule" : ""
                }`}
              >
                <div className="lg:pr-8 lg:text-right">
                  <p className="font-mono text-xs leading-relaxed text-ink-faint">
                    {role.period}
                  </p>
                </div>

                <div className="lg:pl-10">
                  {/* Node on the rail */}
                  <span
                    aria-hidden="true"
                    className="absolute left-[7.5rem] top-[2.9rem] hidden size-2 -translate-x-1/2 rounded-full bg-accent ring-4 ring-paper lg:block"
                  />

                  <h3 className="font-serif text-heading leading-tight text-ink">
                    {role.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-ink-muted">
                    {role.company} · {role.location}
                  </p>

                  <ul className="mt-6 space-y-3.5">
                    {role.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex gap-3.5 leading-relaxed text-ink-muted"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2.5 size-1 shrink-0 rounded-full bg-accent"
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {role.stack.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full bg-paper-sunk px-2.5 py-1 font-mono text-[0.6875rem] leading-none text-ink-muted"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
