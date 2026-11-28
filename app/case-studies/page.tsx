import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { Archivo } from "next/font/google";
import { caseStudies } from "@/lib/case-studies";
import styles from "./case-studies.module.css";

// Standalone page: no zjav.sk navigation, footer or design tokens.

const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "600", "800"],
  variable: "--font-archivo",
  display: "swap",
});

const siteUrl = "https://zjav.sk";
const pageUrl = `${siteUrl}/case-studies`;
const instagramUrl = "https://www.instagram.com/zjavka.jakub/";
const title = "Case studies by zjav studio";
const description =
  "Značky a weby od zadania po ostrý web. Case studies projektov BUILDTECH, Avora Tatry, FINRO, SUSTCO, LYV a Well Space — s odklikom na živý web.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: pageUrl },
  openGraph: {
    type: "website",
    url: pageUrl,
    title,
    description,
    images: caseStudies.map((cs) => ({ url: cs.cover, width: 2000, height: 1250, alt: cs.name })),
  },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport = { themeColor: "#000000" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  url: pageUrl,
  name: title,
  description,
  inLanguage: "sk-SK",
  author: { "@type": "Person", name: "Jakub Zjavka", sameAs: [instagramUrl] },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: caseStudies.map((cs, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CreativeWork",
        name: `${cs.name} — case study`,
        headline: cs.headline,
        description: cs.description,
        url: cs.caseStudyUrl,
        image: `${siteUrl}${cs.cover}`,
        about: cs.liveUrl,
      },
    })),
  },
};

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 12 12 4M5.5 4H12v6.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const pad = (n: number) => String(n).padStart(2, "0");

export default function CaseStudiesPage() {
  const total = pad(caseStudies.length);

  return (
    <div className={`${styles.page} ${archivo.variable}`}>
      {/* The root layout paints the zjav.sk background; this page is black edge to edge. */}
      <style>{`html,body{background:#000}`}</style>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className={styles.wrap}>
        <header className={styles.top}>
          <span className={styles.brand}>
            <span className={styles.brandMark} aria-hidden="true" />
            zjav studio
          </span>
          <span className={styles.count} aria-hidden="true">
            {total} / {total}
          </span>
        </header>

        <p className={`${styles.sign} ${styles.rise}`}>
          <b>{total}</b>
          <span>Case studies</span>
        </p>

        <h1 className={`${styles.title} ${styles.rise}`} style={{ "--d": "0.08s" } as CSSProperties}>
          Značky a weby
          <strong>v case studies.</strong>
        </h1>

        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener"
          className={`${styles.profile} ${styles.rise}`}
          style={{ "--d": "0.16s" } as CSSProperties}
          aria-label="Instagram profil @zjavka.jakub"
        >
          <span className={styles.avatar}>
            <Image src="/case-studies/profile.jpg" alt="Jakub Zjavka" width={336} height={336} priority />
          </span>
          <span className={styles.profileText}>
            <span className={styles.handle}>@zjavka.jakub</span>
            <span className={styles.byline}>Case studies by zjav studio</span>
          </span>
          <span className={styles.follow}>
            Instagram
            <span className={styles.arrow}>
              <Arrow />
            </span>
          </span>
        </a>

        <ul className={styles.list}>
          {caseStudies.map((cs, i) => (
            <li key={cs.slug} className={styles.rise} style={{ "--d": `${0.24 + i * 0.08}s` } as CSSProperties}>
              <article className={styles.card}>
                <a
                  href={cs.caseStudyUrl}
                  target="_blank"
                  rel="noopener"
                  className={styles.cover}
                  aria-label={`Čítať case study ${cs.name}`}
                >
                  <Image
                    src={cs.cover}
                    alt={`Úvodná obrazovka webu ${cs.name}`}
                    fill
                    priority={i === 0}
                    sizes="(min-width: 860px) 560px, 100vw"
                  />
                </a>

                <div className={styles.body}>
                  <p className={styles.meta}>
                    <span className={styles.dot} style={{ background: cs.accent }} aria-hidden="true" />
                    {cs.tag}
                    <span className={styles.metaIndex}>
                      {pad(i + 1)} / {total}
                    </span>
                  </p>
                  <h2 className={styles.name}>{cs.name}</h2>
                  <p className={styles.headline}>{cs.headline}</p>
                  <p className={styles.desc}>{cs.description}</p>

                  <ul className={styles.scope} aria-label="Rozsah práce">
                    {cs.scope.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>

                  <div className={styles.actions}>
                    <a href={cs.liveUrl} target="_blank" rel="noopener" className={`${styles.pill} ${styles.pillPrimary}`}>
                      <span className={styles.pillLabel}>
                        <b>Živý web</b>
                        <span>{cs.domain}</span>
                      </span>
                      <span className={styles.arrow}>
                        <Arrow />
                      </span>
                    </a>
                    <a href={cs.caseStudyUrl} target="_blank" rel="noopener" className={`${styles.pill} ${styles.pillGhost}`}>
                      <span className={styles.pillLabel}>Celá case study</span>
                      <span className={styles.arrow}>
                        <Arrow />
                      </span>
                    </a>
                    <a href={cs.manualUrl} target="_blank" rel="noopener" className={styles.manual}>
                      Brand manuál
                    </a>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <div className={styles.trail} aria-hidden="true">
          {Array.from({ length: 8 }, (_, i) => (
            <i key={i} />
          ))}
        </div>
        <footer className={styles.foot}>
          <span>© 2026 zjav studio</span>
          <a href={instagramUrl} target="_blank" rel="noopener">
            Instagram · @zjavka.jakub
          </a>
        </footer>
      </main>
    </div>
  );
}
