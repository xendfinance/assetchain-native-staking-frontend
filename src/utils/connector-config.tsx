import { Config, ConnectorNames } from './types';
import Metamask from '../assets/icons/metamask-fox.svg';
import WalletConnect from '../assets/icons/walletconnect.svg'
import TrustWallet from '../assets/icons/trust-wallet.svg';

const connectors: Config[] = [
    {
        title: 'Metamask',
        icon: 'metamask',
        image: Metamask,
        connectorId: ConnectorNames.Injected,
    },
    {
        title: 'WalletConnect',
        icon: 'walletconnect',
        image: WalletConnect,
        connectorId: ConnectorNames.WalletConnect,
    },
    {
        title: 'TrustWallet',
        icon: 'trustwallet',
        image: TrustWallet,
        connectorId: ConnectorNames.WalletConnect,
    },   
];

export default connectors;
export const connectorLocalStorageKey = 'connectorId';
