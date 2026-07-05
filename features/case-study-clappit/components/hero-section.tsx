import Image from "next/image";
import { BackToPortfolioLink } from "@/components/case-study/back-to-portfolio-link";
import { HERO_META, HERO_TAGLINE, HERO_TAGS, TEAM_TOOLS } from "@/features/case-study-clappit/constants/data";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[85vh] items-end overflow-hidden pt-20">
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 20% 40%, rgba(232,39,58,0.10) 0%, transparent 65%), radial-gradient(ellipse 55% 55% at 80% 65%, rgba(232,39,58,0.035) 0%, transparent 60%), #0a0a0a",
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

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 pt-28">
        <BackToPortfolioLink />

        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-[color:var(--accent-border)] bg-[color:var(--accent-subtle)] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[color:var(--accent)]">
                Cloud Infrastructure · DevOps SaaS
              </span>
              <span className="text-xs font-medium text-white/30">2024</span>
            </div>
            <h1 className="mb-5 text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">
              Clapp<span className="text-[color:var(--accent)]">It</span>
            </h1>
            <p className="mb-8 max-w-lg border-l-2 border-[color:var(--accent-border)] pl-4 text-lg leading-relaxed text-white/60">
              {HERO_TAGLINE}
            </p>

            <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {HERO_META.map((m) => (
                <div key={m.label} className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
                  <div className="text-base font-bold text-[color:var(--accent)]">{m.value}</div>
                  <div className="mt-1 text-xs text-white/35">{m.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {HERO_TAGS.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/[0.12] bg-white/5 px-3 py-1.5 text-xs text-white/55"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="hidden lg:col-span-7 lg:block">
            <div className="relative">
              <div
                className="absolute -inset-4 rounded-3xl opacity-20 blur-2xl"
                style={{ background: "radial-gradient(ellipse, rgba(232,39,58,0.33), transparent 70%)" }}
                aria-hidden="true"
              />
              <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                <Image
                  src="/figmaAssets/clappit-dashboard.png"
                  alt="ClappIt dashboard"
                  width={1920}
                  height={1580}
                  className="block h-auto w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 border-t border-white/[0.08] pt-10 sm:grid-cols-3">
          {TEAM_TOOLS.map((item) => (
            <div key={item.label}>
              <span className="text-xs font-semibold uppercase tracking-widest text-white/30">
                {item.label}
              </span>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
