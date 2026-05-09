import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";

const skills = [
  { category: "Design", items: ["UI/UX Design", "Figma", "Wireframing", "Prototyping", "User Research", "Usability Testing"] },
  { category: "Development", items: ["HTML / CSS", "JavaScript", "React", "Tailwind CSS", "Framer", "Responsive Design"] },
  { category: "Process", items: ["Design Thinking", "Empathy Mapping", "Information Architecture", "Competitive Analysis", "User Personas", "User Flows"] },
];

const tools = [
  { name: "Figma", icon: "🎨" },
  { name: "Framer", icon: "⚡" },
  { name: "React", icon: "⚛️" },
  { name: "Tailwind", icon: "💨" },
  { name: "VS Code", icon: "💻" },
  { name: "Notion", icon: "📝" },
];

const projects = [
  {
    title: "HSL Website Redesign",
    description:
      "A comprehensive UX/UI redesign of Hindusthan Shipyard Limited's website. The project involved in-depth user research, competitive analysis, empathy mapping, wireframing, prototyping and high-fidelity visual design to create a modern, mobile-responsive platform.",
    tags: ["UX Research", "UI Design", "Prototyping", "Figma"],
    accentColor: "#008080",
    slug: "/case-study",
    year: "2024",
    image: "/figmaAssets/image-16.png",
  },
  {
    title: "Kudra — Fleet & Trip Management Platform",
    description:
      "End-to-end product design of an enterprise logistics SaaS platform. Transformed manual, call-heavy fleet operations into a trip-centric, data-driven system — covering UX research, product strategy, workflow design, and a full design system.",
    tags: ["Product Strategy", "Enterprise UX", "SaaS Design", "Fleet Management"],
    accentColor: "#F5B731",
    slug: "/case-study/kudra",
    year: "2024",
    image: "/figmaAssets/kudra-dashboard.png",
  },
  {
    title: "ClappIt — Cloud Infrastructure & DevOps Platform",
    description:
      "Full UX redesign of an AI-powered cloud infrastructure automation platform. Transformed cognitively overloaded DevOps dashboards into a clarity-first enterprise product — covering UX research, information architecture, design system, and high-fidelity UI.",
    tags: ["Enterprise UX", "Dashboard Design", "Design System", "DevOps SaaS"],
    accentColor: "#E8273A",
    slug: "/case-study/clappit",
    year: "2024",
    image: "/figmaAssets/clappit-dashboard.png",
  },
];

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/chsaikomal",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com/chsaikomal",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/chsaikomal",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

function useIntersectionAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-8");
          }
        });
      },
      { threshold: 0.1 }
    );
    const children = el.querySelectorAll("[data-animate]");
    children.forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, []);
  return ref;
}

