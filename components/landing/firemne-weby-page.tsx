"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight, Smartphone, Lock, Search, Mail, ExternalLink, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useModal } from "./modal-provider";
import { packages } from "./cennik-packages";

const AnimatedSphere = dynamic(
  () => import("./animated-sphere").then((m) => ({ default: m.AnimatedSphere })),
  { ssr: false, loading: () => null }
);

export function FiremneWebyHero() {
  const { openModal } = useModal();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center overflow-x-hidden">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] lg:w-[800px] lg:h-[800px] opacity-40 pointer-events-none">
        <AnimatedSphere />
      </div>
      <div className="absolute inset-0 bg-scanline pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pt-40 pb-24 lg:py-40">
        <div
          className={`mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="inline-flex items-center gap-3 rounded-lg border border-zjav/30 bg-zjav/5 px-4 py-2 text-sm font-mono uppercase tracking-wide text-zjav">
            <span className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse" />
            Firemné weby
          </span>
        </div>

        <div className="mb-12">
          <h1
            className={`text-[clamp(2.25rem,8vw,7rem)] font-display uppercase leading-[0.95] tracking-tight transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="block">Firemný web,</span>
            <span className="block">
              ktorý{" "}
              <span className="text-zjav text-glow-zjav">pracuje za vás.</span>
              <span className="cursor-blink ml-2 text-foreground">_</span>
            </span>
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-24 items-end">
          <p
            className={`text-lg lg:text-2xl text-muted-foreground leading-relaxed max-w-xl transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Moderná online prezentácia pre vašu firmu alebo živnosť — na mieru,
            nie zo šablóny. Responzívny dizajn, SSL, SEO základ aj kontaktný
            formulár priamo do e-mailu. Najskôr nezáväzný prototyp zadarmo.
          </p>

          <div
            className={`flex flex-row flex-wrap items-center gap-3 transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Button
              size="lg"
              onClick={() => openModal()}
              className="bg-zjav hover:bg-zjav-dark text-background px-6 h-12 text-sm lg:text-base lg:px-8 lg:h-14 rounded-lg glow-zjav font-medium group shrink-0"
            >
              Chcem náhľad webu
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="h-12 px-6 text-sm lg:text-base lg:px-8 lg:h-14 rounded-lg border-foreground/20 hover:bg-foreground/5 shrink-0"
            >
              <Link href="/#faq">Časté otázky</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

const benefits = [
  {
    icon: Smartphone,
    title: "Responzívny dizajn",
    description: "Perfektne funguje na mobile, tablete aj desktope — bez kompromisov v dizajne.",
  },
  {
    icon: Lock,
    title: "SSL a zabezpečenie",
    description: "HTTPS a moderné zabezpečenie sú súčasťou každého webu, ktorý postavím.",
  },
  {
    icon: Search,
    title: "SEO základ",
    description: "Web pripravený tak, aby vás vedeli nájsť vo vyhľadávaní od prvého dňa.",
  },
  {
    icon: Mail,
    title: "Kontaktný formulár",
    description: "Dopyty od zákazníkov chodia priamo do vášho e-mailu, bez ďalších nástrojov.",
  },
];

export function FiremneWebyBenefits() {
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
    <section ref={sectionRef} className="relative py-24 lg:py-32 border-t border-foreground/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-16 lg:mb-24 max-w-3xl">
          <span className="inline-flex items-center gap-3 text-sm font-mono uppercase tracking-wide text-muted-foreground mb-6">
            <span className="w-8 h-px bg-signal shadow-[0_0_8px_rgba(0,229,160,0.6)]" />
            Čo dostanete
          </span>
          <span className="block font-mono text-zjav text-2xl mb-1">_</span>
          <h2 className="text-4xl lg:text-6xl font-display uppercase tracking-tight leading-tight">
            Web na mieru,{" "}
            <span className="text-muted-foreground">nie šablóna.</span>
            <span className="cursor-blink ml-2">_</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-foreground/10">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className={`bg-background p-8 lg:p-10 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-10 h-10 flex items-center justify-center border border-foreground/10 mb-6">
                <benefit.icon className="w-5 h-5 text-zjav" />
              </div>
              <h3 className="text-xl font-display mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Proof point */}
        <div
          className={`mt-16 flex items-center gap-4 p-6 border border-foreground/10 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-signal animate-pulse shrink-0" />
          <p className="text-sm lg:text-base text-muted-foreground">
            Nasadené naostro:{" "}
            <a
              href="https://robotlm.sk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zjav hover:underline underline-offset-4 inline-flex items-center gap-1"
            >
              robotlm.sk
              <ExternalLink className="w-3 h-3" />
            </a>{" "}
            — firemná prezentácia postavená presne na tomto stacku.
          </p>
        </div>
      </div>
    </section>
  );
}

export function FiremneWebyPricing() {
  const { openModal } = useModal();
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
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-secondary border-y border-border">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-16 lg:mb-20 max-w-3xl">
          <span className="inline-flex items-center gap-3 text-sm font-mono uppercase tracking-wide text-muted-foreground mb-6">
            <span className="w-8 h-px bg-signal shadow-[0_0_8px_rgba(0,229,160,0.6)]" />
            Cena
          </span>
          <span className="block font-mono text-zjav text-2xl mb-1">_</span>
          <h2 className="text-4xl lg:text-6xl font-display uppercase tracking-tight leading-tight">
            Tri balíky,{" "}
            <span className="text-muted-foreground">jedna transparentná cena.</span>
            <span className="cursor-blink ml-2">_</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-px bg-foreground/10">
          {packages.map((pkg, index) => (
            <div
              key={pkg.id}
              className={`relative flex flex-col p-8 transition-all duration-700 ${
                pkg.highlight ? "bg-background ring-1 ring-inset ring-zjav/30" : "bg-background"
              } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              {pkg.badge && (
                <span className="absolute -top-px left-8 inline-flex items-center gap-2 bg-zjav px-3 py-1 text-xs font-mono uppercase tracking-wide text-background">
                  <span className="w-1.5 h-1.5 rounded-full bg-background animate-pulse" />
                  {pkg.badge}
                </span>
              )}
              <div className="w-10 h-10 flex items-center justify-center border border-foreground/10 mb-6 mt-2">
                <pkg.icon className="w-5 h-5 text-zjav" />
              </div>
              <h3 className="font-display text-2xl uppercase tracking-tight">{pkg.name}</h3>
              <p className="text-muted-foreground mt-1 mb-6">{pkg.promise}</p>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-sm font-mono uppercase tracking-wide text-muted-foreground">od</span>
                <span
                  className={`font-display text-5xl leading-none ${pkg.highlight ? "text-zjav text-glow-zjav" : ""}`}
                >
                  {pkg.price}
                </span>
                <span className="font-display text-2xl text-muted-foreground">€</span>
              </div>
              <p className="text-sm font-mono uppercase tracking-wide text-muted-foreground mb-8">{pkg.scope}</p>

              <ul className="space-y-3 mb-10 flex-1">
                {pkg.features.slice(0, 4).map((feature) => (
                  <li key={feature} className="flex gap-3 text-sm leading-relaxed">
                    <Check className="w-4 h-4 text-signal shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant="outline"
                onClick={() => openModal({ type: "package", packageName: pkg.name })}
                className={`w-full h-12 rounded-lg font-medium group ${
                  pkg.highlight
                    ? "bg-zjav hover:bg-zjav-dark text-background glow-zjav border-transparent"
                    : "bg-transparent border-foreground/20 hover:border-zjav hover:bg-transparent hover:text-zjav"
                }`}
              >
                Chcem prototyp zadarmo
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm text-muted-foreground leading-relaxed max-w-3xl">
          Ceny sú štartovacie, bez DPH. Konečnú potvrdíme po prototype, keď presne viete, čo dostanete.{" "}
          <Link href="/cennik" className="text-zjav hover:underline underline-offset-4">
            Celý cenník aj s mesačnou starostlivosťou →
          </Link>
        </p>
      </div>
    </section>
  );
}

const steps = [
  {
    number: "I",
    title: "Napíšte mi, čo potrebujete",
    description: "Nezáväzne opíšte svoje podnikanie a predstavu o webe. Stačí pár viet.",
  },
  {
    number: "II",
    title: "Do 24 h dostanete prototyp",
    description: "Živý náhľad vášho nového webu — zadarmo, bez akéhokoľvek záväzku.",
  },
  {
    number: "III",
    title: "Spustíme web do 7 dní",
    description: "Ak sa vám náhľad páči, web dokončím na kľúč a nasadím ho online.",
  },
];

export function FiremneWebyProcess() {
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
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-secondary border-y border-border">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-16 lg:mb-20 max-w-3xl">
          <span className="inline-flex items-center gap-3 text-sm font-mono uppercase tracking-wide text-muted-foreground mb-6">
            <span className="w-8 h-px bg-signal shadow-[0_0_8px_rgba(0,229,160,0.6)]" />
            Ako to funguje
          </span>
          <span className="block font-mono text-zjav text-2xl mb-1">_</span>
          <h2 className="text-4xl lg:text-6xl font-display uppercase tracking-tight leading-tight">
            Tri kroky,{" "}
            <span className="text-muted-foreground">nulové riziko.</span>
            <span className="cursor-blink ml-2">_</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <span className="font-mono text-3xl text-zjav">{step.number}</span>
              <h3 className="text-2xl font-display mt-4 mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const faqs = [
  {
    question: "Koľko stojí firemný web?",
    answer:
      "Od 490 € za jednostránkový web (balík ŠTART_), od 790 € za web do 5 podstránok s pokročilým SEO (balík PREDAJ_, najobľúbenejší), od 990 € za web do 7 podstránok s meraním konverzií (balík VÝKON_). Presnú cenu potvrdíme po prototype zadarmo.",
  },
  {
    question: "Dostanem šablónu, alebo web postavený na mieru?",
    answer:
      "Web na mieru. Dizajn aj obsah pripravím presne pre vaše podnikanie — žiadne generické šablóny z internetu.",
  },
  {
    question: "Koľko podstránok bude mať môj firemný web?",
    answer:
      "Podľa zvoleného balíka: ŠTART_ je jednostránkový web, PREDAJ_ má do 5 podstránok, VÝKON_ do 7 podstránok. Ak potrebujete viac, štruktúru prispôsobím na mieru.",
  },
  {
    question: "Ako dlho trvá, kým bude web hotový?",
    answer:
      "Nezáväzný prototyp dostanete do 24 hodín. Ak sa vám páči, hotový web na kľúč nasadím online do 7 dní.",
  },
  {
    question: "Musím platiť zálohu vopred?",
    answer:
      "Nie. Najprv uvidíte živý prototyp svojho webu zadarmo — platíte až vtedy, keď sa sami rozhodnete ísť do toho ďalej.",
  },
  {
    question: "Je web pripravený na to, aby ma zákazníci našli v Google?",
    answer:
      "Áno, SEO základ (nadpisy, meta popisy, rýchlosť načítania) je súčasťou každého webu, ktorý postavím.",
  },
  {
    question: "Čo ak potrebujem web upraviť aj po spustení?",
    answer:
      'Napíšte mi na hello@zjav.sk alebo cez formulár nižšie ("Nezáväzný dopyt") — úpravy a rozšírenia riešime priebežne podľa dohody.',
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export function FiremneWebyFaq() {
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
    <section className="relative py-24 lg:py-32 bg-foreground/[0.02]" ref={sectionRef}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div
          className={`text-center max-w-3xl mx-auto mb-16 lg:mb-20 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm font-mono uppercase tracking-wide text-muted-foreground mb-6">
            <span className="w-8 h-px bg-signal shadow-[0_0_8px_rgba(0,229,160,0.6)]" />
            Časté otázky
          </span>
          <span className="block font-mono text-zjav text-2xl mb-1">_</span>
          <h2 className="text-4xl lg:text-6xl font-display uppercase tracking-tight leading-tight">
            O firemných{" "}
            <span className="text-muted-foreground">weboch.</span>
            <span className="cursor-blink ml-2">_</span>
          </h2>
        </div>

        <div
          className={`max-w-3xl mx-auto transition-all duration-700 delay-150 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`item-${index}`}
                className="border-foreground/10 px-2"
              >
                <AccordionTrigger className="text-left text-lg lg:text-xl font-medium py-6 hover:no-underline [&[data-state=open]]:text-zjav">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
