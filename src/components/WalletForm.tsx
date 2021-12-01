import { Button } from 'components'
import React from 'react'
import {useDispatch, useSelector} from "react-redux"
import { getCurrentSelectedNetwork } from '../methods/utils/get-current-network-selected';
import { disconnect } from 'methods/redux/actions/contract-setup';
import connectors, { connectorLocalStorageKey } from '../utils/connector-config';
import { Login } from 'utils/useAuth';

interface Props {
    close?: () => void;
    toggleWallet?: () => void;
}

export const WalletForm = ({close, toggleWallet}: Props) => {
    const dispatch = useDispatch()

    const address = useSelector((store: any) => store.DashboardReducer.address);
	const walletInUse = useSelector((store: any) => store.DashboardReducer.walletInUse);

    const [connectInfo, setConnectInfo] = React.useState({ network: null, protocol: null, wallet: null, chainId: null })
    const [currentNetwork, setCurrentNetwork] = React.useState(getCurrentSelectedNetwork());
	const {chainId} = useSelector((store: any) => store.DashboardReducer)

    const connectWallet = (entry: any) => {
        // setConnectInfo({
        //     ...connectInfo,
        //     network: 'bsc',
        //     chainId: 97,
        //     protocol: null,										
        // })	

        dispatch(Login(entry, connectInfo.chainId, entry.title));

        window.localStorage.setItem(connectorLocalStorageKey, entry.connectorId);
        close && close()
    }

    const disconnectWallet = () => {		
		// setOpen(false);
		dispatch(disconnect());
		setTimeout(() => {
			window.location.reload();
		}, 500)
        close && close()
	}

    const [selected, setSelect] = React.useState(false)

    return (
        <>
            {!address ? 
                (
                    <div className="connect-wallet-form">
                        <div className="network-tab">
                            <p id="select">Choose Network</p>
                            <div className="network"
                                onClick={() => setConnectInfo({
                                    ...connectInfo,
                                    network: 'bsc',
                                    chainId: 97,
                                    protocol: null,										
                                })}
                            >
                                <div className="img-box">
                                <img src="/icons/bsc.svg" alt='binance' id="network-img" />
                                    {connectInfo.network === 'bsc' &&
									<img className="check" src="/icons/check.svg" alt="check" id="check-img" />}
                                </div>
								<div className={`chain-name ${connectInfo.network === 'bsc' && "green-text"}`}>Binance Smart Chain</div>
                            </div>
                        </div>
                        {connectors.map((entry: any, i: any) => (
                            <div 
                                key={i}
                                className="wallet-box"
                                onClick={() => {
                                    connectWallet(entry.connectorId)
                                    // dispatch(Login(entry.connectorId, connectInfo.chainId, entry.title));

                                    // window.localStorage.setItem(connectorLocalStorageKey, entry.connectorId);
                                    // // setOpen(false);
                                    // //window.location.reload();
                                    // close && close()
                                }}
                            >
                                <img src={entry.image} alt="wallet" id="wallet-img" />
                                <div className="details">
                                    <p className="text-primary" id="wallet">{entry.title}</p>
                                    <p className="text-secondary" id="info">
                                        Connect to your {entry.title} Wallet
                                    </p>
                                </div>
                            </div>
                            )
                        )}
                    </div>
                ) 
                :
                (
                    <div className="disconnect-wallet-form">
                        <div className="bg-primary wallet-details">
                            <p className="text-secondary" id="chain">Binance Smart Chain Network</p>
                            {/* <p className="text-primary" id="value">34,000 <span id="coin">BUSD</span></p> */}
                            <p className="text-secondary" id="wallet-address">Wallet Address</p>
                            <p className="text-primary" id="wallet">{address}</p>
                        </div>
                        <div className="btn-cont">
                            <p id="disconnect-btn"
                                onClick={() => disconnectWallet()}
                            >
                                Disconnect
                            </p>
                        </div>
                    </div>
                )
            }
        </>
    )
}



export const ConnectWalletForm = ({close, toggleWallet}: Props) => {
    const walletAction = () => {
        toggleWallet && toggleWallet()
        close && close()
    }

    // const disconnectWallet = () => {
    //     toggleWallet && toggleWallet()
    //     close && close()
    // }

    return (
        <div className="wallet-form-1">
            {/* <div id="title-1">Connect Wallet</div> */}
            <div className="wallet-box"
                onClick={() => walletAction()}
            >
                <img src="/icons/metamask.svg" alt="wallet" id="wallet-img" />
                <div className="details">
                    <p className="text-primary" id="wallet">Metamask</p>
                    <p className="text-secondary" id="info">
                        Connect to your MetaMask Wallet
                    </p>
                </div>
            </div>

            <div className="wallet-box"
                onClick={() => walletAction()}
            >
                <img src="/icons/metamask.svg" alt="wallet" id="wallet-img" />
                <div className="details">
                    <p className="text-primary" id="wallet">WalletConnect</p>
                    <p className="text-secondary" id="info">
                        Scan with WalletConnect to connect
                    </p>
                </div>
            </div>
        </div>
    )
}


export const WalletConnectedForm = ({close, toggleWallet}: Props) => {
    const walletAction = () => {
        toggleWallet && toggleWallet()
        close && close()
    }

    return (
        <div className="wallet-form-2">
            {/* <div id="title-1">Connected</div> */}
            <div className="bg-primary wallet-details">
                <p className="text-secondary" id="chain">Binance Smart Chain Network</p>
                <p className="text-primary" id="value">34,000 <span id="coin">BUSD</span></p>
                <p className="text-secondary" id="wallet-address">Wallet Address</p>
                <p className="text-primary" id="wallet">0h36373vhdf73h36383n6339sj</p>
            </div>
            <div className="btn-cont">
                <p id="disconnect-btn"
                    onClick={() => walletAction()}
                >
                    Disconnect
                </p>
            </div>
        </div>
    )
}
