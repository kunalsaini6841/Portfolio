"use client";

import { useState } from "react";
import { profile } from "@/data/profile";

type Status = "idle" | "copied" | "failed";

const LABELS: Record<Status, string> = {
  idle: "Copy address",
  copied: "Copied",
  failed: "Use the address below",
};

/**
 * Fallback for the mailto button, which silently does nothing on machines with
 * no default mail client registered — common on Windows and for anyone using
 * webmail. On copy failure it points at the address listed in the contact
 * table rather than failing quietly.
 */
export function CopyEmailButton() {
  const [status, setStatus] = useState<Status>("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setStatus("copied");
    } catch {
      // Clipboard API is unavailable outside secure contexts.
      setStatus("failed");
    }
    window.setTimeout(() => setStatus("idle"), 2400);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-2 rounded-full border border-rule-strong px-5 py-3 text-sm font-medium text-ink transition-colors duration-300 hover:bg-paper"
    >
      <span aria-hidden="true" className="text-accent">
        {status === "copied" ? "✓" : "⧉"}
      </span>
      {LABELS[status]}
      {/* Announce the result without moving focus. */}
      <span aria-live="polite" className="sr-only">
        {status === "copied"
          ? `${profile.email} copied to clipboard`
          : status === "failed"
            ? "Could not copy. The address is listed in the contact details."
            : ""}
      </span>
    </button>
  );
}
