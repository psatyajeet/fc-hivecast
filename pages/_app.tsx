import { siweClient } from "@/lib/siweClient";
import { globalStyles } from "@/styles/globalCss";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { ConnectKitProvider, SIWESession, getDefaultClient } from "connectkit";
import type { AppProps } from "next/app";
import { WagmiConfig, createClient } from "wagmi";
import { arbitrum, mainnet, optimism, polygon } from "wagmi/chains";

const client = createClient(
  getDefaultClient({
    appName: "Hashcast",
    //infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
    //alchemyId:  process.env.NEXT_PUBLIC_ALCHEMY_ID,
    chains: [mainnet, polygon, optimism, arbitrum],
  })
);

export default function App({ Component, pageProps }: AppProps) {
  globalStyles();

  return (
    <>
      <WagmiConfig client={client}>
        <siweClient.Provider
          // Optional parameters
          enabled={true} // defaults true
          nonceRefetchInterval={300000} // in milliseconds, defaults to 5 minutes
          sessionRefetchInterval={300000} // in milliseconds, defaults to 5 minutes
          signOutOnDisconnect={true} // defaults true
          signOutOnAccountChange={true} // defaults true
          signOutOnNetworkChange={true} // defaults true
          onSignIn={(session?: SIWESession) => null}
          onSignOut={() => null}
        >
          <ConnectKitProvider debugMode>
            <Component {...pageProps} />
            <Analytics />
          </ConnectKitProvider>
        </siweClient.Provider>
      </WagmiConfig>
    </>
  );
}
