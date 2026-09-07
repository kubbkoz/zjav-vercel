"use client";

import dynamic from "next/dynamic";

const AnimatedSphere = dynamic(
  () => import("./animated-sphere").then((m) => ({ default: m.AnimatedSphere })),
  { ssr: false, loading: () => null }
);

export function MaintenancePage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden noise-overlay">
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
            style={{ top: `${12.5 * (i + 1)}%`, left: 0, right: 0 }}
          />
        ))}
        {[...Array(12)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute w-px bg-foreground/10"
            style={{ left: `${8.33 * (i + 1)}%`, top: 0, bottom: 0 }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <a href="/" className="inline-flex items-center gap-3 mb-10">
          <span className="text-2xl font-display uppercase tracking-tight">
            ZJAV<span className="text-zjav text-glow-zjav">_</span>
          </span>
          <span className="text-xs text-muted-foreground font-mono">zjav.sk</span>
        </a>

        <span className="inline-flex items-center gap-3 rounded-lg border border-zjav/30 bg-zjav/5 px-4 py-2 text-sm font-mono uppercase tracking-wide text-zjav mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse" />
          Prebieha údržba
        </span>

        <h1 className="text-[clamp(2.5rem,9vw,6rem)] font-display uppercase leading-[0.95] tracking-tight mb-6">
          Web je aktuálne
          <br />
          v <span className="text-zjav text-glow-zjav">údržbe</span>.
        </h1>

        <p className="text-lg lg:text-2xl text-muted-foreground leading-relaxed">
          Čoskoro sme späť.<span className="cursor-blink ml-2">_</span>
        </p>
      </div>
    </main>
  );
}
