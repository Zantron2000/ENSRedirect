import React from "react";
import { SSXProvider } from "@spruceid/ssx-react";
import { useWalletClient } from "wagmi";
import { disconnect } from "@wagmi/core";

async function attemptSignIn(ssx) {
  try {
    await ssx.signIn();
  } catch (e) {
    console.error(e);
    disconnect();
  }
}

function SSXWithWatchProvider({ children }) {
  const { data: walletClient } = useWalletClient();

  const web3Provider = {
    provider: walletClient,
  };

  return (
    <SSXProvider
      ssxConfig={{
        siweConfig: {
          domain: "localhost:3000",
        },
      }}
      web3Provider={web3Provider}
      watchProvider={async (provider, ssx) => {
        if (ssx) {
          // SignIn
          if (provider && !ssx.address()) {
            await attemptSignIn(ssx);

            return ssx;
            // Change Account
          } else if (
            provider &&
            ssx.address() &&
            provider.account.address !== ssx.address()
          ) {
            await ssx.signOut();
            await attemptSignIn(ssx);
            return ssx;

            // SignOut
          } else {
            await ssx.signOut();
          }
        }
      }}
    >
      {children}
    </SSXProvider>
  );
}

module.exports = {
  SSXWithWatchProvider,
};
