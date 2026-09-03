"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { projects, type Project } from "@/lib/projects";

function ProjectCard({ project, index, isVisible }: { project: Project; index: number; isVisible: boolean }) {
  return (
    <Link
      href={`/prace/${project.slug}`}
      className={`group flex flex-col border border-foreground/10 hover:border-zjav/30 bg-background transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-foreground/10 bg-foreground/[0.02]">
        <div className="flex gap-1.5 shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-zjav/40" />
        </div>
        <span className="ml-2 text-xs font-mono text-muted-foreground truncate">{project.domain}</span>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          aria-label={`Otvoriť ${project.domain} v novej záložke`}
          className="ml-auto text-muted-foreground/60 hover:text-zjav transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Screenshot / placeholder */}
      <div className="relative block aspect-[16/10] bg-secondary overflow-hidden">
        {project.screenshot ? (
          <Image
            src={project.screenshot}
            alt={`Screenshot webu ${project.name}`}
            fill
            className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center px-6">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/40">
              Screenshot čoskoro
            </span>
            <span className="font-display text-2xl uppercase text-muted-foreground/30">{project.name}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <span className="text-xs font-mono uppercase tracking-widest text-zjav mb-3">{project.tag}</span>
        <h3 className="font-display text-xl uppercase tracking-tight mb-2">{project.tagline}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">{project.description}</p>
        <span className="inline-flex items-center gap-1.5 text-sm font-mono text-foreground/80 group-hover:text-zjav transition-colors">
          Case study
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

export function WorkSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="work" ref={sectionRef} className="relative py-24 lg:py-32 border-t border-foreground/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-16 lg:mb-20 max-w-3xl">
          <span className="inline-flex items-center gap-3 text-sm font-mono uppercase tracking-wide text-muted-foreground mb-6">
            <span className="w-8 h-px bg-signal shadow-[0_0_8px_rgba(0,229,160,0.6)]" />
            Práce
          </span>
          <span className="block font-mono text-zjav text-2xl mb-1">_</span>
          <h2 className="text-4xl lg:text-6xl font-display uppercase tracking-tight leading-tight">
            Weby, ktoré{" "}
            <span className="text-muted-foreground">som spustil.</span>
            <span className="cursor-blink ml-2">_</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {projects.map((project, index) => (
            <ProjectCard key={project.domain} project={project} index={index} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
