import {
  GithubIcon,
  LinkedinIcon,
  XIcon,
  DiscordIcon,
  SlackIcon,
  ExternalLinkIcon,
} from "@/components/icons";
import { cn } from "@/lib/utils";
import type { Social } from "@/features/home/types";

const PLATFORM_ICON = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  x: XIcon,
  discord: DiscordIcon,
  slack: SlackIcon,
} as const;

/** Where each profile actually leads — one word, so the row needs no prose. */
const PLATFORM_CONTEXT: Record<Social["platform"], string> = {
  github: "Code",
  linkedin: "Career",
  x: "Posts",
  discord: "Chat",
  slack: "Work",
};

interface SocialLinksProps {
  socials: Social[];
  variant?: "icon" | "row";
  className?: string;
}

export function SocialLinks({ socials, variant = "icon", className }: SocialLinksProps) {
  if (variant === "row") {
    return (
      <div className={cn("grid grid-cols-1 gap-2 sm:grid-cols-2", className)}>
        {socials.map((social) => {
          const Icon = PLATFORM_ICON[social.platform];
          return (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-sm border border-ink/12 bg-ink/[0.035] px-4 py-3 transition-all duration-instant hover:border-brand/50 hover:bg-brand/5"
            >
              <span className="text-ink/60 transition-colors group-hover:text-brand-ink">
                <Icon className="h-4 w-4" />
              </span>
              <span className="t-h4 text-ink/85">{social.label}</span>
              <span className="t-meta text-ink/60">{PLATFORM_CONTEXT[social.platform]}</span>
              <ExternalLinkIcon className="ml-auto h-3.5 w-3.5 text-ink/60 transition-colors group-hover:text-brand-ink" />
            </a>
          );
        })}
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-3.5", className)}>
      {socials.map((social) => {
        const Icon = PLATFORM_ICON[social.platform];
        return (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className="text-ink/62 transition-colors duration-instant hover:text-brand-ink"
          >
            <Icon className="h-4 w-4" />
          </a>
        );
      })}
    </div>
  );
}
