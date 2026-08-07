import Link from "next/link";
import { profile } from "@/data/profile";
import { Shell } from "@/components/ui/Section";

export function SiteFooter() {
  return (
    <footer className="relative z-1 border-t border-rule py-12">
      <Shell>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-micro text-ink-faint uppercase">
            © {new Date().getFullYear()} {profile.name}
          </p>

          <ul className="flex flex-wrap items-center gap-6">
            <li>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="link-draw text-sm text-ink-muted transition-colors hover:text-ink"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="link-draw text-sm text-ink-muted transition-colors hover:text-ink"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href={`mailto:${profile.email}`}
                className="link-draw text-sm text-ink-muted transition-colors hover:text-ink"
              >
                Email
              </a>
            </li>
            <li>
              <Link
                href="/#work"
                className="link-draw text-sm text-ink-muted transition-colors hover:text-ink"
              >
                Back to top
              </Link>
            </li>
          </ul>
        </div>
      </Shell>
    </footer>
  );
}
