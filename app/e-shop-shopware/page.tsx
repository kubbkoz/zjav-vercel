import type { Metadata } from "next";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { CtaSection } from "@/components/landing/cta-section";
import {
  EshopHero,
  EshopBenefits,
  EshopPricing,
  EshopProcess,
  EshopFaq,
} from "@/components/landing/eshop-page";
import { eshopPricing } from "@/lib/pricing";

const siteUrl = "https://zjav.sk";
const pageUrl = `${siteUrl}/e-shop-shopware`;
const title = `E-shop na Shopware 6 od ${eshopPricing.price} € — tvorba e-shopu na mieru`;
const description = `Tvorba e-shopu na Shopware 6 od ${eshopPricing.price} € s importom produktov, platbami cez Stripe a hostingom na Verceli. Nezáväzný prototyp e-shopu zadarmo do 24 hodín.`;

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
        { "@type": "ListItem", position: 2, name: "E-shop Shopware 6", item: pageUrl },
      ],
    },
    {
      "@type": "Service",
      name: "Tvorba e-shopu na Shopware 6",
      serviceType: "E-commerce web development",
      description,
      url: pageUrl,
      provider: { "@id": `${siteUrl}/#organization` },
      areaServed: { "@type": "Country", name: "Slovensko" },
      offers: {
        "@type": "Offer",
        name: eshopPricing.name.replace("_", ""),
        price: eshopPricing.price,
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
      },
    },
  ],
};

export default function EshopShopwarePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />
      <EshopHero />
      <EshopBenefits />
      <EshopPricing />
      <EshopProcess />
      <EshopFaq />
      <CtaSection />
      <FooterSection />
    </main>
  );
}
