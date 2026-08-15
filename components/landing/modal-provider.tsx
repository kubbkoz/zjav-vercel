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

// "package": opened from a pricing-package/care-plan CTA — the form is
// personalized to that package instead of asking generic qualifying
// questions. "generic": every other CTA on the site — asks budget/features
// to qualify the lead.
export type ModalContext =
  | { type: "package"; packageName: string }
  | { type: "generic" };

const GENERIC_CONTEXT: ModalContext = { type: "generic" };

interface ModalContextValue {
  openModal: (context?: ModalContext) => void;
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
  modalContext,
  onClose,
  cookieSettingsOpen,
  onCloseCookieSettings,
  onOpenCookieSettings,
}: {
  isOpen: boolean;
  modalContext: ModalContext;
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
      <ContactModal isOpen={isOpen} onClose={onClose} context={modalContext} />
      <ScrollToTop />
      <CookieBanner onOpenSettings={onOpenCookieSettings} />
      <CookieSettings isOpen={cookieSettingsOpen} onClose={onCloseCookieSettings} />
    </>,
    document.body
  );
}

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContext, setModalContext] = useState<ModalContext>(GENERIC_CONTEXT);
  const [cookieSettingsOpen, setCookieSettingsOpen] = useState(false);

  const openModal = useCallback((context?: ModalContext) => {
    setModalContext(context ?? GENERIC_CONTEXT);
    setIsOpen(true);
  }, []);
  const closeModal = useCallback(() => setIsOpen(false), []);
  const openCookieSettings = useCallback(() => setCookieSettingsOpen(true), []);
  const closeCookieSettings = useCallback(() => setCookieSettingsOpen(false), []);

  return (
    <ModalContext.Provider value={{ openModal, openCookieSettings }}>
      {children}
      <Overlays
        isOpen={isOpen}
        modalContext={modalContext}
        onClose={closeModal}
        cookieSettingsOpen={cookieSettingsOpen}
        onCloseCookieSettings={closeCookieSettings}
        onOpenCookieSettings={openCookieSettings}
      />
    </ModalContext.Provider>
  );
}
