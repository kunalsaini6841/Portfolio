import { profile, education } from "@/data/profile";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function About() {
  return (
    <Section id="about" index="01" title="About">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-7">
          <div className="space-y-6">
            <p className="text-lede text-ink">{profile.about[0]}</p>
            {profile.about.slice(1).map((para) => (
              <p key={para} className="leading-relaxed text-ink-muted">
                {para}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-5">
          <div className="space-y-8 lg:border-l lg:border-rule lg:pl-10">
            <div>
              <h3 className="eyebrow">Currently exploring</h3>
              <ul className="mt-4 space-y-2.5">
                {profile.exploring.map((item) => (
                  <li
                    key={item}
                    className="flex items-baseline gap-3 text-sm text-ink-muted"
                  >
                    <span aria-hidden="true" className="text-accent">
                      ↗
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-rule pt-8">
              <h3 className="eyebrow">Education</h3>
              <p className="mt-4 font-serif text-lg text-ink">{education.degree}</p>
              <p className="mt-1.5 text-sm text-ink-muted">
                {education.institution}, {education.place}
              </p>
              <p className="mt-2 font-mono text-xs text-ink-faint">
                {education.period} · {education.grade}
              </p>
            </div>

            <div className="border-t border-rule pt-8">
              <h3 className="eyebrow">Based in</h3>
              <p className="mt-4 text-sm text-ink-muted">{profile.location}</p>
              <p className="mt-1 text-sm text-ink-muted">
                Open to remote, hybrid and relocation
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
