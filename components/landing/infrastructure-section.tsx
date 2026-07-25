"use client";

import { useEffect, useState, useRef } from "react";

const locations = [
  { city: "Responzívny dizajn", region: "Perfektné na mobile aj desktope", latency: "v cene" },
  { city: "SSL certifikát", region: "Zabezpečené pripojenie HTTPS", latency: "v cene" },
  { city: "SEO základ", region: "Aby vás našli vo vyhľadávaní", latency: "v cene" },
  { city: "Kontaktné formuláre", region: "Dopyty priamo do e-mailu", latency: "v cene" },
  { city: "Import / Export dát", region: "Napojenie na vaše systémy", latency: "v cene" },
  { city: "Shopware 6 backend", region: "E-shop pripravený na rast", latency: "voliteľné" },
];

export function InfrastructureSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeLocation, setActiveLocation] = useState(0);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLocation((prev) => (prev + 1) % locations.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Content */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <span className="inline-flex items-center gap-3 text-sm font-mono uppercase tracking-wide text-muted-foreground mb-6">
              <span className="w-8 h-px bg-signal shadow-[0_0_8px_rgba(0,229,160,0.6)]" />
              Výkon
            </span>
            <h2 className="text-4xl lg:text-6xl font-display uppercase tracking-tight mb-8">
              <span className="font-mono text-zjav">&gt;_</span> Rýchly web
              <br />
              je samozrejmosť.
              <span className="cursor-blink ml-2">_</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-12">
              Weby staviam na Verceli a moderných technológiách — Next.js a Nuxt.
              Bleskové načítanie, spoľahlivá prevádzka a bezpečnosť už v základe.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div>
                <div className="text-4xl lg:text-5xl font-display text-zjav mb-2">7 dní</div>
                <div className="text-sm text-muted-foreground">Dodanie na kľúč</div>
              </div>
              <div>
                <div className="text-4xl lg:text-5xl font-display text-zjav mb-2">99.9%</div>
                <div className="text-sm text-muted-foreground">Dostupnosť</div>
              </div>
              <div>
                <div className="text-4xl lg:text-5xl font-display text-zjav mb-2">&lt;1s</div>
                <div className="text-sm text-muted-foreground">Načítanie</div>
              </div>
            </div>
          </div>

          {/* Right: Location list */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="border border-foreground/10">
              {/* Header */}
              <div className="px-6 py-4 border-b border-foreground/10 flex items-center justify-between">
                <span className="text-sm font-mono uppercase tracking-wide text-muted-foreground">V cene každého webu</span>
                <span className="flex items-center gap-2 text-xs font-mono text-signal">
                  <span className="w-2 h-2 rounded-full bg-signal animate-pulse" />
                  Kompletne
                </span>
              </div>

              {/* Locations */}
              <div>
                {locations.map((location, index) => (
                  <div
                    key={location.city}
                    className={`px-6 py-5 border-b border-foreground/5 last:border-b-0 flex items-center justify-between transition-all duration-300 ${
                      activeLocation === index ? "bg-foreground/[0.02]" : ""
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span 
                        className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                          activeLocation === index ? "bg-zjav" : "bg-foreground/20"
                        }`}
                      />
                      <div>
                        <div className="font-medium">{location.city}</div>
                        <div className="text-sm text-muted-foreground">{location.region}</div>
                      </div>
                    </div>
                    <span className="font-mono text-sm text-muted-foreground">{location.latency}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
