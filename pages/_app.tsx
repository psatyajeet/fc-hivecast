import { globalStyles } from "@/styles/globalCss";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  globalStyles();

  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
