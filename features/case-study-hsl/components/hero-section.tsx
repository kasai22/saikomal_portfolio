"use client";

import { useRef } from "react";
import { ParallaxLayer } from "@/components/animations/Parallax";
import { AnimatedCounter } from "@/components/animations/AnimatedCounter";
import { PARALLAX, STAGGER } from "@/lib/animations/constants";
import { VT } from "@/lib/view-transition";
import { useParallaxTier, useSectionScroll } from "@/hooks/use-scroll-tier";
import Image from "next/image";
import { BackToPortfolioLink } from "@/components/case-study/back-to-portfolio-link";
import {
  HERO_METADATA,
  HERO_QUOTE,
  HERO_STATS,
  HERO_SUBTITLE,
  HERO_SUMMARY,
  HERO_TAG,
  HERO_TITLE,
} from "@/features/case-study-hsl/constants/data";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { progress, enabled } = useSectionScroll(sectionRef);
  const imageY = useParallaxTier(progress, PARALLAX.subtle + 10, enabled);
  const statsY = useParallaxTier(progress, PARALLAX.base, enabled);

  return (
    <section ref={sectionRef} className="relative flex min-h-[70svh] items-end overflow-hidden pt-20">
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 25% 40%, rgba(232,163,61,0.16) 0%, transparent 65%), radial-gradient(ellipse 50% 70% at 80% 55%, rgba(232,163,61,0.09) 0%, transparent 60%), #FBF9F2",
        }}
      />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-12 pt-20">
        <BackToPortfolioLink />

        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="rounded-full border border-[color:var(--accent-border)] bg-[color:var(--accent-subtle)] px-4 py-1 text-[11px] font-semibold uppercase tracking-widest text-[color:var(--accent)]">
                {HERO_TAG}
              </span>
            </div>
            <h1 style={{ viewTransitionName: VT.title }} className="t-display mb-1 text-[color:var(--accent)]">
              {HERO_TITLE}
            </h1>
            <p className="t-body mb-4 max-w-lg text-ink/72">{HERO_SUBTITLE}</p>
            <p className="mb-4 text-[13px] italic text-ink/60">&ldquo;{HERO_QUOTE}&rdquo;</p>
            <p className="mb-8 max-w-lg text-[13px] leading-relaxed text-ink/70">{HERO_SUMMARY}</p>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {HERO_METADATA.map((m) => (
                <div
                  key={m.label}
                  className="rounded-sm border border-[color:var(--panel-1-border)] bg-[var(--panel-1-bg)] px-4 py-3"
                >
                  <div className="mb-1 text-[11px] uppercase tracking-widest text-ink/60">
                    {m.label}
                  </div>
                  <div className="text-[13px] font-semibold text-ink">{m.value}</div>
                </div>
              ))}
            </div>
          </div>

          <ParallaxLayer viewTransitionName={VT.image} className="hidden lg:block" y={imageY}>
            <div className="relative overflow-hidden rounded-sm border border-ink/12 shadow-sm">
              <Image
                src="/figmaAssets/image-16.png"
                alt="Redesigned Hindustan Shipyard Limited homepage"
                width={1424}
                height={711}
                className="block h-auto w-full"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </ParallaxLayer>
        </div>

        <ParallaxLayer
          className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4"
          y={statsY}
        >
          {HERO_STATS.map((s, i) => (
            <div
              key={s.label}
              className="rounded-sm border border-[color:var(--panel-1-border)] bg-[var(--panel-1-bg)] px-5 py-4 text-center"
            >
              <div className="t-metric mb-1 text-[color:var(--accent)]">
                <AnimatedCounter value={s.value} delay={i * STAGGER.tight} />
              </div>
              <div className="text-[11px] text-ink/60">{s.label}</div>
            </div>
          ))}
        </ParallaxLayer>
      </div>
    </section>
  );
}
