"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight, ShoppingCart, PackageCheck, CreditCard, Rocket, ExternalLink, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useModal } from "./modal-provider";
import { eshop } from "./cennik-packages";

const AnimatedSphere = dynamic(
  () => import("./animated-sphere").then((m) => ({ default: m.AnimatedSphere })),
  { ssr: false, loading: () => null }
);

export function EshopHero() {
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
            E-shop / Shopware 6
          </span>
        </div>

        <div className="mb-12">
          <h1
            className={`text-[clamp(2.25rem,8vw,7rem)] font-display uppercase leading-[0.95] tracking-tight transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="block">E-shop, ktorý</span>
            <span className="block text-zjav text-glow-zjav">predáva.<span className="cursor-blink ml-2 text-foreground">_</span></span>
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-24 items-end">
          <p
            className={`text-lg lg:text-2xl text-muted-foreground leading-relaxed max-w-xl transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            E-shop postavený na <span className="text-foreground">Shopware 6</span> — robustnom
            backende pripravenom na rast. Import produktov z vášho súčasného systému,
            platby, aj rýchly hosting na Verceli. Najskôr nezáväzný prototyp zadarmo.
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
              Chcem náhľad e-shopu
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
    icon: PackageCheck,
    title: "Shopware 6 backend",
    description: "Robustný open-source e-commerce backend pripravený na rast — od desiatok po tisícky produktov.",
  },
  {
    icon: ShoppingCart,
    title: "Import produktov a dát",
    description: "Prenesiem váš existujúci katalóg a dáta z pôvodného systému bez straty a chaosu.",
  },
  {
    icon: CreditCard,
    title: "Platby cez Stripe",
    description: "Bezpečné online platby priamo v e-shope, pripravené na kartové aj iné metódy.",
  },
  {
    icon: Rocket,
    title: "Hosting na Verceli",
    description: "Rýchle načítanie a spoľahlivá prevádzka — rovnaký stack, na ktorom bežia moje ostatné projekty.",
  },
];

export function EshopBenefits() {
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
            E-shop na mieru,{" "}
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
              href="https://slickly.sk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zjav hover:underline underline-offset-4 inline-flex items-center gap-1"
            >
              slickly.sk
              <ExternalLink className="w-3 h-3" />
            </a>{" "}
            — e-shop postavený presne na tomto stacku.
          </p>
        </div>
      </div>
    </section>
  );
}

export function EshopPricing() {
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
            Koľko stojí{" "}
            <span className="text-muted-foreground">e-shop na Shopware 6.</span>
            <span className="cursor-blink ml-2">_</span>
          </h2>
        </div>

        <div
          className={`bg-background border border-foreground/10 p-8 lg:p-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-start">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 flex items-center justify-center border border-foreground/10">
                  <ShoppingCart className="w-5 h-5 text-zjav" />
                </div>
                <div>
                  <h3 className="font-display text-2xl uppercase tracking-tight">{eshop.name}</h3>
                  <p className="text-muted-foreground">{eshop.promise}</p>
                </div>
              </div>

              <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                {eshop.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-sm leading-relaxed">
                    <Check className="w-4 h-4 text-signal shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:text-right lg:min-w-[220px]">
              <div className="flex lg:justify-end items-baseline gap-2 mb-1">
                <span className="text-sm font-mono uppercase tracking-wide text-muted-foreground">od</span>
                <span className="font-display text-5xl leading-none">{eshop.price}</span>
                <span className="font-display text-2xl text-muted-foreground">€</span>
              </div>
              <p className="text-sm font-mono uppercase tracking-wide text-muted-foreground mb-6">
                Migrácia dát dohodou
              </p>
              <Button
                variant="outline"
                onClick={() => openModal({ type: "package", packageName: eshop.name })}
                className="w-full lg:w-auto h-12 px-6 rounded-lg bg-transparent border-foreground/20 hover:border-zjav hover:bg-transparent hover:text-zjav font-medium group"
              >
                Chcem e-shop
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>

        <p className="mt-8 text-sm text-muted-foreground leading-relaxed max-w-3xl">
          Cena je konečná (nie som platca DPH) a predstavuje štartovaciu hodnotu. Presnú kalkuláciu potvrdíme po
          prototype, keď poznáme rozsah produktového katalógu a prípadnú migráciu dát.{" "}
          <Link href="/cennik" className="text-zjav hover:underline underline-offset-4">
            Celý cenník aj s ostatnými balíkmi →
          </Link>
        </p>
      </div>
    </section>
  );
}

const steps = [
  {
    number: "I",
    title: "Napíšte mi o vašom sortimente",
    description: "Opíšte, čo predávate a či máte existujúci e-shop alebo dáta na presun. Nezáväzne.",
  },
  {
    number: "II",
    title: "Do 24 h dostanete prototyp",
    description: "Živý náhľad vášho e-shopu na Shopware 6 — zadarmo, bez záväzku.",
  },
  {
    number: "III",
    title: "Spustíme e-shop naostro",
    description: "Doplním produkty, platby a dokončím e-shop na kľúč, nasadený na Verceli.",
  },
];

export function EshopProcess() {
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
            Rovnaký proces.{" "}
            <span className="text-muted-foreground">Nulové riziko.</span>
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
    question: "Prečo Shopware 6 a nie WooCommerce alebo Shopify?",
    answer:
      "Shopware 6 je robustný open-source backend pripravený na rast, s plnou kontrolou nad dátami a možnosťou prepojenia s vlastným frontendom — nie je to uzavretá SaaS platforma s mesačným poplatkom za každú funkciu navyše.",
  },
  {
    question: "Viete previesť produkty z môjho súčasného e-shopu?",
    answer:
      "Áno. Import a export dát z vášho pôvodného systému je súčasťou ponuky, takže prechod na nový e-shop nič nekomplikuje.",
  },
  {
    question: "Podporuje e-shop platby kartou?",
    answer:
      "Áno, cez Stripe — bezpečné online platby priamo v e-shope.",
  },
  {
    question: "Koľko stojí e-shop na Shopware 6?",
    answer: `E-shop na Shopware 6 začína od ${eshop.price} € (nie som platca DPH, cena je konečná). Presnú cenu potvrdíme vopred a transparentne, bez skrytých poplatkov a bez zálohy — podľa rozsahu vášho sortimentu a prípadnej migrácie dát. Najskôr uvidíte prototyp zadarmo.`,
  },
  {
    question: "Ako dlho trvá spustenie e-shopu?",
    answer:
      "Nezáväzný prototyp dostanete do 24 hodín. Finálny termín spustenia sa odvíja od rozsahu produktového katalógu a prípadného importu dát, ktorý s vami preberiem hneď na začiatku.",
  },
  {
    question: "Je e-shop responzívny a rýchly aj na mobile?",
    answer:
      "Áno — responzívny dizajn pre mobil aj desktop a hosting na Verceli sú súčasťou každého e-shopu, ktorý postavím.",
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

export function EshopFaq() {
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
            O e-shope{" "}
            <span className="text-muted-foreground">a Shopware 6.</span>
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
