import { skillGroups } from "@/data/skills";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function Skills() {
  return (
    <Section
      id="skills"
      index="02"
      title="Capabilities"
      intro="Ordered by what the work actually leans on — retrieval systems first, then the modelling and the plumbing that ships it."
    >
      <div className="grid gap-px border-t border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => (
          <Reveal key={group.index} delay={i * 70} className="bg-paper">
            <div className="group h-full p-7 transition-colors duration-300 hover:bg-paper-raised lg:p-8">
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-mono text-micro text-ink-faint">
                  {group.index}
                </span>
                {group.isFeatured ? (
                  <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-accent">
                    Core
                  </span>
                ) : null}
              </div>

              <h3 className="mt-5 font-serif text-xl leading-tight text-ink">
                {group.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-faint">
                {group.note}
              </p>

              <ul className="mt-6 flex flex-wrap gap-x-2 gap-y-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-rule px-2.5 py-1 font-mono text-[0.6875rem] leading-none text-ink-muted transition-colors duration-200 group-hover:border-rule-strong"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
