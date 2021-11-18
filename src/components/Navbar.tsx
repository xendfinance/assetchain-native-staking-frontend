import React, { useState } from 'react'
import { Button, CapsuleBtn, Modal, WalletConnectedForm, ConnectWalletForm } from 'components'
import {useNavigate} from "react-router-dom"
import Wallets from './Wallets'
import ConnectionModal from './ConnectionModal'

interface Props {
    wallet?: boolean;
    toggleWallet?: () => void;
}

const ConnectWallet = () => (
    <div className="connect-wallet">
        <img src="/icons/connect-wallet.svg" alt="wallet" className="wallet-img" />
        <span>Connect Wallet</span>
    </div>
)

export const Navbar = ({wallet, toggleWallet}: Props) => {
    const navigate = useNavigate()

    const [connectModal, setConnectModal] = useState(false);

    return (
        <div>
            <nav>
            <img src="/icons/xend-logo-white.svg" alt="logo" className="logo" 
                onClick={() => navigate("/")}
            />
               <Wallets setOpen={setConnectModal} />
            </nav>

            <ConnectionModal
                    open={connectModal}
                    setOpen={setConnectModal} />
            {/* <Modal
                modalOpen={modal.open}
                modalClose={closeModal}
                closeIcon
                title={`${modal.type === "connect-wallet" ? "Connect Wallet" : modal.type === "show-wallet" ? "Connected" : ""}`}
                modalChild={modal.open && modal.type === "connect-wallet" 
                    ? <ConnectWalletForm close={closeModal} toggleWallet={toggleWallet} />
                    : modal.type === "show-wallet" ? <WalletConnectedForm close={closeModal} toggleWallet={toggleWallet} />
                    : null
                }
                className={`${modal.type === "connect-modal" && "connect-modal"}`}
            /> */}
        </div>
    )
}
