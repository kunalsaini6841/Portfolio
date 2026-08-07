import Link from "next/link";
import type { Project } from "@/data/projects";
import { Chip } from "@/components/ui/Chip";

/** Shared link row. Buttons only render when the target actually exists. */
function ProjectLinks({ project }: { project: Project }) {
  const hasCaseStudy = Boolean(project.caseStudy);

  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
      {hasCaseStudy ? (
        <Link
          href={`/projects/${project.slug}`}
          className="group/link inline-flex items-center gap-2 text-sm font-medium text-accent"
        >
          <span className="link-draw">Read the case study</span>
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover/link:translate-x-1"
          >
            →
          </span>
        </Link>
      ) : null}

      {project.repo ? (
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="link-draw inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-ink"
        >
          GitHub
          <span aria-hidden="true" className="text-xs">
            ↗
          </span>
        </a>
      ) : null}

      {project.demo ? (
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="link-draw inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-ink"
        >
          Live demo
          <span aria-hidden="true" className="text-xs">
            ↗
          </span>
        </a>
      ) : null}
    </div>
  );
}

function StackList({ stack }: { stack: string[] }) {
  return (
    <ul className="flex flex-wrap gap-x-2 gap-y-2">
      {stack.map((tech) => (
        <li key={tech}>
          <Chip>{tech}</Chip>
        </li>
      ))}
    </ul>
  );
}

export function FeaturedProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative border-t border-rule py-10 transition-colors duration-500 lg:py-14">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-4">
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-micro text-accent">
              {project.index}
            </span>
            <ul className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li key={tag}>
                  <Chip variant="accent">{tag}</Chip>
                </li>
              ))}
            </ul>
          </div>

          <h3 className="mt-6 font-serif text-title leading-[1.05] text-ink">
            {project.title}
          </h3>

          <p className="mt-6 border-l-2 border-accent pl-4 text-sm leading-relaxed text-ink">
            {project.impact}
          </p>
        </div>

        <div className="flex flex-col justify-between gap-8 lg:col-span-8">
          <p className="text-lede text-ink-muted">{project.tagline}</p>

          <div className="space-y-7">
            <StackList stack={project.stack} />
            <ProjectLinks project={project} />
          </div>
        </div>
      </div>
    </article>
  );
}

export function CompactProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex h-full flex-col bg-paper p-7 transition-colors duration-300 hover:bg-paper-raised lg:p-8">
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-mono text-micro text-ink-faint">
          {project.index}
        </span>
        <ul className="flex flex-wrap justify-end gap-1.5">
          {project.tags.slice(0, 2).map((tag) => (
            <li key={tag}>
              <Chip variant="outline">{tag}</Chip>
            </li>
          ))}
        </ul>
      </div>

      <h3 className="mt-5 font-serif text-xl leading-tight text-ink">
        {project.title}
      </h3>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
        {project.tagline}
      </p>

      <div className="mt-6 space-y-5">
        <StackList stack={project.stack.slice(0, 4)} />
        <ProjectLinks project={project} />
      </div>
    </article>
  );
}
