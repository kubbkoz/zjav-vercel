"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";
import { useModal } from "./modal-provider";

const AnimatedSphere = dynamic(
  () => import("./animated-sphere").then((m) => ({ default: m.AnimatedSphere })),
  { ssr: false, loading: () => null }
);

const words = ["zviditeľní", "predáva", "presvedčí", "posunie"];

export function HeroSection() {
  const { openModal } = useModal();
  const [isVisible, setIsVisible] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-x-hidden">
      {/* Animated sphere background */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] lg:w-[800px] lg:h-[800px] opacity-40 pointer-events-none">
        <AnimatedSphere />
      </div>
      
      {/* Scanline overlay */}
      <div className="absolute inset-0 bg-scanline pointer-events-none" />

      {/* Subtle grid lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        {[...Array(8)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute h-px bg-foreground/10"
            style={{
              top: `${12.5 * (i + 1)}%`,
              left: 0,
              right: 0,
            }}
          />
        ))}
        {[...Array(12)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute w-px bg-foreground/10"
            style={{
              left: `${8.33 * (i + 1)}%`,
              top: 0,
              bottom: 0,
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pt-32 pb-40 lg:py-40">
        {/* Eyebrow */}
        <div 
          className={`mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="inline-flex items-center gap-3 rounded-lg border border-zjav/30 bg-zjav/5 px-4 py-2 text-sm font-mono uppercase tracking-wide text-zjav">
            <span className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse" />
            Prototyp ZADARMO do 24 hodín
          </span>
        </div>
        
        {/* Main headline */}
        <div className="mb-12">
          <h1 
            className={`text-[clamp(2.5rem,10vw,10rem)] font-display uppercase leading-[0.9] tracking-tight transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="block">Web, ktorý</span>
            <span className="block">
              vás{" "}
              <span className="relative inline-block">
                <span 
                  key={wordIndex}
                  className="inline-flex text-zjav text-glow-zjav"
                >
                  {words[wordIndex].split("").map((char, i) => (
                    <span
                      key={`${wordIndex}-${i}`}
                      className="inline-block animate-char-in"
                      style={{
                        animationDelay: `${i * 50}ms`,
                      }}
                    >
                      {char}
                    </span>
                  ))}
                </span>
                <span className="absolute -bottom-2 left-0 right-0 h-3 bg-zjav/20" />
              </span>
              <span className="cursor-blink ml-2">_</span>
            </span>
          </h1>
        </div>
        
        {/* Description */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-24 items-end">
          <p 
            className={`text-lg lg:text-2xl text-muted-foreground leading-relaxed max-w-xl transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Chcete viac zákazníkov a modernú online prezentáciu? Dnes sa bez webu
            nepohnete. Pošlem vám nezáväzný náhľad webu <span className="text-foreground">zadarmo</span> —
            až potom sa rozhodnete, či do toho ideme.
          </p>
          
          {/* CTAs */}
          <div 
            className={`flex flex-row flex-wrap items-center gap-3 transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Button 
              size="lg"
              onClick={openModal}
              className="bg-zjav hover:bg-zjav-dark text-background px-6 h-12 text-sm lg:text-base lg:px-8 lg:h-14 rounded-lg glow-zjav font-medium group shrink-0"
            >
              Chcem náhľad zadarmo
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
              className="h-12 px-6 text-sm lg:text-base lg:px-8 lg:h-14 rounded-lg border-foreground/20 hover:bg-foreground/5 shrink-0"
            >
              Ako to funguje
            </Button>
          </div>
        </div>
        
      </div>

      {/* Stats marquee - full width, in flow below content */}
      <div 
        className={`relative z-10 w-full pb-12 transition-all duration-700 delay-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="flex gap-16 marquee whitespace-nowrap">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-16">
                {[
                  { value: "24 h", label: "prototyp zadarmo", company: "BEZ RIZIKA" },
                  { value: "7 dní", label: "hotový web na kľúč", company: "NA MIERU" },
                  { value: "0 €", label: "za nezáväzný náhľad", company: "NAJSKÔR VIDÍTE" },
                  { value: "100%", label: "vlastný dizajn", company: "SHOPWARE · NUXT" },
                ].map((stat) => (
                  <div key={`${stat.company}-${i}`} className="flex items-baseline gap-3">
                    <span className="text-2xl lg:text-4xl font-display text-zjav">{stat.value}</span>
                    <span className="text-xs lg:text-sm text-muted-foreground">
                      {stat.label}
                      <span className="block font-mono text-[10px] lg:text-xs mt-0.5 opacity-60">{stat.company}</span>
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
