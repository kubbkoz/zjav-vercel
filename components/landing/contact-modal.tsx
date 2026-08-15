"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { X, ArrowRight, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { hasMarketingConsent } from "./cookie-consent";
import type { ModalContext } from "./modal-provider";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  context: ModalContext;
}

type Status = "idle" | "sending" | "success" | "error";

const budgetOptions = [
  "Do 500 €",
  "500 – 1 000 €",
  "1 000 – 2 500 €",
  "Viac ako 2 500 €",
  "Neviem, poraďte mi",
];

// Reflects the modal's state in the URL (?form=open / ?form=submitted) so
// Google Analytics can pick it up as a trackable pageview/history change,
// without disturbing any existing query params (e.g. UTM) or browser history.
function setFormUrlParam(value: "open" | "submitted" | null) {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  if (value) {
    url.searchParams.set("form", value);
  } else {
    url.searchParams.delete("form");
  }
  window.history.replaceState(window.history.state, "", url.toString());
}

// Fires the Meta Pixel "Lead" event client-side and mirrors it to the
// Conversions API with the same event ID for deduplication. Best-effort —
// never blocks or fails the actual form submission.
function trackLeadEvent(email: string, phone: string, contentName: string) {
  if (typeof window === "undefined" || !hasMarketingConsent()) return;
  const eventId = crypto.randomUUID();
  const eventSourceUrl = window.location.href;

  const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
  fbq?.("track", "Lead", { content_name: contentName }, { eventID: eventId });

  fetch("/api/fb-events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      eventName: "Lead",
      eventId,
      eventSourceUrl,
      contentName,
      email,
      phone,
    }),
  }).catch(() => {});
}

