import { InjectedConnector } from '@web3-react/injected-connector';
import { ConnectorNames } from './types';
import _const from '.././methods/_const';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { DisconnectFromWallet } from './useAuth';


let injected = new InjectedConnector({
    supportedChainIds: [1, 56, 137, 80001, 97, 42161]
  });
  
  export const connectorsByName = (connectorName, chainId) => {
    try {
      if (connectorName === ConnectorNames.Injected) {
        return injected;
      }
  
      if (connectorName === ConnectorNames.WalletConnect) {
        if (chainId === 56) {
          const walletconnect = new WalletConnectProvider({
            rpc: { 56: "https://bsc-dataseed1.ninicoin.io" },
            chainId,
            qrcodeModalOptions: {
              mobileLinks: ["metamask"]
            }
          });
  
          // Subscribe to session disconnection
          walletconnect.on("disconnect", (code, reason) => {
            DisconnectFromWallet();
          });
  
          return walletconnect;
        } else {
          //If Matic Network 137
          const wcProviderMATIC = new WalletConnectProvider({
            rpc: {
              137: process.env.REACT_APP_RPC_URL,
              80001: process.env.REACT_APP_RPC_URL,
              42161: process.env.REACT_APP_RPC_URL,
            },
  
            chainId,
            qrcodeModalOptions: {
              mobileLinks: ["metamask", "trust"]
            }
          });
          wcProviderMATIC.on("disconnect", (code, reason) => {
            DisconnectFromWallet();
          });
          return wcProviderMATIC;
        }
      }
    } catch (error) {
      console.log("ERROR HAS BEEN CAUGHT", error);
    }
  };



