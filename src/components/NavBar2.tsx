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
                <ConnectSection>
                    <ConnectWallet />
                    <Faucet target="_blank" rel="noreferrer" href="https://faucet.xendrwachain.com/" title="RWA Faucet">
                        <img src="https://faucet.xendrwachain.com/favicon/favicon-32x32.png" alt="faucet" />
                        <p> RWA Faucet</p>
                    </Faucet>
                </ConnectSection>
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

const ConnectSection = styled.div`
    display: flex;
    gap: 0.2rem;

`

const Faucet = styled.a`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: ${({ theme }) => theme.textXXs};
    color: #FFFFFF;
    text-decoration: none;
`