import type { CaseStudy } from "@/data/projects";

/**
 * Vertical pipeline of stages. Real structure, not decoration — each stage is
 * a numbered node on a rail so the data flow reads top to bottom.
 */
export function ArchitectureFlow({
  stages,
}: {
  stages: CaseStudy["architecture"];
}) {
  return (
    <ol className="relative">
      <div
        aria-hidden="true"
        className="absolute left-[0.9375rem] top-3 bottom-3 w-px bg-rule"
      />

      {stages.map((stage, i) => (
        <li key={stage.stage} className="relative pl-12 pb-8 last:pb-0">
          <span
            aria-hidden="true"
            className="absolute left-0 top-0 grid size-8 place-items-center rounded-full border border-rule bg-paper font-mono text-[0.625rem] text-ink-muted"
          >
            {String(i + 1).padStart(2, "0")}
          </span>

          <h4 className="font-mono text-xs uppercase tracking-[0.12em] text-accent">
            {stage.stage}
          </h4>
          <p className="mt-2.5 leading-relaxed text-ink-muted">{stage.detail}</p>
        </li>
      ))}
    </ol>
  );
}
