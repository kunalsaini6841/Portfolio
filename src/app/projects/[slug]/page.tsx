import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/data/projects";
import { Shell } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Chip } from "@/components/ui/Chip";
import { ArchitectureFlow } from "@/components/project/ArchitectureFlow";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects
    .filter((p) => p.caseStudy)
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return { title: "Project not found" };

  return {
    title: project.title,
    description: project.tagline,
    openGraph: { title: project.title, description: project.tagline },
  };
}

function Block({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="grid gap-6 border-t border-rule py-12 lg:grid-cols-12 lg:gap-14">
      <div className="lg:col-span-4">
        <div className="flex items-baseline gap-4 lg:sticky lg:top-24">
          <span className="font-mono text-micro text-accent">{index}</span>
          <h2 className="font-serif text-heading leading-tight text-ink">
            {title}
          </h2>
        </div>
      </div>
      <div className="lg:col-span-8">{children}</div>
    </section>
  );
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project?.caseStudy) notFound();

  const { caseStudy } = project;
  const others = projects.filter((p) => p.slug !== project.slug && p.caseStudy);

  return (
    <article className="pt-28 pb-(--spacing-section)">
      <Shell>
        <Reveal>
          <Link
            href="/#work"
            className="group inline-flex items-center gap-2 font-mono text-micro uppercase text-ink-faint transition-colors hover:text-ink"
          >
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:-translate-x-1"
            >
              ←
            </span>
            All work
          </Link>
        </Reveal>

        <header className="mt-10">
          <Reveal>
            <ul className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li key={tag}>
                  <Chip variant="accent">{tag}</Chip>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={70}>
            <h1 className="mt-6 max-w-[18ch] font-serif text-title text-ink">
              {project.title}
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-7 max-w-3xl text-lede text-ink-muted">
              {project.tagline}
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4 border-y border-rule py-5">
              <ul className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li key={tech}>
                    <Chip>{tech}</Chip>
                  </li>
                ))}
              </ul>
              {project.repo ? (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-draw ml-auto inline-flex items-center gap-1.5 text-sm text-ink transition-colors hover:text-accent"
                >
                  View on GitHub
                  <span aria-hidden="true" className="text-xs">
                    ↗
                  </span>
                </a>
              ) : null}
            </div>
          </Reveal>
        </header>

        <div className="mt-8">
          <Block index="01" title="The problem">
            <Reveal>
              <p className="text-lede leading-relaxed text-ink-muted">
                {caseStudy.problem}
              </p>
            </Reveal>
          </Block>

          <Block index="02" title="Architecture">
            <Reveal>
              <ArchitectureFlow stages={caseStudy.architecture} />
            </Reveal>
          </Block>

          <Block index="03" title="Key decisions">
            <ul className="space-y-px bg-rule">
              {caseStudy.decisions.map((decision, i) => (
                <li key={decision.choice}>
                  <Reveal delay={i * 60}>
                    <div className="bg-paper py-6 pl-6 sm:pl-8">
                      <p className="font-serif text-lg leading-snug text-ink">
                        {decision.choice}{" "}
                        <span className="text-ink-faint">
                          instead of {decision.instead}
                        </span>
                      </p>
                      <p className="mt-2.5 leading-relaxed text-ink-muted">
                        Because {decision.because}
                      </p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </Block>

          <Block index="04" title="Results">
            <Reveal>
              <dl className="grid gap-px border border-rule bg-rule sm:grid-cols-3">
                {caseStudy.results.map((result) => (
                  <div key={result.label} className="bg-paper p-6">
                    <dt className="sr-only">{result.label}</dt>
                    <dd>
                      <span className="font-serif text-heading text-ink">
                        {result.metric}
                      </span>
                      <span className="mt-2 block text-sm leading-snug text-ink-muted">
                        {result.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </Block>

          <Block index="05" title="What I'd do differently">
            <Reveal>
              <p className="border-l-2 border-accent pl-6 text-lede leading-relaxed text-ink-muted">
                {caseStudy.retro}
              </p>
            </Reveal>
          </Block>
        </div>

        {others.length > 0 ? (
          <Reveal>
            <nav
              aria-label="Other case studies"
              className="mt-8 border-t border-rule pt-10"
            >
              <p className="eyebrow">Next case study</p>
              <ul className="mt-6 space-y-4">
                {others.map((other) => (
                  <li key={other.slug}>
                    <Link
                      href={`/projects/${other.slug}`}
                      className="group flex items-baseline gap-5"
                    >
                      <span className="font-mono text-micro text-accent">
                        {other.index}
                      </span>
                      <span className="font-serif text-heading text-ink transition-colors duration-300 group-hover:text-accent">
                        {other.title}
                      </span>
                      <span
                        aria-hidden="true"
                        className="text-ink-faint transition-transform duration-300 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>
        ) : null}
      </Shell>
    </article>
  );
}
