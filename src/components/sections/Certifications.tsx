import { certifications } from "@/data/profile";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function Certifications() {
  return (
    <Section id="certifications" index="05" title="Certifications">
      <ul className="border-t border-rule">
        {certifications.map((cert, i) => (
          <li key={cert.name}>
            <Reveal delay={i * 60}>
              <div className="flex flex-col gap-1.5 border-b border-rule py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                <div>
                  <h3 className="font-serif text-lg leading-snug text-ink">
                    {cert.name}
                  </h3>
                  <p className="mt-1 text-sm text-ink-muted">{cert.issuer}</p>
                </div>
                {cert.date ? (
                  <p className="shrink-0 font-mono text-xs text-ink-faint">
                    {cert.date}
                  </p>
                ) : null}
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
