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

