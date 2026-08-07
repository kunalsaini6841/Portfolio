import type { ReactNode } from "react";

type ChipProps = {
  children: ReactNode;
  variant?: "default" | "accent" | "outline";
};

const styles: Record<NonNullable<ChipProps["variant"]>, string> = {
  default:
    "border-rule bg-paper-sunk text-ink-muted",
  accent:
    "border-transparent bg-accent-soft text-accent",
  outline:
    "border-rule-strong bg-transparent text-ink-muted",
};

export function Chip({ children, variant = "default" }: ChipProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[0.6875rem] leading-none tracking-wide ${styles[variant]}`}
    >
      {children}
    </span>
  );
}
