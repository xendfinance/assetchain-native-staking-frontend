import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import ConnectWallet from "../components/wallets/connectwallet";
import styled from "styled-components";


export const Navbar2 = () => {
    const navigate = useNavigate()

    const [connectModal, setConnectModal] = useState(false);

    return (
        <NavbarContainer>
            <nav>
                <img src="/icons/xend-logo-white.svg" alt="logo" className="logo"
                    onClick={() => navigate("/")}
                />
                <ConnectWallet />
            </nav>
        </NavbarContainer>
    )
}


const NavbarContainer = styled.div`
  height: 108px;
  background: ${({ theme }) => theme.highlight2};
  display: flex;
  justify-content: center;
  width: 100%;
//   position: fixed;
//   top: 0
`;