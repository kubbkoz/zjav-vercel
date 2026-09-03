// Single source of truth for WORK section + case study data, kept in a
// plain (non "use client") module so it can be imported by both the
// client-rendered work-section.tsx grid and the case study pages'
// Server Component metadata/JSON-LD.

export type Project = {
  slug: string;
  name: string;
  domain: string;
  url: string;
  tagline: string;
  description: string;
  tag: string;
  screenshot?: string;
  scrollVideo?: string;
  caseStudy: {
    challenge: string;
    solution: string;
    highlights: string[];
  };
};

export const projects: Project[] = [
  {
    slug: "nova-reality",
    name: "NOVA Reality",
    domain: "nova.zjav.sk",
    url: "https://nova.zjav.sk/",
    tagline: "Priestory, ktoré inšpirujú život.",
    description:
      "Web pre realitnú kanceláriu NOVA REALITY — dôveryhodná prezentácia ponuky nehnuteľností s dôrazom na štýl a prémiový dojem.",
    tag: "Realitná kancelária",
    screenshot: "/nova-reality-mock.png",
    caseStudy: {
      challenge:
        "Realitná kancelária potrebovala web, ktorý na prvý pohľad pôsobí dôveryhodne a prémiovo — nie ako ďalšia šablóna s fotkami bytov, ale ako miesto, kde si klient vie predstaviť, že tu chce bývať.",
      solution:
        "Vznikla jednostránková prezentácia postavená okolo veľkých vizuálov nehnuteľností, jasnej štruktúry ponuky a hlavnej myšlienky „Priestory, ktoré inšpirujú život, postavené pre vás.\" Dôraz je na typografiu, priestor a rýchle načítanie — nič nerozptyľuje od samotnej ponuky.",
      highlights: [
        "Prémiová vizuálna prezentácia nehnuteľností",
        "Prehľadná štruktúra ponuky",
        "Responzívny dizajn pre mobil aj desktop",
        "Kontaktný formulár priamo na stránke",
      ],
    },
  },
  {
    slug: "pravnik-robert-novak",
    name: "Robert Novák",
    domain: "pravnik-landing.vercel.app",
    url: "https://pravnik-landing.vercel.app/",
    tagline: "Váš partner pre právne riešenia.",
    description:
      "Jednostránková prezentácia advokáta Roberta Nováka — profesionálne právne poradenstvo pre fyzické aj právnické osoby, jasný kontakt a prehľadná ponuka služieb.",
    tag: "Právne služby",
    caseStudy: {
      challenge:
        "Advokát potreboval jednoduchú, no profesionálnu prezentačnú stránku, ktorá hneď na úvod buduje dôveru a jasne ukazuje, s čím vie klientom pomôcť.",
      solution:
        "Vznikol jednostránkový web s prehľadnou ponukou právnych služieb pre fyzické aj právnické osoby a kontaktom, ktorý je vidieť už na prvý scroll — bez zbytočných krokov navyše.",
      highlights: [
        "Jasná ponuka právnych služieb",
        "Dôveryhodný, striedmy dizajn",
        "Kontakt na dosah na každej obrazovke",
        "Rýchly, jednostránkový web",
      ],
    },
  },
  {
    slug: "kimo",
    name: "Kimo",
    domain: "kimo-web-one.vercel.app",
    url: "https://kimo-web-one.vercel.app/",
    tagline: "Jednoduchá výživa, silnejší výkon.",
    description:
      "Web pre značku výživových doplnkov KIMO — čistá, vedecky podložená výživa pre ľudí, ktorí stavajú na disciplíne a dlhodobom výkone.",
    tag: "Doplnky výživy",
    caseStudy: {
      challenge:
        "Značka výživových doplnkov KIMO potrebovala web, kde je hlavnou hviezdou produkt — nie grafické efekty okolo neho.",
      solution:
        "Web je postavený okolo hesla „Jednoduchá výživa, silnejší výkon\" s čistým dizajnom, kde produktová fotografia a jasný popis benefitov dostávajú priestor, ktorý si zaslúžia.",
      highlights: [
        "Dôraz na produktovú fotografiu",
        "Čistý, minimalistický dizajn",
        "Prehľadná prezentácia ponuky",
        "Responzívne zobrazenie na všetkých zariadeniach",
      ],
    },
  },
  {
    slug: "kava-a-laska",
    name: "Káva & Láska",
    domain: "kava-laska.zjav.sk",
    url: "https://kava-laska.zjav.sk/",
    tagline: "Výberová káva v Žiline.",
    description:
      "Web pre kaviareň a predajňu kávy v Žiline — menu, atmosféra a miesto, kde si zákazník výberovú kávu kúpi aj vypije.",
    tag: "Kaviareň",
    caseStudy: {
      challenge:
        "Kaviareň a predajňa výberovej kávy v Žiline potrebovala web, ktorý spája dve úlohy — ukázať menu a atmosféru podniku a zároveň fungovať ako miesto, kde si zákazník kávu aj kúpi.",
      solution:
        "Vznikol web s prehľadným menu, fotografiami prevádzky a jasnou cestou k nákupu — návštevník sa rýchlo dozvie, čo si môže vychutnať na mieste aj čo si odniesť domov.",
      highlights: [
        "Prehľadné menu a ponuka kávy",
        "Prezentácia atmosféry prevádzky v Žiline",
        "Prepojenie kaviarne a predaja kávy",
        "Jednoduchá orientácia na mobile",
      ],
    },
  },
  {
    slug: "11x-digitalni-pracovnici",
    name: "11x",
    domain: "11x-digitalni-pracovnici.vercel.app",
    url: "https://11x-digitalni-pracovnici.vercel.app/",
    tagline: "Digitálni pracovníci pre firmy.",
    description:
      "AI SDR platforma s digitálnymi pracovníkmi (Alice, Julian, Mike, Nova), ktorí nonstop nájdu kupujúcich, oslovia ich a odovzdajú firme pripravené stretnutia.",
    tag: "AI / Digital workers",
    caseStudy: {
      challenge:
        "11x potrebovali web, ktorý zrozumiteľne vysvetlí koncept „digitálnych pracovníkov\" — AI agentov, ktorí za firmu nonstop oslovujú potenciálnych klientov.",
      solution:
        "Vznikla prezentácia platformy s pomenovanými digitálnymi pracovníkmi (Alice, Julian, Mike, Nova), ktorá krok po kroku vysvetľuje, ako AI SDR platforma firmám nachádza a oslovuje kupujúcich.",
      highlights: [
        "Zrozumiteľné vysvetlenie AI SDR konceptu",
        "Pomenovaní digitálni pracovníci ako hlavná os stránky",
        "Prehľadná štruktúra „ako to funguje\"",
        "Moderný, technologický dizajn",
      ],
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
