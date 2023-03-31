import { globalStyles } from "@/styles/globalCss";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  globalStyles();

  return (
    <>
      {/* <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-4T2V16DZ3M"
      />
          
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-4T2V16DZ3M', {
            page_path: window.location.pathname,
          });
        `,
        }}
      /> */}
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
