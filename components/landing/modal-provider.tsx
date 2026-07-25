"use client";

import { createContext, useContext, useState, useCallback } from "react";
import dynamic from "next/dynamic";

const ContactModal = dynamic(
  () => import("./contact-modal").then((m) => ({ default: m.ContactModal })),
  { ssr: false }
);

const ScrollToTop = dynamic(
  () => import("./scroll-to-top").then((m) => ({ default: m.ScrollToTop })),
  { ssr: false }
);

const CookieBanner = dynamic(
  () => import("./cookie-consent").then((m) => ({ default: m.CookieBanner })),
  { ssr: false }
);

const CookieSettings = dynamic(
  () => import("./cookie-consent").then((m) => ({ default: m.CookieSettings })),
  { ssr: false }
);

interface ModalContextValue {
  openModal: () => void;
  openCookieSettings: () => void;
}

const ModalContext = createContext<ModalContextValue>({
  openModal: () => {},
  openCookieSettings: () => {},
});

export function useModal() {
  return useContext(ModalContext);
}

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [cookieSettingsOpen, setCookieSettingsOpen] = useState(false);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);
  const openCookieSettings = useCallback(() => setCookieSettingsOpen(true), []);
  const closeCookieSettings = useCallback(() => setCookieSettingsOpen(false), []);

  return (
    <ModalContext.Provider value={{ openModal, openCookieSettings }}>
      {children}
      <ContactModal isOpen={isOpen} onClose={closeModal} />
      <ScrollToTop />
      <CookieBanner onOpenSettings={openCookieSettings} />
      <CookieSettings isOpen={cookieSettingsOpen} onClose={closeCookieSettings} />
    </ModalContext.Provider>
  );
}