export const Portfolio = (): JSX.Element => {
  const aboutRef = useIntersectionAnimation();
  const skillsRef = useIntersectionAnimation();
  const projectsRef = useIntersectionAnimation();
  const contactRef = useIntersectionAnimation();

  return (
    <div className="min-h-screen bg-black text-white font-['Poppins']">
      <Navbar />

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 70% 50%, rgba(0,128,128,0.15) 0%, transparent 70%), radial-gradient(ellipse 60% 80% at 20% 60%, rgba(100,0,200,0.12) 0%, transparent 60%), #000",
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl w-full px-6 py-32 sm:py-40 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 flex flex-col gap-6">
            <p className="text-white/60 text-lg font-light tracking-widest uppercase">
              Welcome to my portfolio
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light leading-tight">
              Hola, I'm
              <br />
              <span className="font-bold text-[#008080]">Sai Komal</span>
            </h1>

            <div className="flex flex-wrap gap-3 mt-1">
              {["✦ Product Designer", "✦ Graphic Designer", "✦ Frontend Developer"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm text-white/80 backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>

            <p className="mt-2 max-w-xl text-base leading-relaxed text-white/70">
              I am a{" "}
              <span className="underline decoration-[#008080] text-white">
                Product Designer and Front-End Developer
              </span>{" "}
              with a strong passion for creating intuitive and engaging digital
              experiences. With expertise in{" "}
              <span className="underline decoration-[#008080] text-white">
                design research, wireframing, prototyping, and front-end development
              </span>
              , I craft user-centric interfaces that enhance usability and accessibility.
            </p>

            <div className="flex items-center gap-4 mt-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-[#008080] transition-colors duration-200"
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 mt-2">
              <a
                href="https://www.chsaikomal.site/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-[#008080] px-6 py-3 text-sm font-semibold text-white hover:bg-[#006666] transition-colors duration-200"
              >
                Resume
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:border-[#008080] hover:text-[#008080] transition-colors duration-200"
              >
                View Projects
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>

          <div className="hidden lg:flex flex-1 justify-center items-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-[#008080]/20 blur-3xl scale-110" />
              <div className="relative w-72 h-72 xl:w-80 xl:h-80 rounded-full border-2 border-[#008080]/30 flex items-center justify-center animate-float bg-gradient-to-br from-[#008080]/20 to-transparent">
                <div className="w-64 h-64 xl:w-72 xl:h-72 rounded-full border border-white/10 flex items-center justify-center">
                  <span className="text-[120px] select-none">👨‍💻</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 animate-bounce">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutRef} className="py-24 px-6">
        <div className="mx-auto max-w-7xl">
          <div
            data-animate
            className="opacity-0 translate-y-8 transition-all duration-700 ease-out mb-12 flex flex-col gap-2"
          >
            <span className="text-[#008080] text-sm font-semibold tracking-widest uppercase">
              About Me
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold">
              Who I <span className="text-[#008080]">Am</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div
              data-animate
              className="opacity-0 translate-y-8 transition-all duration-700 delay-100 ease-out"
              style={{ transitionDelay: "100ms" }}
            >
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm space-y-6">
                <p className="text-white/80 leading-relaxed text-lg">
                  I'm a <strong className="text-white">Product Designer and Frontend Developer</strong> passionate about
                  crafting digital experiences that are not just beautiful but deeply usable.
                </p>
                <p className="text-white/70 leading-relaxed">
                  With a background spanning design research, wireframing, and front-end implementation,
                  I bridge the gap between design and development — bringing ideas to life with pixel-perfect
                  precision and user empathy at the core.
                </p>
                <p className="text-white/70 leading-relaxed">
                  My design process centers around understanding real users — their needs, frustrations, and goals.
                  Whether it's a shipyard website, a mobile app, or a SaaS dashboard, I approach every project
                  with the same rigor: research first, iterate fast, validate always.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                  {[
                    { label: "Projects", value: "10+" },
                    { label: "Case Studies", value: "5+" },
                    { label: "Skills", value: "18+" },
                    { label: "Years Active", value: "3+" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div className="text-3xl font-bold text-[#008080]">{stat.value}</div>
                      <div className="text-sm text-white/50 mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div
              data-animate
              className="opacity-0 translate-y-8 transition-all duration-700 ease-out flex flex-col gap-6"
              style={{ transitionDelay: "200ms" }}
            >
              <div className="rounded-3xl border border-[#008080]/30 bg-[#008080]/5 p-8">
                <h3 className="text-xl font-semibold text-[#008080] mb-4">Design Philosophy</h3>
                <p className="text-white/70 leading-relaxed">
                  "Good design is invisible — it empowers users to accomplish their goals without friction or confusion.
                  Every pixel, every interaction, every word on the screen is a decision that either builds or breaks trust."
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
                <h3 className="text-xl font-semibold text-white mb-4">What I Bring</h3>
                <ul className="space-y-3">
                  {[
                    "User-centered design approach with deep empathy for real users",
                    "End-to-end design capability from research to high-fidelity prototypes",
                    "Frontend skills to implement and validate designs in code",
                    "Strong collaboration with developers, stakeholders, and product teams",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-white/70">
                      <span className="text-[#008080] mt-1 shrink-0">✦</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" ref={skillsRef} className="py-24 px-6 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl">
          <div
            data-animate
            className="opacity-0 translate-y-8 transition-all duration-700 ease-out mb-12"
          >
            <span className="text-[#008080] text-sm font-semibold tracking-widest uppercase">
              Skills & Tools
            </span>
            <h2 className="mt-2 text-4xl sm:text-5xl font-bold">
              What I <span className="text-[#008080]">Work With</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {skills.map((group, i) => (
              <div
                key={group.category}
                data-animate
                className="opacity-0 translate-y-8 transition-all duration-700 ease-out rounded-3xl border border-white/10 bg-white/5 p-8"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <h3 className="text-lg font-semibold text-[#008080] mb-6 pb-3 border-b border-white/10">
                  {group.category}
                </h3>
                <ul className="space-y-3">
                  {group.items.map((skill) => (
                    <li key={skill} className="flex items-center gap-3 text-white/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#008080] shrink-0" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div
            data-animate
            className="opacity-0 translate-y-8 transition-all duration-700 ease-out"
          >
            <h3 className="text-lg font-semibold text-white/60 mb-6 uppercase tracking-widest text-sm">
              Tools & Software
            </h3>
            <div className="flex flex-wrap gap-4">
              {tools.map((tool) => (
                <div
                  key={tool.name}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 hover:border-[#008080]/50 hover:bg-[#008080]/5 transition-colors duration-200"
                >
                  <span className="text-xl">{tool.icon}</span>
                  <span className="text-white/80 font-medium">{tool.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" ref={projectsRef} className="py-24 px-6">
        <div className="mx-auto max-w-7xl">
          <div
            data-animate
            className="opacity-0 translate-y-8 transition-all duration-700 ease-out mb-12"
          >
            <span className="text-[#008080] text-sm font-semibold tracking-widest uppercase">
              Case Studies
            </span>
            <h2 className="mt-2 text-4xl sm:text-5xl font-bold">
              My <span className="text-[#008080]">Work</span>
            </h2>
            <p className="mt-4 text-white/60 max-w-xl">
              A collection of design projects where I've applied research, strategy, and craft to solve real problems.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {projects.map((project, i) => (
              <div
                key={project.title}
                data-animate
                className="opacity-0 translate-y-8 transition-all duration-700 ease-out"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <Link href={project.slug}>
                  <div
                    className="group cursor-pointer rounded-3xl border border-white/10 bg-white/5 overflow-hidden transition-all duration-300"
                    style={{ ["--accent" as string]: project.accentColor }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = project.accentColor + "66")}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = "")}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                      <div className="overflow-hidden bg-[#0e0e0e]">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-64 lg:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-8 lg:p-12 flex flex-col justify-center gap-6">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-semibold tracking-widest text-white/40 uppercase">
                            {project.year}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-white/20" />
                          <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: project.accentColor }}>
                            Case Study
                          </span>
                        </div>
                        <h3 className="text-2xl lg:text-3xl font-bold text-white transition-colors duration-200" style={{ ["--hover-color" as string]: project.accentColor }}>
                          {project.title}
                        </h3>
                        <p className="text-white/60 leading-relaxed">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-2 font-semibold text-sm group-hover:gap-4 transition-all duration-200" style={{ color: project.accentColor }}>
                          View Case Study
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="py-24 px-6 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl">
          <div
            data-animate
            className="opacity-0 translate-y-8 transition-all duration-700 ease-out mb-12"
          >
            <span className="text-[#008080] text-sm font-semibold tracking-widest uppercase">
              Get In Touch
            </span>
            <h2 className="mt-2 text-4xl sm:text-5xl font-bold">
              Let's <span className="text-[#008080]">Connect</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div
              data-animate
              className="opacity-0 translate-y-8 transition-all duration-700 ease-out"
              style={{ transitionDelay: "100ms" }}
            >
              <p className="text-white/70 leading-relaxed text-lg mb-8">
                Whether you have a project in mind, a collaboration opportunity, or just want to say hello —
                I'd love to hear from you. Let's create something great together.
              </p>
              <div className="flex flex-col gap-4">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 hover:border-[#008080]/50 hover:bg-[#008080]/5 transition-all duration-200 group"
                  >
                    <span className="text-white/60 group-hover:text-[#008080] transition-colors">
                      {s.icon}
                    </span>
                    <span className="text-white/80 font-medium">{s.label}</span>
                    <svg
                      className="w-4 h-4 ml-auto text-white/20 group-hover:text-[#008080] transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            <div
              data-animate
              className="opacity-0 translate-y-8 transition-all duration-700 ease-out rounded-3xl border border-white/10 bg-white/5 p-8"
              style={{ transitionDelay: "200ms" }}
            >
              <h3 className="text-xl font-semibold text-white mb-6">Send a Message</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const name = (form.elements.namedItem("name") as HTMLInputElement).value;
                  const email = (form.elements.namedItem("email") as HTMLInputElement).value;
                  const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;
                  window.open(
                    `mailto:chsaikomal@gmail.com?subject=Portfolio Inquiry from ${name}&body=${message}%0A%0AFrom: ${name} (${email})`,
                    "_blank"
                  );
                }}
                className="flex flex-col gap-5"
              >
                <div>
                  <label className="block text-sm text-white/50 mb-2">Your Name</label>
                  <input
                    name="name"
                    type="text"
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:border-[#008080] focus:outline-none transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/50 mb-2">Email Address</label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:border-[#008080] focus:outline-none transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/50 mb-2">Message</label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:border-[#008080] focus:outline-none transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-xl bg-[#008080] py-3 text-sm font-semibold text-white hover:bg-[#006666] transition-colors duration-200"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/10">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-['Poppins'] text-white/40 text-sm">
            © 2024 Sai Komal. All rights reserved.
          </span>
          <span className="font-['Poppins'] text-white/40 text-sm">
            Designed &amp; Built by{" "}
            <span className="text-[#008080]">Sai Komal</span>
          </span>
        </div>
      </footer>
    </div>
  );
};
