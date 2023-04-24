import { getCssText } from "@/stitches.config";
import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="title" content="Hashcast" />
        <meta name="description" content="Find casts on different topics" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.hashcast.xyz/" />
        <meta property="og:title" content="Hashcast" />
        <meta
          property="og:description"
          content="Find casts on different topics"
        />
        <meta property="og:image" content="" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.hashcast.xyz/" />
        <meta property="twitter:title" content="Hashcast" />
        <meta
          property="twitter:description"
          content="Find casts on different topics"
        />
        <meta property="twitter:image" content="" />
        {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
        <link rel="icon" href="/favicon.ico" />
        <script
          defer
          data-domain="hashcast.xyz"
          src="https://plausible.io/js/script.tagged-events.js"
        ></script>
        <style
          id="stitches"
          dangerouslySetInnerHTML={{ __html: getCssText() }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
