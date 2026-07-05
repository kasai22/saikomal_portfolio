import Image from "next/image";
import { BackToPortfolioLink } from "@/components/case-study/back-to-portfolio-link";
import { HERO_METADATA, HERO_STATS } from "@/features/case-study-kudra/constants/data";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[80vh] items-end overflow-hidden pt-20">
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 25% 40%, rgba(245,183,49,0.10) 0%, transparent 65%), radial-gradient(ellipse 50% 70% at 80% 55%, rgba(245,183,49,0.05) 0%, transparent 60%), #0a0a0a",
        }}
      />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-24">
        <BackToPortfolioLink />

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="rounded-full border border-[color:var(--accent-border)] bg-[color:var(--accent-subtle)] px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[color:var(--accent)]">
                Logistics / Fleet Management SaaS
              </span>
            </div>
            <h1 className="mb-3 text-6xl font-bold leading-none text-[color:var(--accent)] sm:text-7xl lg:text-8xl">
              Kudra
            </h1>
            <p className="mb-6 text-base italic text-white/40">
              &quot;Transforming Fleet Operations Through Structured Trip Management&quot;
            </p>
            <p className="mb-10 max-w-lg text-lg leading-relaxed text-white/65">
              A logistics operations platform that evolved from simple GPS tracking into a
              centralized trip management ecosystem — bringing visibility, structure, and
              accountability to fleet operations.
            </p>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {HERO_METADATA.map((m) => (
                <div key={m.label} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <div className="mb-1 text-xs uppercase tracking-widest text-white/35">
                    {m.label}
                  </div>
                  <div className="text-sm font-semibold text-white">{m.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
              <Image
                src="/figmaAssets/kudra-dashboard.png"
                alt="Kudra fleet operations dashboard"
                width={1917}
                height={1020}
                className="block h-auto w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {HERO_STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-white/10 bg-white/5 px-6 py-5 text-center"
            >
              <div className="mb-1 text-3xl font-bold text-[color:var(--accent)]">{s.value}</div>
              <div className="text-xs text-white/45">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
