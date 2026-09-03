import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Check } from "lucide-react";
import { Navigation } from "@/components/landing/navigation";
import { CtaSection } from "@/components/landing/cta-section";
import { FooterSection } from "@/components/landing/footer-section";
import { getProjectBySlug, projects } from "@/lib/projects";

const siteUrl = "https://zjav.sk";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  const pageUrl = `${siteUrl}/prace/${project.slug}`;
  const title = `${project.name} — case study | ZJAV_`;
  const description = `${project.tagline} ${project.description}`;

  return {
    title,
    description,
    alternates: { canonical: pageUrl },
    openGraph: { type: "article", url: pageUrl, title, description },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const pageUrl = `${siteUrl}/prace/${project.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "ZJAV_", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Práce", item: `${siteUrl}/#work` },
          { "@type": "ListItem", position: 3, name: project.name, item: pageUrl },
        ],
      },
      {
        "@type": "CreativeWork",
        name: project.name,
        description: project.description,
        url: pageUrl,
        about: project.url,
        creator: { "@id": `${siteUrl}/#organization` },
      },
    ],
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />

      <section className="relative pt-40 pb-16 lg:pt-48 lg:pb-24 border-b border-foreground/10">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-12">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            Späť na práce
          </Link>

          <span className="inline-flex items-center gap-3 text-sm font-mono uppercase tracking-wide text-muted-foreground mb-6">
            <span className="w-8 h-px bg-signal shadow-[0_0_8px_rgba(0,229,160,0.6)]" />
            {project.tag}
          </span>

          <h1 className="text-4xl lg:text-6xl font-display uppercase tracking-tight leading-tight mb-6">
            {project.name}
            <span className="cursor-blink ml-2">_</span>
          </h1>
          <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-8">
            {project.tagline} {project.description}
          </p>

          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-mono text-zjav hover:underline underline-offset-4"
          >
            {project.domain}
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* Media — animated scroll-through if supplied, else screenshot, else placeholder */}
      <section className="relative py-16 lg:py-24">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-12">
          <div className="border border-foreground/10 bg-background overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-foreground/10 bg-foreground/[0.02]">
              <div className="flex gap-1.5 shrink-0">
                <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-zjav/40" />
              </div>
              <span className="ml-2 text-xs font-mono text-muted-foreground truncate">{project.domain}</span>
            </div>

            <div className="relative aspect-[16/10] lg:aspect-[16/9] bg-secondary">
              {project.scrollVideo ? (
                <video
                  src={project.scrollVideo}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
              ) : project.screenshot ? (
                <Image
                  src={project.screenshot}
                  alt={`Screenshot webu ${project.name}`}
                  fill
                  className="object-cover object-top"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center px-6">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/40">
                    Video ukážka čoskoro
                  </span>
                  <span className="font-display text-2xl uppercase text-muted-foreground/30">{project.name}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Zadanie / Riešenie */}
      <section className="relative py-16 lg:py-24 border-t border-foreground/10">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <span className="block font-mono text-zjav text-sm uppercase tracking-widest mb-4">Zadanie</span>
            <p className="text-lg text-muted-foreground leading-relaxed">{project.caseStudy.challenge}</p>
          </div>
          <div>
            <span className="block font-mono text-zjav text-sm uppercase tracking-widest mb-4">Riešenie</span>
            <p className="text-lg text-muted-foreground leading-relaxed">{project.caseStudy.solution}</p>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="relative py-16 lg:py-24 border-t border-foreground/10">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-12">
          <span className="block font-mono text-zjav text-sm uppercase tracking-widest mb-8">Kľúčové prvky</span>
          <div className="grid sm:grid-cols-2 gap-6">
            {project.caseStudy.highlights.map((highlight) => (
              <div key={highlight} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-zjav shrink-0 mt-0.5" />
                <span className="text-base text-foreground/80">{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
      <FooterSection />
    </main>
  );
}
