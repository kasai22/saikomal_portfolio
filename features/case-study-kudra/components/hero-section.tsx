"use client";

import { useRef } from "react";
import { ParallaxLayer } from "@/components/animations/Parallax";
import { AnimatedCounter } from "@/components/animations/AnimatedCounter";
import { PARALLAX, STAGGER } from "@/lib/animations/constants";
import { VT } from "@/lib/view-transition";
import { useParallaxTier, useSectionScroll } from "@/hooks/use-scroll-tier";
import Image from "next/image";
import { BackToPortfolioLink } from "@/components/case-study/back-to-portfolio-link";
import { HERO_METADATA, HERO_STATS } from "@/features/case-study-kudra/constants/data";
import { KUDRA_OUTCOMES } from "@/constants/profile";

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
            "radial-gradient(ellipse 80% 60% at 25% 40%, rgba(149,104,7,0.13) 0%, transparent 65%), radial-gradient(ellipse 50% 70% at 80% 55%, rgba(149,104,7,0.07) 0%, transparent 60%), #FBF9F2",
        }}
      />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-12 pt-20">
        <BackToPortfolioLink />

        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="rounded-full border border-[color:var(--accent-border)] bg-[color:var(--accent-subtle)] px-4 py-1 text-[11px] font-semibold uppercase tracking-widest text-[color:var(--accent)]">
                Logistics / Fleet Management SaaS
              </span>
            </div>
            <h1 style={{ viewTransitionName: VT.title }} className="t-display mb-3 text-[color:var(--accent)]">
              Kudra
            </h1>
            <p className="mb-4 text-[13px] italic text-ink/60">
              &quot;Fleet operations ran on phone calls and spreadsheets — every trip status
              required someone to pick up the phone.&quot;
            </p>
            <p className="mb-8 max-w-lg text-[13px] leading-relaxed text-ink/70">
              Creating a trip meant re-entering the same details by hand, coordination happened
              over calls, WhatsApp and paper, and destination branches routinely had no warning
              before a vehicle arrived. Kudra replaced that with a single, structured trip
              management system — cutting trip-creation effort by {KUDRA_OUTCOMES[0].value} and
              manual operational effort by {KUDRA_OUTCOMES[1].value}.
            </p>

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
                src="/figmaAssets/kudra-dashboard.png"
                alt="Kudra fleet operations dashboard"
                width={1917}
                height={1020}
                className="block h-auto w-full"
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
              <div className="text-[11px] text-ink/62">{s.label}</div>
            </div>
          ))}
        </ParallaxLayer>
      </div>
    </section>
  );
}
