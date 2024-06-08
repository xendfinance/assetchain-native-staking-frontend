import { Config, ConnectorNames } from "./types";
import Metamask from "./images/metamask.svg";
import WalletConnect from "./images/walletconnect.svg";
import MadWallet from "./images/madwallet.svg";
// import FortMatic from "./images/fortmatic.svg";
// import CoinBase from "./images/coinbase.svg";

const connectors: Config[] = [
  // {
  //   title: "MadWallet",
  //   icon: "madwallet",
  //   image: MadWallet,
  //   connectorId: ConnectorNames.Injected
  // },
  {
    title: "Metamask",
    icon: "metamask",
    image: Metamask,
    connectorId: ConnectorNames.Injected
  },
  {
    title: "WalletConnect",
    icon: "walletconnect",
    image: WalletConnect,
    connectorId: ConnectorNames.WalletConnect
  },
 
  // {
  //   title: "Fortmatic",
  //   icon: "fortmatic",
  //   image: FortMatic,
  //   connectorId: ConnectorNames.WalletConnect
  // },
  // {
  //   title: "Coinbase",
  //   icon: "coinbase",
  //   image: CoinBase,
  //   connectorId: ConnectorNames.CoinBase
  // }
];

export default connectors;
export const connectorLocalStorageKey = "connectorId";
