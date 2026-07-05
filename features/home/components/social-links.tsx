import { GithubIcon, LinkedinIcon, ExternalLinkIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import type { Social } from "@/features/home/types";

const PLATFORM_ICON = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
} as const;

interface SocialLinksProps {
  socials: Social[];
  variant?: "icon" | "row";
  className?: string;
}

export function SocialLinks({ socials, variant = "icon", className }: SocialLinksProps) {
  if (variant === "row") {
    return (
      <div className={cn("flex flex-col gap-4", className)}>
        {socials.map((social) => {
          const Icon = PLATFORM_ICON[social.platform];
          return (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 transition-all duration-200 hover:border-brand/50 hover:bg-brand/5"
            >
              <span className="text-white/60 transition-colors group-hover:text-brand-light">
                <Icon className="h-5 w-5" />
              </span>
              <span className="font-medium text-white/80">{social.label}</span>
              <ExternalLinkIcon className="ml-auto h-4 w-4 text-white/20 transition-colors group-hover:text-brand-light" />
            </a>
          );
        })}
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-4", className)}>
      {socials.map((social) => {
        const Icon = PLATFORM_ICON[social.platform];
        return (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className="text-white/60 transition-colors duration-200 hover:text-brand-light"
          >
            <Icon className="h-5 w-5" />
          </a>
        );
      })}
    </div>
  );
}
