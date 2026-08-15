import type { Metadata } from "next";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { CtaSection } from "@/components/landing/cta-section";
import {
  FiremneWebyHero,
  FiremneWebyBenefits,
  FiremneWebyPricing,
  FiremneWebyProcess,
  FiremneWebyFaq,
} from "@/components/landing/firemne-weby-page";
import { packagePricing } from "@/lib/pricing";

const siteUrl = "https://zjav.sk";
const pageUrl = `${siteUrl}/firemne-weby`;
const startingPrice = packagePricing[0].price;
const title = `Firemné weby na mieru od ${startingPrice} € — tvorba webstránok pre firmy`;
const description = `Firemný web na mieru od ${startingPrice} € pre vašu firmu alebo živnosť — responzívny dizajn, SSL, SEO základ aj kontaktný formulár. Nezáväzný prototyp zadarmo do 24 hodín, hotový web do 7 dní.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    type: "website",
    url: pageUrl,
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "ZJAV_", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Firemné weby", item: pageUrl },
      ],
    },
    {
      "@type": "Service",
      name: "Tvorba firemných webov na mieru",
      serviceType: "Website development",
      description,
      url: pageUrl,
      provider: { "@id": `${siteUrl}/#organization` },
      areaServed: { "@type": "Country", name: "Slovensko" },
      offers: packagePricing.map((pkg) => ({
        "@type": "Offer",
        name: pkg.name.replace("_", ""),
        price: pkg.price,
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
      })),
    },
  ],
};

export default function FiremneWebyPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />
      <FiremneWebyHero />
      <FiremneWebyBenefits />
      <FiremneWebyPricing />
      <FiremneWebyProcess />
      <FiremneWebyFaq />
      <CtaSection />
      <FooterSection />
    </main>
  );
}
