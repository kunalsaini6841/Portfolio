import { projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import {
  FeaturedProjectCard,
  CompactProjectCard,
} from "@/components/project/ProjectCard";

export function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <Section
      id="work"
      index="04"
      title="Selected work"
      intro="Five projects, each backed by shipped work or a public repository. The first two have full architecture write-ups."
    >
      <div>
        {featured.map((project, i) => (
          <Reveal key={project.slug} delay={i * 90}>
            <FeaturedProjectCard project={project} />
          </Reveal>
        ))}
      </div>

      <div className="mt-16">
        <h3 className="eyebrow">Also built</h3>
        <div className="mt-6 grid gap-px border-t border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((project, i) => (
            <Reveal key={project.slug} delay={i * 70} className="bg-paper">
              <CompactProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal delay={140}>
        <p className="mt-10 text-sm text-ink-muted">
          More on{" "}
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="link-draw text-ink"
          >
            GitHub
          </a>
          .
        </p>
      </Reveal>
    </Section>
  );
}
