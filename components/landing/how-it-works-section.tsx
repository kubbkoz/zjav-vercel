"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "I",
    title: "Napíšte mi, čo potrebujete",
    description: "Nezáväzne mi opíšte svoje podnikanie a predstavu o webe. Stačí pár viet — o zvyšok sa postarám.",
    code: `// ZJAV_ — váš projekt
const projekt = {
  typ: 'firemná prezentácia',
  cieľ: 'viac zákazníkov',
  zaviazok: false
}`,
  },
  {
    number: "II",
    title: "Do 24 h dostanete prototyp",
    description: "Pošlem vám živý náhľad vášho nového webu — zadarmo. Pozriete si dizajn aj obsah, bez akéhokoľvek záväzku.",
    code: `// Prototyp — Nuxt + Shopware 6
zjav.prototyp({
  nahlad: 'zadarmo',
  dodanie: '24 hodín',
  rozhodnutie: 'na vás'
})`,
  },
  {
    number: "III",
    title: "Spustíme web do 7 dní",
    description: "Ak sa vám náhľad páči, dokončím web na kľúč a nasadím ho online. Rýchlo, spoľahlivo a na mieru.",
    code: `zjav.deploy({
  stack: ['Next.js', 'Nuxt', 'Shopware 6'],
  hosting: 'Vercel',
  dodanie: '7 dní'
})

// Web je online ✔`,
  },
];

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-secondary text-foreground border-y border-border overflow-hidden"
    >
      {/* Scanline overlay */}
      <div className="absolute inset-0 bg-scanline pointer-events-none" />

      {/* Diagonal lines pattern */}
      <div className="absolute inset-0 opacity-[0.04] text-zjav pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 40px,
            currentColor 40px,
            currentColor 41px
          )`
        }} />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <span className="inline-flex items-center gap-3 text-sm font-mono uppercase tracking-wide text-muted-foreground mb-6">
            <span className="w-8 h-px bg-signal shadow-[0_0_8px_rgba(0,229,160,0.6)]" />
            Ako to funguje
          </span>
          <h2
            className={`text-4xl lg:text-6xl font-display uppercase tracking-tight transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="font-mono text-zjav">&gt;_</span> Tri kroky.
            <br />
            <span className="text-muted-foreground">Web bez rizika.</span>
            <span className="cursor-blink ml-2">_</span>
          </h2>
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Steps */}
          <div className="space-y-0">
            {steps.map((step, index) => (
              <button
                key={step.number}
                type="button"
                onClick={() => setActiveStep(index)}
                className={`w-full text-left py-8 border-b border-border transition-all duration-500 group ${
                  activeStep === index ? "opacity-100" : "opacity-40 hover:opacity-70"
                }`}
              >
                <div className="flex items-start gap-6">
                  <span className={`font-mono text-3xl transition-colors duration-300 ${activeStep === index ? "text-zjav" : "text-muted-foreground/40"}`}>{step.number}</span>
                  <div className="flex-1">
                    <h3 className="text-2xl lg:text-3xl font-display mb-3 group-hover:translate-x-2 transition-transform duration-300">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                    
                    {/* Progress indicator */}
                    {activeStep === index && (
                      <div className="mt-4 h-px bg-border overflow-hidden">
                        <div 
                          className="h-full bg-zjav w-0"
                          style={{
                            animation: 'progress 5s linear forwards'
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Code display */}
          <div className="lg:sticky lg:top-32 self-start">
            <div className="border border-border bg-background overflow-hidden glow-zjav">
              {/* Window header */}
              <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-muted-foreground/30" />
                  <div className="w-3 h-3 rounded-full bg-muted-foreground/30" />
                  <div className="w-3 h-3 rounded-full bg-zjav/60" />
                </div>
                <span className="text-xs font-mono text-muted-foreground">zjav.config.ts</span>
              </div>

              {/* Code content */}
              <div className="p-8 font-mono text-sm min-h-[280px]">
                <pre className="text-foreground/80">
                  {steps[activeStep].code.split('\n').map((line, lineIndex) => (
                    <div 
                      key={`${activeStep}-${lineIndex}`} 
                      className="leading-loose code-line-reveal"
                      style={{ 
                        animationDelay: `${lineIndex * 80}ms`,
                      }}
                    >
                      <span className="text-zjav/40 select-none w-8 inline-block">{lineIndex + 1}</span>
                      <span className="inline-flex">
                        {line.split('').map((char, charIndex) => (
                          <span
                            key={`${activeStep}-${lineIndex}-${charIndex}`}
                            className="code-char-reveal"
                            style={{
                              animationDelay: `${lineIndex * 80 + charIndex * 15}ms`,
                            }}
                          >
                            {char === ' ' ? '\u00A0' : char}
                          </span>
                        ))}
                      </span>
                    </div>
                  ))}
                </pre>
              </div>

              {/* Status */}
              <div className="px-6 py-4 border-t border-border flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-signal animate-pulse" />
                <span className="text-xs font-mono text-muted-foreground">Pripravené</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        
        .code-line-reveal {
          opacity: 0;
          transform: translateX(-8px);
          animation: lineReveal 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        
        @keyframes lineReveal {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .code-char-reveal {
          opacity: 0;
          filter: blur(8px);
          animation: charReveal 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        
        @keyframes charReveal {
          to {
            opacity: 1;
            filter: blur(0);
          }
        }
      `}</style>
    </section>
  );
}