export function ContactModal({ isOpen, onClose, context }: ContactModalProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formLoadedAtRef = useRef<number>(0);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    budget: "",
    features: "",
    honeypot: "", // hidden — bots fill this
  });

  const firstInputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const isPackage = context.type === "package";

  // Focus trap + ESC close
  useEffect(() => {
    if (!isOpen) return;
    firstInputRef.current?.focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  // Reset on open + record form load time client-side
  useEffect(() => {
    if (isOpen) {
      setStatus("idle");
      setErrorMsg("");
      setForm({
        name: "",
        email: "",
        phone: "",
        message: context.type === "package" ? `Mám záujem o balík ${context.packageName}.` : "",
        budget: "",
        features: "",
        honeypot: "",
      });
      formLoadedAtRef.current = Date.now();
      setFormUrlParam("open");

      return () => {
        setFormUrlParam(null);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlayRef.current) onClose();
    },
    [onClose]
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setErrorMsg("");

    const packageName = isPackage ? context.packageName : undefined;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          packageName,
          formLoadedAt: formLoadedAtRef.current,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Niečo sa pokazilo.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setFormUrlParam("submitted");
      trackLeadEvent(form.email, form.phone, packageName ?? "Kontaktný formulár");
    } catch {
      setErrorMsg("Odoslanie zlyhalo. Skúste znova alebo napíšte priamo na hello@zjav.sk");
      setStatus("error");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-6"
      style={{ background: "rgba(5, 8, 18, 0.88)", backdropFilter: "blur(14px)" }}
      role="dialog"
      aria-modal="true"
      aria-label="Kontaktný formulár"
    >
      <div className="relative w-full sm:w-[480px] sm:max-w-[480px] sm:min-h-0 h-full sm:h-auto max-h-screen sm:max-h-[90vh] bg-background border border-zjav/30 glow-zjav shadow-2xl animate-modal-in overflow-y-auto">
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center gap-3">
            <span className="font-display text-lg uppercase tracking-tight">
              ZJAV<span className="text-zjav">_</span>
            </span>
            <span className="text-xs font-mono text-muted-foreground border border-zjav/20 px-2 py-0.5">
              {isPackage ? `balík: ${context.packageName}` : "dopyt"}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Zavrieť"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-6 py-8">
          {status === "success" ? (
            <div className="flex flex-col items-center text-center py-8 gap-4">
              <CheckCircle className="w-12 h-12 text-signal" />
              <h3 className="text-xl font-display uppercase">Správa odoslaná</h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                Ozvem sa do <span className="text-foreground">24 hodín</span>. Potvrdenie sme odoslali na váš email.
              </p>
              <Button
                onClick={onClose}
                className="mt-4 bg-zjav hover:bg-zjav-dark text-background rounded-lg px-8"
              >
                Zavrieť
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              {/* Honeypot — hidden from real users */}
              <input
                type="text"
                name="honeypot"
                value={form.honeypot}
                onChange={handleChange}
                tabIndex={-1}
                aria-hidden="true"
                autoComplete="off"
                style={{
                  position: "absolute",
                  left: "-9999px",
                  width: "1px",
                  height: "1px",
                  opacity: 0,
                  pointerEvents: "none",
                }}
              />

              <div className="space-y-4">
                {isPackage && (
                  <div className="flex items-center gap-2 text-xs font-mono text-zjav border border-zjav/20 bg-zjav/5 px-3 py-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-zjav shrink-0" />
                    Dopyt k balíku {context.packageName}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-mono text-muted-foreground mb-1.5 uppercase tracking-wide">
                      Meno <span className="text-zjav">*</span>
                    </label>
                    <input
                      ref={firstInputRef}
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Ján Novák"
                      className="w-full bg-secondary border border-border text-foreground placeholder:text-muted-foreground/40 px-4 py-2.5 text-sm font-mono focus:outline-none focus:border-zjav/60 transition-colors"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-mono text-muted-foreground mb-1.5 uppercase tracking-wide">
                      Telefón
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+421 9xx xxx xxx"
                      className="w-full bg-secondary border border-border text-foreground placeholder:text-muted-foreground/40 px-4 py-2.5 text-sm font-mono focus:outline-none focus:border-zjav/60 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-muted-foreground mb-1.5 uppercase tracking-wide">
                    Email <span className="text-zjav">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="jan@firma.sk"
                    className="w-full bg-secondary border border-border text-foreground placeholder:text-muted-foreground/40 px-4 py-2.5 text-sm font-mono focus:outline-none focus:border-zjav/60 transition-colors"
                  />
                </div>

                {!isPackage && (
                  <>
                    <div>
                      <label className="block text-xs font-mono text-muted-foreground mb-1.5 uppercase tracking-wide">
                        Aký mám rozpočet na web?
                      </label>
                      <select
                        name="budget"
                        value={form.budget}
                        onChange={handleChange}
                        className="w-full bg-secondary border border-border text-foreground px-4 py-2.5 text-sm font-mono focus:outline-none focus:border-zjav/60 transition-colors"
                      >
                        <option value="">Nevybrané</option>
                        {budgetOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-muted-foreground mb-1.5 uppercase tracking-wide">
                        Aké chcem funkcie?
                      </label>
                      <textarea
                        name="features"
                        value={form.features}
                        onChange={handleChange}
                        rows={2}
                        placeholder="Napr. kontaktný formulár, e-shop, viacjazyčnosť..."
                        className="w-full bg-secondary border border-border text-foreground placeholder:text-muted-foreground/40 px-4 py-2.5 text-sm font-mono focus:outline-none focus:border-zjav/60 transition-colors resize-none"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-xs font-mono text-muted-foreground mb-1.5 uppercase tracking-wide">
                    Správa <span className="text-zjav">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Opíšte váš projekt, odvetvie, čo potrebujete..."
                    className="w-full bg-secondary border border-border text-foreground placeholder:text-muted-foreground/40 px-4 py-2.5 text-sm font-mono focus:outline-none focus:border-zjav/60 transition-colors resize-none"
                  />
                </div>

                {status === "error" && (
                  <div className="flex items-center gap-2 text-red-400 text-xs font-mono border border-red-400/20 bg-red-400/5 px-3 py-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {errorMsg}
                  </div>
                )}

                <div className="flex items-center justify-between pt-2">
                  <p className="text-xs text-muted-foreground/50 font-mono">
                    Bez záväzku · Odpoviem do 24h
                  </p>
                  <Button
                    type="submit"
                    disabled={status === "sending"}
                    className="bg-zjav hover:bg-zjav-dark text-background rounded-lg px-6 glow-zjav font-medium group"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Odosielam...
                      </>
                    ) : (
                      <>
                        Odoslať
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
