// import React, { useState } from 'react'
// import {useNavigate} from "react-router-dom"
// import Wallets from './Wallets'
// import ConnectionModal from './ConnectionModal'

// interface Props {
// }


// export const Navbar = () => {
//     const navigate = useNavigate()

//     const [connectModal, setConnectModal] = useState(false);

//     return (
//         <div>
//             <nav>
//             <img src="/icons/xend-logo-white.svg" alt="logo" className="logo" 
//                 onClick={() => navigate("/")}
//             />
//                <Wallets setOpen={setConnectModal} />
//             </nav>

//             <ConnectionModal
//                     open={connectModal}
//                     setOpen={setConnectModal} 
//             />
//         </div>
//     )
// }


import React, { useState } from 'react'
import { Button, CapsuleBtn, Modal, WalletForm } from 'components'
import {useNavigate} from "react-router-dom"
import Wallets from './Wallets'
import ConnectionModal from './ConnectionModal'

interface Props {
    wallet?: boolean;
    toggleWallet?: () => void;
}


export const Navbar = ({wallet, toggleWallet}: Props) => {
    const navigate = useNavigate()

    const [connectModal, setConnectModal] = useState(false);

    const [modal, setModal] = React.useState({open: false, type: ""})
    const openModal = (open: boolean, type: string) => setModal({open, type})
    const closeModal = () => setModal({open: false, type: ""})

    return (
        <div>
            <nav>
            <img src="/icons/xend-logo-white.svg" alt="logo" className="logo" 
                onClick={() => navigate("/")}
            />
               <Wallets setOpen={setConnectModal} open={openModal} close={closeModal} />
            </nav>

            {/* <ConnectionModal
                open={connectModal}
                setOpen={setConnectModal} 
            /> */}
            <Modal
                modalOpen={modal.open}
                modalClose={closeModal}
                closeIcon
                title={`${modal.type === "connect-wallet" ? "Connect Wallet" : modal.type === "disconnect" ? "Disconnect Wallet" : ""}`}
                modalChild={<WalletForm close={closeModal} />}
                className={`${modal.type === "connect-modal" && "connect-modal"}`}
            />
        </div>
    )
}
