"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  Zap,
  TrendingUp,
  Activity,
  ShoppingCart,
  Server,
  LifeBuoy,
  Gauge,
  Database,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useModal } from "./modal-provider";
import { packagePricing, eshopPricing, carePricing } from "@/lib/pricing";

/* ------------------------------------------------------------------ */
/*  DÁTA — BALÍKY                                                      */
/* ------------------------------------------------------------------ */

export type Package = {
  id: string;
  name: string;
  promise: string;
  price: number;
  scope: string;
  icon: typeof Zap;
  features: string[];
  highlight?: boolean;
  badge?: string;
};

export const packages: Package[] = [
  {
    id: "start",
    name: "ŠTART_",
    promise: "Aby vás našli.",
    price: packagePricing[0].price,
    scope: "One page web",
    icon: Zap,
    features: [
      "Jednostránkový web na mieru",
      "Základná SEO optimalizácia",
      "Živé napojenie na Instagram feed",
      "Cookie lišta, ktorá reálne blokuje skripty",
      "Lighthouse Performance 95+ na mobile",
    ],
  },
  {
    id: "predaj",
    name: "PREDAJ_",
    promise: "Aby vám web predával.",
    price: packagePricing[1].price,
    scope: "Do 5 podstránok",
    icon: TrendingUp,
    highlight: true,
    badge: "Zlatá stredná cesta",
    features: [
      "Web do 5 podstránok na mieru",
      "Pokročilá SEO optimalizácia + sitemap",
      "Optimalizácia pre AI vyhľadávače (GEO)",
      "Živý Instagram feed + Google recenzie",
      "Integrácia administrácie obsahu",
      "Cookie lišta, ktorá reálne blokuje skripty",
      "Lighthouse Performance 95+ na mobile",
    ],
  },
  {
    id: "vykon",
    name: "VÝKON_",
    promise: "Aby ste vedeli, čo funguje.",
    price: packagePricing[2].price,
    scope: "Do 7 podstránok",
    icon: Activity,
    features: [
      "Všetko z balíka PREDAJ_",
      "Web do 7 podstránok na mieru",
      "Inštalácia a nastavenie Facebook Pixelu",
      "Konverzné akcie na mieru vášmu podnikaniu",
      "Integrácia Google Tag Manager",
    ],
  },
];

export const eshop = {
  name: eshopPricing.name,
  promise: "Shopware 6 na mieru.",
  price: eshopPricing.price,
  features: [
    "Kompletný e-shop na Shopware 6",
    "Platobná brána a doprava nastavené na mieru",
    "Produktové varianty, filtre a kategórie",
    "Napojenie na fakturačný systém",
    "Cookie lišta, SEO a meranie konverzií v cene",
  ],
};

/* ------------------------------------------------------------------ */
/*  DÁTA — STAROSTLIVOSŤ                                               */
/* ------------------------------------------------------------------ */

type CarePlan = {
  id: string;
  name: string;
  forWhom: string;
  price: number;
  features: string[];
  highlight?: boolean;
};

