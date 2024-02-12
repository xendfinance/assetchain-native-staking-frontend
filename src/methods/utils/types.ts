export enum ConnectorNames {
  Injected = "injected",
  WalletConnect = "walletconnect",
  BSC = "bsc",
  MathWallet = "mathwallet",
  CoinBase = "coinbase",
  MadWallet = "madwallet"
}

//used For Contract Creator
export enum WalletConnectorNames {
  InjectedWallet = "metamask",
  BinanceWallet = "bscwallet",
  WalletConnect = "walletConnect"
}

export declare type Login = (connectorId: ConnectorNames) => void;

export interface Config {
  title: string;
  icon: string;
  image: any;
  connectorId: ConnectorNames;
}
