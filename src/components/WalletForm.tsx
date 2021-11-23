import { Button } from 'components'
import React from 'react'

interface Props {
    close?: () => void;
    toggleWallet?: () => void;
}

export const ConnectWalletForm = ({close, toggleWallet}: Props) => {
    const walletAction = () => {
        toggleWallet && toggleWallet()
        close && close()
    }


    return (
        <div className="connect-wallet-form">
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


export const DisconnectWalletForm = ({close, toggleWallet}: Props) => {
    const walletAction = () => {
        toggleWallet && toggleWallet()
        close && close()
    }

    return (
        <div className="disconnect-wallet-form">
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
