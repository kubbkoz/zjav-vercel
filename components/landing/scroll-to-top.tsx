"use client";

import { useEffect, useState } from "react";
import { ArrowUp, ArrowRight } from "lucide-react";
import { useModal } from "./modal-provider";

export function ScrollToTop() {
  const { openModal } = useModal();
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!mounted) return null;

  const scrollUp = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      {/* Floating CTA — mobile only, centered */}
      <button
        onClick={openModal}
        aria-label="Náhľad zadarmo"
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 sm:hidden flex items-center gap-2 px-6 h-12 rounded-lg bg-zjav text-background font-medium text-sm glow-zjav transition-all duration-300 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        Náhľad zadarmo
        <ArrowRight className="w-4 h-4" />
      </button>

      {/* Scroll to top */}
      <button
        onClick={scrollUp}
        aria-label="Scroll to top"
        className={`fixed bottom-6 right-6 z-50 w-11 h-11 flex items-center justify-center rounded-lg border border-zjav/40 bg-background text-zjav glow-zjav transition-all duration-300 hover:bg-zjav hover:text-background ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <ArrowUp className="w-4 h-4" />
      </button>
    </>
  );
}
