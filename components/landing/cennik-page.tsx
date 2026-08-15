"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { ArrowRight, Eye, Receipt, ShieldCheck, Ban } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useModal } from "./modal-provider";

const AnimatedSphere = dynamic(
  () => import("./animated-sphere").then((m) => ({ default: m.AnimatedSphere })),
  { ssr: false, loading: () => null }
);

export function CennikHero() {
  const { openModal } = useModal();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-[80vh] flex flex-col justify-center overflow-x-hidden">
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
            Cenník
          </span>
        </div>

        <div className="mb-12">
          <h1
            className={`text-[clamp(2.25rem,8vw,7rem)] font-display uppercase leading-[0.95] tracking-tight transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="block">Transparentná cena.</span>
            <span className="block">
              <span className="text-zjav text-glow-zjav">Bez prekvapení.</span>
              <span className="cursor-blink ml-2 text-foreground">_</span>
            </span>
          </h1>
        </div>

        <p
          className={`text-lg lg:text-2xl text-muted-foreground leading-relaxed max-w-2xl transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Tri balíky, jedna cena za e-shop a nulová záloha vopred. Ceny nižšie sú
          štartovacie — konečnú potvrdíme po prototype, keď presne viete, čo
          dostanete. Žiadne skryté poplatky.
        </p>

        <div
          className={`mt-10 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Button
            size="lg"
            onClick={openModal}
            className="bg-zjav hover:bg-zjav-dark text-background px-6 h-12 text-sm lg:text-base lg:px-8 lg:h-14 rounded-lg glow-zjav font-medium group"
          >
            Chcem nezáväznú cenovú ponuku
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
}

const principles = [
  {
    icon: Eye,
    title: "Najskôr uvidíte, potom platíte",
    description: "Prototyp webu dostanete zadarmo do 24 hodín. Cenu potvrdíme až vtedy, keď presne viete, čo dostanete.",
  },
  {
    icon: Ban,
    title: "Bez zálohy",
    description: "Nič neplatíte vopred. Rozhodujete sa až po tom, čo si pozriete živý prototyp.",
  },
  {
    icon: Receipt,
    title: "Cena dohodnutá vopred",
    description: "Pred začatím prác vždy poznáte finálnu cenu — žiadne prekvapenia na faktúre.",
  },
  {
    icon: ShieldCheck,
    title: "Žiadne skryté poplatky",
    description: "Čo je dohodnuté, to platí. Žiadne dodatočné položky po dokončení projektu.",
  },
];

export function CennikPrinciples() {
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
            Ako tvorím cenu
          </span>
          <span className="block font-mono text-zjav text-2xl mb-1">_</span>
          <h2 className="text-4xl lg:text-6xl font-display uppercase tracking-tight leading-tight">
            Štyri princípy,{" "}
            <span className="text-muted-foreground">jedno pravidlo.</span>
            <span className="cursor-blink ml-2">_</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-foreground/10">
          {principles.map((principle, index) => (
            <div
              key={principle.title}
              className={`bg-background p-8 lg:p-10 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-10 h-10 flex items-center justify-center border border-foreground/10 mb-6">
                <principle.icon className="w-5 h-5 text-zjav" />
              </div>
              <h3 className="text-xl font-display mb-2">{principle.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{principle.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const factors = [
  { label: "Typ projektu", detail: "Firemná prezentácia, web na mieru alebo e-shop na Shopware 6 — každý má inú náročnosť." },
  { label: "Rozsah", detail: "Počet sekcií a podstránok, ktoré váš web skutočne potrebuje." },
  { label: "Dáta a import", detail: "Či prenášame existujúci obsah, produkty alebo dáta z iného systému." },
  { label: "Voliteľné funkcie", detail: "E-shop backend, platby cez Stripe a ďalšie rozšírenia nad rámec základnej ponuky." },
];

export function CennikFactors() {
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
            Čo ovplyvňuje cenu
          </span>
          <span className="block font-mono text-zjav text-2xl mb-1">_</span>
          <h2 className="text-4xl lg:text-6xl font-display uppercase tracking-tight leading-tight">
            Čo posúva cenu{" "}
            <span className="text-muted-foreground">nad štartovaciu sumu.</span>
            <span className="cursor-blink ml-2">_</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-0">
          {factors.map((factor, index) => (
            <div
              key={factor.label}
              className={`py-6 border-b border-foreground/10 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="font-display text-lg mb-1">{factor.label}</div>
              <p className="text-muted-foreground">{factor.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const faqs = [
  {
    question: "Čo znamená „od“ pri cene balíka?",
    answer:
      "Uvedená suma je štartovacia cena balíka v jeho základnom rozsahu. Nad ňu ide cena vtedy, keď potrebujete niečo navyše — napríklad viac podstránok, prenos dát zo starého systému, viacjazyčnú verziu alebo napojenie na váš interný systém. Konečnú cenu poznáte vždy vopred, pred začatím prác.",
  },
  {
    question: "Ako je to s garanciou rýchlosti 95+?",
    answer:
      "Garantujem Lighthouse Performance skóre 95 a viac, merané na mobile v deň odovzdania, na obsahu a doméne dodanej v rámci projektu. Ak sa tam nedostaneme, dolaďujem to na vlastné náklady. Ak si po odovzdaní pridáte skripty tretích strán — chat, externé widgety, ďalšie merania — skóre to môže ovplyvniť a to už mimo mojej kontroly nevie garantovať nikto.",
  },
  {
    question: "Musím si platiť starostlivosť?",
    answer:
      "Nie. Prvé 3 mesiace máte starostlivosť v cene webu. Potom pokračuje za mesačný poplatok, kým ju nezrušíte — zrušiť ju viete kedykoľvek k poslednému dňu prebiehajúceho mesiaca, bez výpovednej lehoty. Aj po zrušení web ostáva váš: dostanete repozitár aj dáta a môžete ho presunúť kamkoľvek.",
  },
  {
    question: "Musím platiť zálohu vopred?",
    answer:
      "Nie. Neplatíte nič, kým sa po prototype zadarmo sami nerozhodnete pokračovať.",
  },
  {
    question: "Môže sa cena počas projektu zmeniť?",
    answer:
      "Cenu potvrdíme vopred, pred začatím prác. Ak by sa počas projektu zmenil rozsah (napríklad pridáte nové funkcie), na akejkoľvek zmene sa dohodneme vopred — žiadne prekvapenia na faktúre.",
  },
  {
    question: "Ako rýchlo dostanem cenovú ponuku?",
    answer:
      "Napíšte mi cez formulár nižšie alebo na hello@zjav.sk — spolu s prototypom do 24 hodín dostanete aj orientačný rozsah ďalšieho postupu.",
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

export function CennikFaq() {
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
            O cene{" "}
            <span className="text-muted-foreground">a platbách.</span>
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