const carePlans: CarePlan[] = [
  {
    id: "web",
    name: "STAROSTLIVOSŤ_",
    forWhom: "Pre firemné weby",
    price: carePricing.web,
    highlight: true,
    features: [
      "Hosting na monitorovaných serveroch",
      "Sledovanie dostupnosti 24/7 — o výpadku viem skôr než vy",
      "SSL certifikát a jeho obnova",
      "Denné zálohy s obnovou do 24 hodín",
      "Bezpečnostné aktualizácie",
      "1 hodina úprav obsahu mesačne",
    ],
  },
  {
    id: "eshop",
    name: "STAROSTLIVOSŤ_ E-SHOP",
    forWhom: "Pre e-shopy na Shopware 6",
    price: carePricing.eshop,
    features: [
      "Všetko zo základnej starostlivosti",
      "Bezpečnostné záplaty Shopware 6 do 72 hodín od vydania",
      "Kontrola platobnej brány a objednávkového toku",
      "Mesačný report výkonu a Core Web Vitals",
      "2 hodiny úprav mesačne",
      "Prioritná reakcia — výpadok e-shopu riešim ako prvý",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  DÁTA — V CENE KAŽDÉHO BALÍKA                                       */
/* ------------------------------------------------------------------ */

const included = [
  {
    icon: LifeBuoy,
    title: "Podpora ku každému webu",
    detail:
      "Po odovzdaní vás nenechám samého. Píšete priamo mne, nie do ticketovacieho systému.",
  },
  {
    icon: Gauge,
    title: "Garancia rýchlosti",
    detail:
      "Lighthouse Performance 95+ na mobile pri odovzdaní. Merateľné, nie sľúbené.",
  },
  {
    icon: Database,
    title: "Migrácia dát",
    detail:
      "Prenos obsahu, produktov alebo zákazníkov zo starého systému. Cena podľa objemu.",
  },
  {
    icon: ShieldCheck,
    title: "Kód patrí vám",
    detail:
      "Žiadny lock-in. Dostanete repozitár a môžete odísť kedykoľvek a ku komukoľvek.",
  },
];

/* ------------------------------------------------------------------ */
/*  JSON-LD — aby balíky videli aj AI vyhľadávače (GEO)                */
/* ------------------------------------------------------------------ */

const offerJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Tvorba webových stránok a e-shopov na mieru",
  provider: {
    "@type": "LocalBusiness",
    name: "ZJAV_",
    url: "https://zjav.sk",
    areaServed: [
      { "@type": "AdministrativeArea", name: "Orava" },
      { "@type": "City", name: "Námestovo" },
      { "@type": "City", name: "Tvrdošín" },
      { "@type": "City", name: "Dolný Kubín" },
      { "@type": "Country", name: "Slovensko" },
    ],
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Balíky webov a e-shopov ZJAV_",
    itemListElement: [
      ...packages.map((pkg) => ({
        "@type": "Offer",
        name: pkg.name.replace("_", ""),
        description: `${pkg.scope} — ${pkg.promise}`,
        price: pkg.price,
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
      })),
      {
        "@type": "Offer",
        name: "E-shop Shopware 6",
        description: eshop.promise,
        price: eshop.price,
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
      },
      ...carePlans.map((plan) => ({
        "@type": "Offer",
        name: plan.name.replace("_", ""),
        description: `${plan.forWhom} — hosting, monitoring, zálohy a podpora.`,
        priceCurrency: "EUR",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: plan.price,
          priceCurrency: "EUR",
          billingIncrement: 1,
          unitCode: "MON",
        },
        availability: "https://schema.org/InStock",
      })),
    ],
  },
};

/* ------------------------------------------------------------------ */
/*  KOMPONENT — BALÍKY                                                 */
/* ------------------------------------------------------------------ */

export function CennikPackages() {
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
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 border-t border-foreground/10"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerJsonLd) }}
      />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* --- Hlavička sekcie --- */}
        <div className="mb-16 lg:mb-20 max-w-3xl">
          <span className="inline-flex items-center gap-3 text-sm font-mono uppercase tracking-wide text-muted-foreground mb-6">
            <span className="w-8 h-px bg-signal shadow-[0_0_8px_rgba(0,229,160,0.6)]" />
            Balíky a ceny
          </span>
          <span className="block font-mono text-zjav text-2xl mb-1">_</span>
          <h2 className="text-4xl lg:text-6xl font-display uppercase tracking-tight leading-tight">
            Viete, čo platíte.{" "}
            <span className="text-muted-foreground">
              Ešte pred prvým mailom.
            </span>
            <span className="cursor-blink ml-2">_</span>
          </h2>
          <p className="mt-8 text-lg text-muted-foreground leading-relaxed">
            Ceny sú štartovacie — konečnú potvrdíme až po prototype, keď presne
            viete, čo dostanete. Zálohu neplatíte v žiadnom z balíkov.
          </p>
        </div>

        {/* --- Tri balíky --- */}
        <div className="grid lg:grid-cols-3 gap-px bg-foreground/10">
          {packages.map((pkg, index) => (
            <div
              key={pkg.id}
              className={`relative flex flex-col p-8 lg:p-10 transition-all duration-700 ${
                pkg.highlight
                  ? "bg-zjav/[0.04] ring-1 ring-inset ring-zjav/30"
                  : "bg-background"
              } ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              {pkg.badge && (
                <span className="absolute -top-px left-8 lg:left-10 inline-flex items-center gap-2 bg-zjav px-3 py-1 text-xs font-mono uppercase tracking-wide text-background">
                  <span className="w-1.5 h-1.5 rounded-full bg-background animate-pulse" />
                  {pkg.badge}
                </span>
              )}

              <div className="w-10 h-10 flex items-center justify-center border border-foreground/10 mb-6 mt-2">
                <pkg.icon className="w-5 h-5 text-zjav" />
              </div>

              <h3 className="font-display text-2xl uppercase tracking-tight">
                {pkg.name}
              </h3>
              <p className="text-muted-foreground mt-1 mb-6">{pkg.promise}</p>

              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-sm font-mono uppercase tracking-wide text-muted-foreground">
                  od
                </span>
                <span
                  className={`font-display text-5xl leading-none ${
                    pkg.highlight ? "text-zjav text-glow-zjav" : ""
                  }`}
                >
                  {pkg.price}
                </span>
                <span className="font-display text-2xl text-muted-foreground">
                  €
                </span>
              </div>
              <p className="text-sm font-mono uppercase tracking-wide text-muted-foreground mb-8">
                {pkg.scope}
              </p>

              <ul className="space-y-3 mb-10 flex-1">
                {pkg.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex gap-3 text-sm leading-relaxed"
                  >
                    <Check
                      className="w-4 h-4 text-signal shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
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

        {/* --- E-shop --- */}
        <div
          className={`mt-12 lg:mt-16 bg-secondary border border-foreground/10 p-8 lg:p-12 transition-all duration-700 delay-500 ${
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
                  <h3 className="font-display text-2xl uppercase tracking-tight">
                    {eshop.name}
                  </h3>
                  <p className="text-muted-foreground">{eshop.promise}</p>
                </div>
              </div>

              <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                {eshop.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex gap-3 text-sm leading-relaxed"
                  >
                    <Check
                      className="w-4 h-4 text-signal shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:text-right lg:min-w-[220px]">
              <div className="flex lg:justify-end items-baseline gap-2 mb-1">
                <span className="text-sm font-mono uppercase tracking-wide text-muted-foreground">
                  od
                </span>
                <span className="font-display text-5xl leading-none">
                  {eshop.price}
                </span>
                <span className="font-display text-2xl text-muted-foreground">
                  €
                </span>
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

        {/* --- V cene každého balíka --- */}
        <div className="mt-20 lg:mt-28">
          <span className="inline-flex items-center gap-3 text-sm font-mono uppercase tracking-wide text-muted-foreground mb-10">
            <span className="w-8 h-px bg-signal shadow-[0_0_8px_rgba(0,229,160,0.6)]" />
            Platí pre každý balík
          </span>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-0">
            {included.map((item, index) => (
              <div
                key={item.title}
                className={`flex gap-5 py-6 border-b border-foreground/10 transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${600 + index * 100}ms` }}
              >
                <div className="w-10 h-10 shrink-0 flex items-center justify-center border border-foreground/10">
                  <item.icon className="w-5 h-5 text-zjav" />
                </div>
                <div>
                  <div className="font-display text-lg mb-1">{item.title}</div>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-10 text-sm text-muted-foreground leading-relaxed max-w-3xl">
            Ceny sú uvedené bez DPH a predstavujú štartovaciu hodnotu balíka.
            Garancia rýchlosti sa vzťahuje na Lighthouse Performance skóre
            merané na mobile v deň odovzdania, na obsahu a doméne dodanej
            v rámci projektu. Doplnkové skripty tretích strán pridané po
            odovzdaní (chat, externé widgety, ďalšie merania) môžu skóre
            ovplyvniť.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  KOMPONENT — STAROSTLIVOSŤ                                          */
/* ------------------------------------------------------------------ */

export function CennikCare() {
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
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-secondary border-y border-border"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-16 lg:mb-20 max-w-3xl">
          <span className="inline-flex items-center gap-3 text-sm font-mono uppercase tracking-wide text-muted-foreground mb-6">
            <span className="w-8 h-px bg-signal shadow-[0_0_8px_rgba(0,229,160,0.6)]" />
            Po spustení
          </span>
          <span className="block font-mono text-zjav text-2xl mb-1">_</span>
          <h2 className="text-4xl lg:text-6xl font-display uppercase tracking-tight leading-tight">
            Web nie je nábytok.{" "}
            <span className="text-muted-foreground">Treba sa oň starať.</span>
            <span className="cursor-blink ml-2">_</span>
          </h2>
          <p className="mt-8 text-lg text-muted-foreground leading-relaxed">
            Väčšina webov na Slovensku nezomrie preto, že sú zle postavené.
            Zomrú preto, že sa o ne po odovzdaní nikto nestará — vyprší
            certifikát, spadne hosting, zastará platobná brána.{" "}
            <span className="text-foreground">
              Prvé 3 mesiace máte starostlivosť v cene webu.
            </span>{" "}
            Potom pokračuje, kým ju nezrušíte.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-px bg-foreground/10">
          {carePlans.map((plan, index) => (
            <div
              key={plan.id}
              className={`relative flex flex-col p-8 lg:p-10 transition-all duration-700 ${
                plan.highlight
                  ? "bg-zjav/[0.04] ring-1 ring-inset ring-zjav/30"
                  : "bg-background"
              } ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <div className="w-10 h-10 flex items-center justify-center border border-foreground/10 mb-6">
                {plan.id === "eshop" ? (
                  <Server className="w-5 h-5 text-zjav" />
                ) : (
                  <RefreshCw className="w-5 h-5 text-zjav" />
                )}
              </div>

              <h3 className="font-display text-2xl uppercase tracking-tight">
                {plan.name}
              </h3>
              <p className="text-muted-foreground mt-1 mb-6">{plan.forWhom}</p>

              <div className="flex items-baseline gap-2 mb-8">
                <span
                  className={`font-display text-5xl leading-none ${
                    plan.highlight ? "text-zjav text-glow-zjav" : ""
                  }`}
                >
                  {plan.price}
                </span>
                <span className="font-display text-2xl text-muted-foreground">
                  €
                </span>
                <span className="text-sm font-mono uppercase tracking-wide text-muted-foreground">
                  / mesiac
                </span>
              </div>

              <ul className="space-y-3 mb-10 flex-1">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex gap-3 text-sm leading-relaxed"
                  >
                    <Check
                      className="w-4 h-4 text-signal shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant="outline"
                onClick={() => openModal({ type: "package", packageName: plan.name })}
                className={`w-full h-12 rounded-lg font-medium group ${
                  plan.highlight
                    ? "bg-zjav hover:bg-zjav-dark text-background glow-zjav border-transparent"
                    : "bg-transparent border-foreground/20 hover:border-zjav hover:bg-transparent hover:text-zjav"
                }`}
              >
                Mám otázku k starostlivosti
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          ))}
        </div>

        <p className="mt-10 text-sm text-muted-foreground leading-relaxed max-w-3xl">
          Starostlivosť je nepovinná a viazaná na mesiac — zrušíte ju kedykoľvek
          k poslednému dňu prebiehajúceho mesiaca, bez výpovednej lehoty a bez
          poplatku. Web ostáva váš aj po zrušení: dostanete repozitár aj dáta a
          môžete ho presunúť kamkoľvek. Ceny sú bez DPH.
        </p>
      </div>
    </section>
  );
}
