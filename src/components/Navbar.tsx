import React, { useState } from 'react'
import {useNavigate} from "react-router-dom"
import Wallets from './Wallets'
import ConnectionModal from './ConnectionModal'

interface Props {
}


export const Navbar = () => {
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
                    setOpen={setConnectModal} 
            />
        </div>
    )
}
