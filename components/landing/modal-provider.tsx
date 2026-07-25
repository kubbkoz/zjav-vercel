"use client";

import { createContext, useContext, useState, useCallback } from "react";
import dynamic from "next/dynamic";

const ContactModal = dynamic(
  () => import("./contact-modal").then((m) => ({ default: m.ContactModal })),
  { ssr: false }
);

interface ModalContextValue {
  openModal: () => void;
}

const ModalContext = createContext<ModalContextValue>({ openModal: () => {} });

export function useModal() {
  return useContext(ModalContext);
}

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  return (
    <ModalContext.Provider value={{ openModal }}>
      {children}
      <ContactModal isOpen={isOpen} onClose={closeModal} />
    </ModalContext.Provider>
  );
}
