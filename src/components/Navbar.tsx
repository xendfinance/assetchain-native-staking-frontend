import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import Wallets from './Wallets'
import ConnectionModal from './ConnectionModal'
import styled from "styled-components";
interface Props {
}


export const Navbar = () => {
    const navigate = useNavigate()

    const [connectModal, setConnectModal] = useState(false);

    return (
        <NavbarContainer>
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
        </NavbarContainer>
    )
}


const NavbarContainer = styled.div`
  height: 108px;
  background: ${({ theme }) => theme.highlight2};
  display: flex;
  justify-content: center;
  width: 100%;
`;