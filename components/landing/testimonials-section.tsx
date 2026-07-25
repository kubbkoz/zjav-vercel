"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    name: "robotlm.sk",
    url: "https://robotlm.sk",
    logo: "/logos/robotlm.svg",
    logoWidth: 130,
    logoHeight: 30,
    status: "live" as const,
    tag: "Firemný web",
  },
  {
    name: "slickly.sk",
    url: "https://slickly.sk",
    logo: "/logos/slickly.png",
    logoWidth: 110,
    logoHeight: 32,
    status: "live" as const,
    tag: "E-shop",
  },
  {
    name: "mtsport",
    url: null,
    logo: "/logos/mtsport.png",
    logoWidth: 120,
    logoHeight: 32,
    status: "soon" as const,
    tag: "E-shop",
  },
  {
    name: "travel.zjav.sk",
    url: null,
    logo: "/logos/travelhub.png",
    logoWidth: 130,
    logoHeight: 36,
    status: "soon" as const,
    tag: "Firemný web",
  },
  {
    name: "homx.zjav.sk",
    url: null,
    logo: "/logos/homx.png",
    logoWidth: 100,
    logoHeight: 32,
    status: "soon" as const,
    tag: "Firemný web",
  },
  {
    name: "Káva & Láska",
    url: null,
    logo: "/logos/kava-a-laska.png",
    logoWidth: 120,
    logoHeight: 32,
    status: "soon" as const,
    tag: "Firemný web / E-shop",
  },
];

// Duplicate for seamless loop
const loopedProjects = [...projects, ...projects];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative py-24 lg:py-32 border-t border-foreground/10 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-14">

        {/* Header — matches other sections */}
        <span className="inline-flex items-center gap-3 text-sm font-mono uppercase tracking-wide text-muted-foreground mb-6">
          <span className="w-8 h-px bg-signal shadow-[0_0_8px_rgba(0,229,160,0.6)]" />
          Referencie
        </span>
        <div>
          <span className="block font-mono text-zjav text-2xl mb-1">_</span>
          <h2 className="text-4xl lg:text-6xl font-display uppercase tracking-tight leading-tight">
            Projekty, na ktorých{" "}
            <span className="text-muted-foreground">pracujeme.</span>
            <span className="cursor-blink ml-2">_</span>
          </h2>
        </div>
      </div>

      {/* Scrolling logo strip */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-r from-background to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-l from-background to-transparent" />

        <div className="flex gap-16 animate-marquee whitespace-nowrap w-max">
          {loopedProjects.map((project, i) => (
            <div
              key={`${project.name}-${i}`}
              className="inline-flex flex-col items-center gap-3 w-40 shrink-0"
            >
              {/* Logo — grayscale, no background block */}
              <div className="flex items-center justify-center h-12">
                <Image
                  src={project.logo}
                  alt={project.name}
                  width={project.logoWidth}
                  height={project.logoHeight}
                  className="object-contain max-h-10 grayscale brightness-150 opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                />
              </div>

              {/* Type */}
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60">
                {project.tag}
              </span>

              {/* Status */}
              {project.status === "live" ? (
                <a
                  href={project.url!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-zjav hover:underline underline-offset-4 transition-all"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse" />
                  Nasadené
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              ) : (
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
                  Pripravujeme
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
