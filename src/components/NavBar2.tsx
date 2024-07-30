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
                    <Faucet style={{color: `#ed7e5c`}} target="_blank" href="http://leaderboard.assetchain.org/"> Leaderboard</Faucet>
                    <Faucet target="_blank" rel="noreferrer" href="https://faucet.assetchain.org/" title="RWA Faucet">
                        <img height="12px" src="https://faucet.assetchain.org/favicon/favicon-32x32.png" alt="faucet" />
                        <p> RWA Faucet</p>
                    </Faucet>
                    <ConnectWallet />
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
    gap: 1rem;
    align-items: center;

`

const Faucet = styled.a`
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: ${({ theme }) => theme.textXXs};
    color: #FFFFFF;
    text-decoration: none;
    cursor: pointer;
`