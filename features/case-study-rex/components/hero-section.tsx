"use client";

import { useRef } from "react";
import { ParallaxLayer } from "@/components/animations/Parallax";
import { AnimatedCounter } from "@/components/animations/AnimatedCounter";
import { PARALLAX, STAGGER } from "@/lib/animations/constants";
import { VT } from "@/lib/view-transition";
import { useParallaxTier, useSectionScroll } from "@/hooks/use-scroll-tier";
import Image from "next/image";
import { BackToPortfolioLink } from "@/components/case-study/back-to-portfolio-link";
import { HERO_META, HERO_TAGLINE, HERO_TAGS, TEAM_TOOLS } from "@/features/case-study-rex/constants/data";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { progress, enabled } = useSectionScroll(sectionRef);
  const imageY = useParallaxTier(progress, PARALLAX.subtle + 10, enabled);
  const teamY = useParallaxTier(progress, PARALLAX.base, enabled);

  return (
    <section ref={sectionRef} className="relative flex min-h-[70svh] items-end overflow-hidden pt-20">
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 20% 40%, rgba(139,108,50,0.14) 0%, transparent 65%), radial-gradient(ellipse 55% 55% at 80% 65%, rgba(139,108,50,0.07) 0%, transparent 60%), #FBF9F2",
        }}
      />
      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-24">
        <BackToPortfolioLink />

        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-[color:var(--accent-border)] bg-[color:var(--accent-subtle)] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-[color:var(--accent)]">
                Luxury AI Fashion Platform
              </span>
              <span className="text-[11px] font-medium text-ink/60">2026</span>
            </div>
            <h1 style={{ viewTransitionName: VT.title }} className="t-display mb-4">
              Onliest <span className="text-[color:var(--accent)]">REX</span>
            </h1>
            <p className="mb-6 max-w-lg border-l-2 border-[color:var(--accent-border)] pl-4 text-[13px] leading-relaxed text-ink/65">
              {HERO_TAGLINE}
            </p>

            <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {HERO_META.map((m, i) => (
                <div
                  key={m.label}
                  className="rounded-sm border border-[color:var(--panel-1-border)] bg-[var(--panel-1-bg)] p-3 text-center"
                >
                  <div className="text-[13px] font-bold text-[color:var(--accent)]">
                    <AnimatedCounter value={m.value} delay={i * STAGGER.tight} />
                  </div>
                  <div className="mt-1 text-[11px] text-ink/60">{m.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {HERO_TAGS.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[color:var(--panel-1-border)] bg-[var(--panel-1-bg)] px-3 py-1.5 text-[11px] text-ink/62"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <ParallaxLayer
            viewTransitionName={VT.image}
            className="hidden lg:col-span-7 lg:block"
            y={imageY}
          >
            <div className="relative">
              <div
                className="absolute -inset-4 rounded-sm opacity-20 blur-2xl"
                style={{ background: "radial-gradient(ellipse, rgba(154,26,58,0.33), transparent 70%)" }}
                aria-hidden="true"
              />
              <div className="relative overflow-hidden rounded-sm border border-ink/12 shadow-sm">
                <Image
                  src="/rex/rex-hero.svg"
                  alt="Onliest REX interface"
                  width={1920}
                  height={1200}
                  className="block h-auto w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </div>
          </ParallaxLayer>
        </div>

        <ParallaxLayer
          className="mt-10 grid grid-cols-1 gap-6 border-t border-ink/[0.096] pt-8 sm:grid-cols-3"
          y={teamY}
        >
          {TEAM_TOOLS.map((item) => (
            <div key={item.label}>
              <span className="text-[11px] font-semibold uppercase tracking-widest text-ink/60">
                {item.label}
              </span>
              <p className="mt-2 text-[13px] leading-relaxed text-ink/70">{item.value}</p>
            </div>
          ))}
        </ParallaxLayer>
      </div>
    </section>
  );
}
