"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { MaintenancePage } from "./maintenance-page";

// Routes that stay publicly reachable while the rest of the site is in
// maintenance mode. A prefix also covers everything nested under it.
const PUBLIC_DURING_MAINTENANCE = ["/case-studies"];

export function MaintenanceGate({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "/";
  const isPublic = PUBLIC_DURING_MAINTENANCE.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  return isPublic ? <>{children}</> : <MaintenancePage />;
}
