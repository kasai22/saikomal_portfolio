import { ArrowRightIcon, ChevronDownIcon, DownloadIcon } from "@/components/icons";
import { SocialLinks } from "@/features/home/components/social-links";
import { HERO_TAGS, SOCIALS } from "@/features/home/constants/data";

export function HeroSection() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 70% 50%, rgba(0,128,128,0.15) 0%, transparent 70%), radial-gradient(ellipse 60% 80% at 20% 60%, rgba(100,0,200,0.12) 0%, transparent 60%), #000",
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-16 px-6 py-32 sm:py-40 lg:flex-row">
        <div className="flex flex-1 flex-col gap-6">
          <p className="text-lg font-light uppercase tracking-widest text-white/60">
            Welcome to my portfolio
          </p>

          <h1 className="text-5xl font-light leading-tight sm:text-6xl lg:text-7xl">
            Hola, I&apos;m
            <br />
            <span className="font-bold text-brand">Sai Komal</span>
          </h1>

          <div className="mt-1 flex flex-wrap gap-3">
            {HERO_TAGS.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm text-white/80 backdrop-blur-sm"
              >
                ✦ {tag}
              </span>
            ))}
          </div>

          <p className="mt-2 max-w-xl text-base leading-relaxed text-white/70">
            I am a{" "}
            <span className="text-white underline decoration-brand">
              Product Designer focused on SaaS, logistics systems, enterprise workflows, and
              AI-assisted experiences.
            </span>{" "}
            with a strong passion for creating intuitive and engaging digital experiences. With
            expertise in{" "}
            <span className="text-white underline decoration-brand">
              design research, wireframing, prototyping, and front-end development
            </span>
            , I craft user-centric interfaces that enhance usability and accessibility.
          </p>

          <SocialLinks socials={SOCIALS} variant="icon" className="mt-2" />

          <div className="mt-2 flex flex-wrap gap-4">
            <a
              href="/SaiKomal_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="SaiKomal_Resume.pdf"
              className="flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand-dark"
            >
              Resume
              <DownloadIcon className="h-4 w-4" />
            </a>
            <a
              href="#projects"
              className="flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:border-brand hover:text-brand-light"
            >
              View Projects
              <ArrowRightIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="hidden flex-1 items-center justify-center lg:flex">
          <div className="relative">
            <div className="absolute inset-0 scale-110 rounded-full bg-brand/20 blur-3xl" />
            <div className="relative flex h-72 w-72 animate-float items-center justify-center rounded-full border-2 border-brand/30 bg-gradient-to-br from-brand/20 to-transparent xl:h-80 xl:w-80">
              <div className="flex h-64 w-64 items-center justify-center rounded-full border border-white/10 xl:h-72 xl:w-72">
                <span className="select-none text-[120px]" aria-hidden="true">
                  👨‍💻
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 animate-bounce flex-col items-center gap-2 text-white/40">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <ChevronDownIcon className="h-4 w-4" />
      </div>
    </section>
  );
}
