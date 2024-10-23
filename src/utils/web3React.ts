import { InjectedConnector } from "@web3-react/injected-connector";
import { ConnectorNames } from "./types";
import _const from ".././methods/_const";
// import WalletConnectProvider from "@walletconnect/web3-provider";
import { DisconnectFromWallet } from "./useAuth";
import { EthereumProvider } from "@walletconnect/ethereum-provider";
import { WalletConnectProjectId, isMainnet } from "./constants";

export const chains = !isMainnet
  ? [{ chainId: 42421, RPC: "https://enugu-rpc.assetchain.org" }]
  : [{ chainId: 42420, RPC: "https://mainnet-rpc.assetchain.org" }];
export const defaultChainId = !isMainnet ? 42421 : 42420;
let injected = new InjectedConnector({
  supportedChainIds: chains.map((c) => c.chainId),
});

const rpc = {} as { [key: number]: string };

for (const chain of chains) {
  rpc[chain.chainId] = chain.RPC;
}

export const connectorsByName = async (connectorName, chainId) => {
  try {
    if (connectorName === ConnectorNames.Injected) {
      return injected;
    }

    if (connectorName === ConnectorNames.WalletConnect) {
      const provider = await walletconnectEthereumProvider();

      await provider.request({ method: "eth_requestAccounts" });

      provider.on("disconnect", () => {
        DisconnectFromWallet();
      });

      return provider;
      //   if (chainId === 56) {
      //     const walletconnect = new WalletConnectProvider({
      //       rpc: { 56: "https://bsc-dataseed1.ninicoin.io" },
      //       chainId,
      //       qrcodeModalOptions: {
      //         mobileLinks: ["metamask"]
      //       }
      //     });

      //     // Subscribe to session disconnection
      //     walletconnect.on("disconnect", (code, reason) => {
      //       DisconnectFromWallet();
      //     });

      //     return walletconnect;
      //   } else {
      //     //If Matic Network 137
      //     const wcProviderMATIC = new WalletConnectProvider({
      //       rpc: {
      //         137: process.env.REACT_APP_RPC_URL,
      //         80001: process.env.REACT_APP_RPC_URL,
      //         42161: process.env.REACT_APP_RPC_URL,
      //       },

      //       chainId,
      //       qrcodeModalOptions: {
      //         mobileLinks: ["metamask", "trust"]
      //       }
      //     });
      //     wcProviderMATIC.on("disconnect", (code, reason) => {
      //       DisconnectFromWallet();
      //     });
      //     return wcProviderMATIC;
      //   }
    }
  } catch (error) {
    console.log("ERROR HAS BEEN CAUGHT", error);
  }
};
export async function walletconnectEthereumProvider() {
  const provider = await EthereumProvider.init({
    projectId: WalletConnectProjectId,
    showQrModal: true,
    chains: [...chains.map((c) => c.chainId)] as any,
    rpcMap: rpc,
  });

  await provider.enable();

  const _chainId = provider.signer.session.namespaces.eip155.chains[0];
  console.log(provider.signer.session.namespaces.eip155.chains, "chains");
  const chainId = parseInt(_chainId.replace("eip155:", ""));

  const include = chains.map((c) => c.chainId).includes(chainId);

  if (!include) {
    await switchChain(defaultChainId, provider);
    return provider;
  }

  return provider;
}

export async function switchChain(chainId: number, provider: any) {
  try {
    console.log(chainId, "switch");
    const res = await provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: `0x${chainId.toString(16)}` }],
    });
    console.log(chainId, "switch over");
  } catch (error) {
    console.log(chainId, "switch error", error);
    await addChain(chainId, provider);
  }
}

export async function addChain(
  chainId: number,
  provider: any
): Promise<boolean> {
  const chain = chains.find((c) => c.chainId === chainId);

  try {
    const param = {
      chainId: `0x${chainId.toString(16)}`,
      chainName:
        chain.chainId === 42421 ? "Asset Chain Testnet" : "Asset Chain",
      nativeCurrency: {
        name: "RWA",
        symbol: "RWA",
        decimals: 18,
      },
      rpcUrls: [chain.RPC],
    };
    const resp = await provider.request({
      method: "wallet_addEthereumChain",
      params: [param],
    });
    return provider;
  } catch (addError) {
    throw addError;
  }
}
