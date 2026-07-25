"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";

type Status = "live" | "soon";

const projects: {
  name: string;
  url: string | null;
  logo: string;
  logoBg: string;
  logoWidth: number;
  logoHeight: number;
  status: Status;
  tag: string;
}[] = [
  {
    name: "robotlm.sk",
    url: "https://robotlm.sk",
    logo: "/logos/robotlm.svg",
    logoBg: "bg-[#0d1b2a]",
    logoWidth: 120,
    logoHeight: 18,
    status: "live",
    tag: "Firemný web",
  },
  {
    name: "slickly.sk",
    url: "https://slickly.sk",
    logo: "/logos/slickly.png",
    logoBg: "bg-black",
    logoWidth: 100,
    logoHeight: 28,
    status: "live",
    tag: "Firemný web",
  },
  {
    name: "mtsport",
    url: null,
    logo: "/logos/mtsport.png",
    logoBg: "bg-[#111]",
    logoWidth: 110,
    logoHeight: 28,
    status: "soon",
    tag: "E-shop",
  },
  {
    name: "travel.zjav.sk",
    url: null,
    logo: "/logos/travelhub.png",
    logoBg: "bg-[#132240]",
    logoWidth: 120,
    logoHeight: 32,
    status: "soon",
    tag: "Firemný web",
  },
  {
    name: "homx.zjav.sk",
    url: null,
    logo: "/logos/homx.png",
    logoBg: "bg-white",
    logoWidth: 90,
    logoHeight: 28,
    status: "soon",
    tag: "Startup",
  },
  {
    name: "Káva & Láska",
    url: null,
    logo: "/logos/kava-a-laska.png",
    logoBg: "bg-[#f5f0e8]",
    logoWidth: 110,
    logoHeight: 28,
    status: "soon",
    tag: "Firemný web",
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative py-24 lg:py-32 border-t border-foreground/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            Referencie
          </span>
          <div className="flex-1 h-px bg-foreground/10" />
          <span className="font-mono text-xs text-muted-foreground">
            {projects.filter(p => p.status === "live").length} nasadených · {projects.filter(p => p.status === "soon").length} pripravujeme
          </span>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <div
              key={project.name}
              className="group relative border border-border hover:border-zjav/40 transition-all duration-300 bg-secondary/30 hover:bg-secondary/60"
            >
              {/* Logo area */}
              <div className={`flex items-center justify-center h-32 ${project.logoBg} relative overflow-hidden`}>
                <Image
                  src={project.logo}
                  alt={project.name}
                  width={project.logoWidth}
                  height={project.logoHeight}
                  className="object-contain max-h-12"
                />
              </div>

              {/* Info bar */}
              <div className="px-5 py-4 flex items-center justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-xs text-muted-foreground">{project.tag}</span>
                  <span className="font-display text-sm tracking-wide text-foreground">{project.name}</span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {project.status === "live" ? (
                    <a
                      href={project.url!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-xs text-zjav border border-zjav/30 hover:border-zjav/60 hover:bg-zjav/5 px-3 py-1.5 transition-all duration-200"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse" />
                      Nasadené
                      <ExternalLink className="w-3 h-3 ml-0.5" />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground border border-border px-3 py-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40" />
                      Pripravujeme
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
