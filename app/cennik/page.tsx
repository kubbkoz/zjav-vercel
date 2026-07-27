import type { Metadata } from "next";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { CtaSection } from "@/components/landing/cta-section";
import {
  CennikHero,
  CennikPrinciples,
  CennikFactors,
  CennikFaq,
} from "@/components/landing/cennik-page";

const siteUrl = "https://zjav.sk";
const pageUrl = `${siteUrl}/cennik`;
const title = "Cenník — koľko stojí tvorba webu a e-shopu";
const description =
  "Ako tvorím cenu webu a e-shopu: transparentne, vopred, bez zálohy a bez skrytých poplatkov. Najskôr uvidíte prototyp zadarmo, potom sa dohodneme na cene.";

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
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "ZJAV_", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Cenník", item: pageUrl },
  ],
};

export default function CennikPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />
      <CennikHero />
      <CennikPrinciples />
      <CennikFactors />
      <CennikFaq />
      <CtaSection />
      <FooterSection />
    </main>
  );
}
