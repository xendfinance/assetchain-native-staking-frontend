import React from 'react'
import { Button, CapsuleBtn, Modal, WalletConnectedForm, ConnectWalletForm } from 'components'

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
    const [modal, setModal] = React.useState({open: false, type: ""})
    const openModal = (open: boolean, type: string) => setModal({open, type})
    const closeModal = () => setModal({open: false, type: ""})

    return (
        <div>
            <nav>
            <img src="/icons/xend-logo-white.svg" alt="logo" className="logo" />
            {wallet ?
                (<CapsuleBtn
                    leftText="34,000 BUSD"
                    rightText="0x53d...28f9"
                    onClick={() => setModal({open: true, type: "show-wallet"})}
                />)
                : (
                    <Button
                        text={<ConnectWallet />}
                        tertiary
                        type="button"
                        onClick={() => setModal({open: true, type: "connect-wallet"})}
                    />
                )
            }
            </nav>

            <Modal
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
            />
        </div>
    )
}
