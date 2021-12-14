import { InjectedConnector } from '@web3-react/injected-connector';
import { ConnectorNames } from './types';
//import getNodeUrl from './node-url';
import _const from '.././methods/_const';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { DisconnectFromWallet } from './useAuth';
import getNodeUrl from './node-url';



let injected = new InjectedConnector({ supportedChainIds: [56] });



export const connectorsByName = (connectorName: ConnectorNames, chainId: number) => {
    try {

        const rpcUrl = getNodeUrl();
        if (connectorName === ConnectorNames.Injected) {
       
            return injected;
        }
    
        if (connectorName === ConnectorNames.WalletConnect) {
          
            if(chainId === 56 ){
                
                const walletconnect = new WalletConnectProvider({
                    rpc: { 56: rpcUrl },
                    chainId,
                    qrcodeModalOptions: {
                        mobileLinks: [
                          "metamask",
                          "trust",
                        ],
                      },
                });
    
                // Subscribe to session disconnection
                walletconnect.on("disconnect", (code: number, reason: string) => {
                DisconnectFromWallet();
                });

               

                
                return walletconnect;
            }else{
                //If Matic Network 137
               // ADD logic
            }
    
        }
    } catch (error) {
     
    }
}





