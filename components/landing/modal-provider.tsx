"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { ContactModal } from "./contact-modal";
import { ScrollToTop } from "./scroll-to-top";
import { CookieBanner, CookieSettings } from "./cookie-consent";

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

// Renders all floating overlays into document.body via a portal so they never
// participate in the SSR tree and cannot shift Radix's fiber ID counter.
function Overlays({
  isOpen,
  onClose,
  cookieSettingsOpen,
  onCloseCookieSettings,
  onOpenCookieSettings,
}: {
  isOpen: boolean;
  onClose: () => void;
  cookieSettingsOpen: boolean;
  onCloseCookieSettings: () => void;
  onOpenCookieSettings: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(
    <>
      <ContactModal isOpen={isOpen} onClose={onClose} />
      <ScrollToTop />
      <CookieBanner onOpenSettings={onOpenCookieSettings} />
      <CookieSettings isOpen={cookieSettingsOpen} onClose={onCloseCookieSettings} />
    </>,
    document.body
  );
}

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [cookieSettingsOpen, setCookieSettingsOpen] = useState(false);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);
  const openCookieSettings = useCallback(() => setCookieSettingsOpen(true), []);
  const closeCookieSettings = useCallback(() => setCookieSettingsOpen(false), []);

  return (
    <ModalContext.Provider value={{ openModal, openCookieSettings }}>
      {children}
      <Overlays
        isOpen={isOpen}
        onClose={closeModal}
        cookieSettingsOpen={cookieSettingsOpen}
        onCloseCookieSettings={closeCookieSettings}
        onOpenCookieSettings={openCookieSettings}
      />
    </ModalContext.Provider>
  );
}
