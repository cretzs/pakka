"use client";

import Script from "next/script";

const siteKey = process.env.NEXT_PUBLIC_TELLSHIELD_SITE_KEY;
const apiUrl = process.env.NEXT_PUBLIC_TELLSHIELD_API_URL;

type TellshieldGlobal = {
  init: (opts: { siteKey: string; apiUrl: string }) => unknown;
  client?: unknown;
};

export function TellshieldLoader() {
  if (!siteKey || !apiUrl) return null;

  return (
    <Script
      src="/tellshield.js"
      strategy="afterInteractive"
      data-site-key={siteKey}
      data-api-url={apiUrl}
      onLoad={() => {
        const tellshield = (window as Window & { Tellshield?: TellshieldGlobal }).Tellshield;
        if (!tellshield) return;
        const client = (tellshield.client ??
          tellshield.init({ siteKey, apiUrl })) as { verify?: (opts: { action: string }) => Promise<unknown> };
        tellshield.client = client;
        void client.verify?.({ action: "pageview" });
      }}
    />
  );
}
