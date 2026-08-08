"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { CONSENT_CHANGE_EVENT, hasMarketingConsent, type CookiePreferences } from "./cookie-consent";

const PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

// Loads the Meta Pixel base code only once marketing consent is granted —
// on mount, and reactively if the visitor changes their cookie preferences
// later without reloading the page.
export function FacebookPixel() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(hasMarketingConsent());

    const handleConsentChange = (e: Event) => {
      const detail = (e as CustomEvent<CookiePreferences>).detail;
      setEnabled(!!detail?.marketing);
    };
    window.addEventListener(CONSENT_CHANGE_EVENT, handleConsentChange);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, handleConsentChange);
  }, []);

  if (!PIXEL_ID || !enabled) return null;

  return (
    <Script id="facebook-pixel" strategy="afterInteractive">
      {`
        !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
        n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
        document,'script','https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${PIXEL_ID}');
        fbq('track', 'PageView');
      `}
    </Script>
  );
}
