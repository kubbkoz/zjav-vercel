"use client";

import { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import { X, ChevronDown, ChevronUp, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

const COOKIE_KEY = "zjav_cookie_consent";
const COOKIE_EXPIRY = 365;

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const defaultPreferences: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
};

export const CONSENT_CHANGE_EVENT = "zjav:consent-change";

// Shared consent read so every consent-gated integration (Pixel script,
// server-side Lead events, ...) agrees on the same source of truth.
export function hasMarketingConsent(): boolean {
  if (typeof window === "undefined") return false;
  const raw = Cookies.get(COOKIE_KEY);
  if (!raw) return false;
  try {
    return !!(JSON.parse(raw) as CookiePreferences).marketing;
  } catch {
    return false;
  }
}

// Lets consent-gated scripts (e.g. the Facebook Pixel) react immediately
// when the visitor changes their preferences, without a page reload.
function notifyConsentChange(prefs: CookiePreferences) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent<CookiePreferences>(CONSENT_CHANGE_EVENT, { detail: prefs })
    );
  }
}

const categories = [
  {
    key: "necessary" as const,
    label: "Nevyhnutné",
    description: "Tieto cookies sú potrebné pre základnú funkčnosť webu (session, bezpečnosť, formuláre). Nemožno ich vypnúť.",
    required: true,
  },
  {
    key: "analytics" as const,
    label: "Analytické",
    description: "Pomáhajú nám pochopiť, ako návštevníci používajú web (Vercel Analytics, Speed Insights). Žiadne osobné údaje.",
    required: false,
  },
  {
    key: "marketing" as const,
    label: "Marketingové",
    description: "Používajú sa na cielené reklamy a sledovanie konverzií na externých platformách.",
    required: false,
  },
];

