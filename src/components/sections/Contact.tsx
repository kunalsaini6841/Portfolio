import { profile } from "@/data/profile";
import { Shell } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { gmailComposeUrl } from "@/lib/site";

const channels = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "Phone", value: profile.phone, href: `tel:${profile.phoneHref}` },
  { label: "LinkedIn", value: "in/kunal-saini", href: profile.linkedin },
  { label: "GitHub", value: "kunalsaini6841", href: profile.github },
];

export function Contact() {
  return (
    <section
      aria-labelledby="contact-heading"
      className="border-t border-rule bg-paper-sunk py-(--spacing-section)"
    >
      <Shell>
        {/* See Section.tsx — anchor sits at the content, not above the padding. */}
        <span id="contact" aria-hidden="true" className="block" />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="flex items-baseline gap-5">
                <span className="font-mono text-micro text-accent">06</span>
                <p className="eyebrow">Contact</p>
              </div>

              <h2
                id="contact-heading"
                className="mt-6 max-w-[14ch] font-serif text-title text-ink"
              >
                Let&apos;s build something{" "}
                <em className="italic text-accent">that ships.</em>
              </h2>

              <p className="mt-6 max-w-lg text-lede text-ink-muted">
                I&apos;m looking for Data Scientist and GenAI engineering roles.
                If you&apos;re hiring, or you have a problem you think I could
                help solve, I&apos;d like to hear from you.
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href={gmailComposeUrl(profile.email)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-accent-ink transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Send an email
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </a>
                <a
                  href={profile.resumePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-full border border-rule-strong px-5 py-3 text-sm font-medium text-ink transition-colors duration-300 hover:bg-paper"
                >
                  Download Resume
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120} className="lg:col-span-5">
            <dl className="border-t border-rule">
              {channels.map((channel) => (
                <div
                  key={channel.label}
                  className="flex items-baseline justify-between gap-6 border-b border-rule py-4"
                >
                  <dt className="font-mono text-micro uppercase text-ink-faint">
                    {channel.label}
                  </dt>
                  <dd>
                    <a
                      href={channel.href}
                      target={channel.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        channel.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="link-draw text-sm text-ink transition-colors hover:text-accent"
                    >
                      {channel.value}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-6 text-sm leading-relaxed text-ink-muted">
              Based in {profile.location}. Open to remote, hybrid and
              relocation.
            </p>
          </Reveal>
        </div>
      </Shell>
    </section>
  );
}
