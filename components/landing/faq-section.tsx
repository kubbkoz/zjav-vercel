"use client";

import { useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Koľko stojí tvorba webu?",
    answer:
      "Cenu vždy dohodneme vopred a transparentne — bez skrytých poplatkov a bez zálohy. Najskôr dostanete prototyp úplne zadarmo, takže presne viete, za čo platíte, ešte predtým, než sa rozhodnete.",
  },
  {
    question: "Ako dlho trvá, kým bude môj web hotový?",
    answer:
      "Nezáväzný prototyp dostanete do 24 hodín od prvého kontaktu. Ak sa vám páči a chcete pokračovať, hotový web na kľúč nasadím online do 7 dní.",
  },
  {
    question: "Musím platiť zálohu vopred?",
    answer:
      "Nie. Najprv uvidíte živý prototyp svojho webu zadarmo a bez záväzku — platíte až vtedy, keď sa sami rozhodnete ísť do toho ďalej.",
  },
  {
    question: "Čo presne je súčasťou každého webu?",
    answer:
      "Responzívny dizajn pre mobil aj desktop, SSL certifikát, základ pre SEO, kontaktný formulár s dopytmi priamo do e-mailu a import/export vašich existujúcich dát — to všetko je v cene.",
  },
  {
    question: "Viete postaviť aj e-shop?",
    answer:
      "Áno. Pre e-shopy používam Shopware 6 ako voliteľný backend pripravený na rast — od produktového katalógu až po platby.",
  },
  {
    question: "Aké technológie používate?",
    answer:
      "Frontend stavia na Next.js, Nuxt a React s TypeScriptom a Tailwind CSS, e-shopy bežia na Shopware 6 a všetko nasadzujem na Vercel pre rýchle a spoľahlivé načítanie.",
  },
  {
    question: "Čo ak už mám produkty alebo dáta v inom systéme?",
    answer:
      "Prenesiem ich za vás — import a export dát bez straty a chaosu je súčasťou ponuky, takže prechod na nový web nič nekomplikuje.",
  },
  {
    question: "Je môj web zabezpečený a v súlade s GDPR?",
    answer:
      "Áno. Každý web má HTTPS a moderné zabezpečenie už v základe a je postavený v súlade s pravidlami ochrany osobných údajov platnými na Slovensku a v EÚ.",
  },
  {
    question: "Ako prebieha spolupráca od začiatku do konca?",
    answer:
      "Napíšete mi pár viet o svojom podnikaní, do 24 hodín dostanete živý prototyp zadarmo, a ak sa vám páči, do 7 dní web dokončím a spustím naostro.",
  },
  {
    question: "Ako vás môžem kontaktovať?",
    answer:
      'Najrýchlejšie cez formulár nižšie ("Nezáväzný dopyt") alebo priamo na ahoj@zjav.sk — odpoviem vám s návrhom ďalšieho postupu.',
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

export function FaqSection() {
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
    <section
      id="faq"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-foreground/[0.02] overflow-hidden"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
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
            Máte otázky?{" "}
            <span className="text-muted-foreground">Máme odpovede.</span>
            <span className="cursor-blink ml-2">_</span>
          </h2>
        </div>

        {/* Accordion */}
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