function Toggle({ checked, onChange, disabled }: { checked: boolean; onChange: (v: boolean) => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zjav
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${checked ? "bg-zjav border-zjav" : "bg-foreground/10 border-foreground/20"}`}
    >
      <span
        className={`pointer-events-none inline-block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform duration-200 mt-0.5
          ${checked ? "translate-x-5" : "translate-x-0.5"}`}
      />
    </button>
  );
}

interface CookieConsentProps {
  onOpenSettings?: () => void;
}

export function CookieBanner({ onOpenSettings }: CookieConsentProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = Cookies.get(COOKIE_KEY);
    if (!saved) setVisible(true);
  }, []);

  const acceptAll = () => {
    const all = { necessary: true, analytics: true, marketing: true };
    Cookies.set(COOKIE_KEY, JSON.stringify(all), { expires: COOKIE_EXPIRY, sameSite: "Lax" });
    notifyConsentChange(all);
    setVisible(false);
  };

  const rejectAll = () => {
    Cookies.set(COOKIE_KEY, JSON.stringify(defaultPreferences), { expires: COOKIE_EXPIRY, sameSite: "Lax" });
    notifyConsentChange(defaultPreferences);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[200] p-4 md:p-6 pointer-events-none">
      <div className="max-w-2xl mx-auto pointer-events-auto bg-background border border-foreground/15 shadow-2xl p-5 md:p-6 animate-modal-in"
        style={{ boxShadow: "0 0 40px rgba(0,191,255,0.06)" }}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-display text-sm uppercase tracking-widest">ZJAV_</span>
              <span className="text-xs font-mono text-muted-foreground border border-foreground/15 px-2 py-0.5">cookies</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Používame cookies na zlepšenie výkonu a analýzu návštevnosti. Vaše súkromie je pre nás dôležité.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={acceptAll}
            size="sm"
            className="bg-zjav hover:bg-zjav-dark text-background rounded-lg px-5 glow-zjav font-medium"
          >
            Prijať všetky
          </Button>
          <Button
            onClick={rejectAll}
            size="sm"
            variant="outline"
            className="rounded-lg px-5 border-foreground/20 hover:bg-foreground/5"
          >
            Len nevyhnutné
          </Button>
          <Button
            onClick={onOpenSettings}
            size="sm"
            variant="ghost"
            className="rounded-lg px-5 text-muted-foreground hover:text-foreground gap-1.5"
          >
            <Settings className="w-3.5 h-3.5" />
            Nastavenia
          </Button>
        </div>
      </div>
    </div>
  );
}

interface CookieSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CookieSettings({ isOpen, onClose }: CookieSettingsProps) {
  const [prefs, setPrefs] = useState<CookiePreferences>(defaultPreferences);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSaved(false);
      const raw = Cookies.get(COOKIE_KEY);
      if (raw) {
        try { setPrefs(JSON.parse(raw)); } catch {}
      } else {
        setPrefs(defaultPreferences);
      }
    }
  }, [isOpen]);

  const save = () => {
    Cookies.set(COOKIE_KEY, JSON.stringify(prefs), { expires: COOKIE_EXPIRY, sameSite: "Lax" });
    notifyConsentChange(prefs);
    setSaved(true);
    setTimeout(() => { setSaved(false); onClose(); }, 900);
  };

  const acceptAll = () => {
    const all = { necessary: true, analytics: true, marketing: true };
    setPrefs(all);
    Cookies.set(COOKIE_KEY, JSON.stringify(all), { expires: COOKIE_EXPIRY, sameSite: "Lax" });
    notifyConsentChange(all);
    setTimeout(onClose, 300);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-6"
      style={{ background: "rgba(5,8,18,0.88)", backdropFilter: "blur(14px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full sm:w-[520px] sm:max-h-[85vh] bg-background border border-zjav/30 shadow-2xl animate-modal-in overflow-y-auto"
        style={{ boxShadow: "0 0 60px rgba(0,191,255,0.08)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-foreground/10">
          <div className="flex items-center gap-3">
            <span className="font-display text-sm uppercase tracking-widest">ZJAV_</span>
            <span className="text-xs font-mono text-muted-foreground border border-foreground/15 px-2 py-0.5">nastavenia cookies</span>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors p-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Intro */}
        <div className="px-6 py-4 border-b border-foreground/10">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Vyberte, ktoré cookies chcete povoliť. Nastavenia môžete kedykoľvek zmeniť cez odkaz v pätičke webu.
          </p>
        </div>

        {/* Categories */}
        <div className="px-6 py-4 space-y-3">
          {categories.map((cat) => (
            <div key={cat.key} className="border border-foreground/10 hover:border-foreground/20 transition-colors">
              <div className="flex items-center justify-between p-4 gap-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <button
                    type="button"
                    onClick={() => setExpanded(expanded === cat.key ? null : cat.key)}
                    className="flex items-center gap-2 text-left flex-1 min-w-0"
                  >
                    <span className="text-sm font-medium">{cat.label}</span>
                    {cat.required && (
                      <span className="text-xs font-mono text-muted-foreground border border-foreground/15 px-1.5 py-0.5 shrink-0">povinné</span>
                    )}
                    {expanded === cat.key
                      ? <ChevronUp className="w-3.5 h-3.5 text-muted-foreground ml-auto shrink-0" />
                      : <ChevronDown className="w-3.5 h-3.5 text-muted-foreground ml-auto shrink-0" />
                    }
                  </button>
                </div>
                <Toggle
                  checked={prefs[cat.key]}
                  onChange={(v) => setPrefs((p) => ({ ...p, [cat.key]: v }))}
                  disabled={cat.required}
                />
              </div>
              {expanded === cat.key && (
                <div className="px-4 pb-4">
                  <p className="text-xs text-muted-foreground leading-relaxed font-mono border-t border-foreground/10 pt-3">
                    {cat.description}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 px-6 py-5 border-t border-foreground/10">
          <Button
            onClick={acceptAll}
            size="sm"
            variant="ghost"
            className="text-muted-foreground hover:text-foreground text-xs rounded-lg"
          >
            Prijať všetky
          </Button>
          <Button
            onClick={save}
            size="sm"
            className="bg-zjav hover:bg-zjav-dark text-background rounded-lg px-6 glow-zjav font-medium"
          >
            {saved ? "Uložené ✓" : "Uložiť nastavenia"}
          </Button>
        </div>
      </div>
    </div>
  );
}
