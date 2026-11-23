// Case studies listed on /case-studies. Each one lives on the project's own
// subdomain (single source of truth) — this list only links out to it.
// The page is standalone: it does not use the zjav.sk navigation or design.
// To add a case study: append an entry and drop a 16:10 cover into
// public/case-studies/.

export type CaseStudy = {
  slug: string;
  name: string;
  domain: string;
  liveUrl: string;
  caseStudyUrl: string;
  manualUrl: string;
  tag: string;
  year: string;
  headline: string;
  description: string;
  scope: string[];
  cover: string;
  /** Brand accent of the project, shown as a small marker on its card. */
  accent: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "buildtech",
    name: "BUILDTECH",
    domain: "buildtech.zjav.sk",
    liveUrl: "https://buildtech.zjav.sk/",
    caseStudyUrl: "https://buildtech.zjav.sk/case-study/",
    manualUrl: "https://buildtech.zjav.sk/case-study/manual",
    tag: "Generálny dodávateľ stavieb",
    year: "2026",
    headline: "Zo šablóny značka s postojom.",
    description:
      "Weby stavebných firiem sa podobajú: čierna, červená, prilba a slogan o kvalite. BUILDTECH namiesto toho sľubuje čísla — pevnú cenu v zmluve, termín s penále a online denník stavby. Stratégia, identita, dvojjazyčné texty a motion web postavený na jedinom motíve: Red Cut.",
    scope: ["Brand analýza", "Logo a identita", "Brand manuál", "UX copy SK/EN", "Motion web"],
    cover: "/case-studies/buildtech.jpg",
    accent: "#E3121B",
  },
  {
    slug: "avora",
    name: "Avora Tatry",
    domain: "avora.zjav.sk",
    liveUrl: "https://avora.zjav.sk/",
    caseStudyUrl: "https://avora.zjav.sk/case-study/",
    manualUrl: "https://avora.zjav.sk/case-study/manual/",
    tag: "Horské túry s vodcom",
    year: "2026",
    headline: "Cena, pravidlá a vodca skôr než prvý krok.",
    description:
      "Turistu pred tatranským štítom nestraší výška, ale neistota: zvládnem to, smiem tam ísť, koľko to stojí? Značka a web Avora odpovedajú na všetky tri otázky ešte pred tlačidlom Rezervovať — cena za skupinu, pravidlá TANAP a čo je a nie je v cene.",
    scope: ["Výskum a insighty", "Symbol a identita", "Brand manuál", "Cenník 2027", "Web"],
    cover: "/case-studies/avora.jpg",
    accent: "#F1FC86",
  },
  {
    slug: "finro",
    name: "FINRO",
    domain: "finro.sk",
    liveUrl: "https://finro.sk/",
    caseStudyUrl: "https://finro.sk/case-study/",
    manualUrl: "https://finro.sk/case-study/manual/",
    tag: "Aplikácia na financie domácnosti",
    year: "2026",
    headline: "Z bločkov, výpisov a dohadovania jedno číslo.",
    description:
      "Peniaze domácnosti ležia na troch miestach: bloček v peňaženke, výpis v banke, zvyšok v hlave. FINRO ich dá do jedného prehľadu pre celú rodinu. Case study ukazuje landing aj appku: F z troch tyčí, štyri farby v pomere 60 · 28 · 10 · 2, výdavky bez červenej a AI agenta Kompass ako jediný fialový prvok.",
    scope: ["Insighty", "Symbol a identita", "Brand manuál", "Landing", "Appka SK/EN"],
    cover: "/case-studies/finro.jpg",
    accent: "#10B981",
  },
];
