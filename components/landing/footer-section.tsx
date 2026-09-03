"use client";

import { ArrowUpRight } from "lucide-react";
import { AnimatedWave } from "./animated-wave";
import { useModal } from "./modal-provider";

const footerLinks = {
  "Služby": [
    { name: "Ako to funguje", href: "/#how-it-works" },
    { name: "Čo získate", href: "/#features" },
    { name: "Technológie", href: "/#developers" },
    { name: "Referencie", href: "/#testimonials" },
    { name: "Práce", href: "/#work" },
    { name: "Cenník", href: "/cennik" },
  ],
  "Riešenia": [
    { name: "Firemné weby", href: "/firemne-weby" },
    { name: "E-shopy (Shopware 6)", href: "/e-shop-shopware" },
    { name: "Import / Export dát", href: "/#developers" },
    { name: "Weby na mieru", href: "/firemne-weby" },
  ],
  "Kontakt": [
    { name: "hello@zjav.sk", href: "mailto:hello@zjav.sk" },
    { name: "+421 918 564 238", href: "tel:+421918564238" },
    { name: "Suchá Hora 143", href: "https://www.google.com/maps/search/?api=1&query=Such%C3%A1+Hora+143" },
    { name: "Náhľad zadarmo", href: "/#contact", badge: "24h" },
    { name: "Nezáväzný dopyt", href: "/#contact" },
  ],
};

const socialLinks = [
  { name: "Instagram", href: "https://www.instagram.com/zjav.sk" },
  { name: "Facebook", href: "https://www.facebook.com/profile.php?id=61590535290157" },
  { name: "GitHub", href: "https://github.com/kubbkoz" },
];

export function FooterSection() {
  const { openCookieSettings } = useModal();

  return (
    <footer className="relative border-t border-foreground/10">
      {/* Animated wave background */}
      <div className="absolute inset-0 h-64 opacity-20 pointer-events-none overflow-hidden">
        <AnimatedWave />
      </div>
      
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Main Footer */}
        <div className="py-16 lg:py-24">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-12 lg:gap-8">
            {/* Brand Column */}
            <div className="col-span-2">
              <a href="/" className="inline-flex items-center gap-3 mb-6">
                <span className="text-2xl font-display uppercase tracking-tight">
                  ZJAV<span className="text-zjav text-glow-zjav">_</span>
                </span>
                <span className="text-xs text-muted-foreground font-mono">zjav.sk</span>
              </a>

              <p className="text-muted-foreground leading-relaxed mb-8 max-w-xs">
                Rýchle a spoľahlivé weby na mieru. Prototyp zadarmo do 24 hodín, hotový web do 7 dní. Zviditeľním vaše podnikanie.
              </p>

              {/* Social Links */}
              <div className="flex gap-6">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                ))}
              </div>
            </div>

            {/* Link Columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="text-sm font-medium mb-6">{title}</h3>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
                      >
                        {link.name}
                        {"badge" in link && link.badge && (
                          <span className="text-xs px-2 py-0.5 bg-zjav text-background rounded font-mono">
                            {link.badge}
                          </span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 ZJAV_ · zjav.sk · IČO: 50532596 · Všetky práva vyhradené.
          </p>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <button
              onClick={openCookieSettings}
              className="hover:text-foreground transition-colors font-mono text-xs"
            >
              Nastavenia cookies
            </button>
            <span className="flex items-center gap-2 font-mono">
              <span className="w-2 h-2 rounded-full bg-signal animate-pulse" />
              Prijímam nové projekty
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
