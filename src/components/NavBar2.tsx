import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import ConnectWallet from "../components/wallets/connectwallet";
import styled from "styled-components";
import { isMainnet } from 'utils/constants';
import { FaBars, FaTimes } from 'react-icons/fa'; // Add icons for hamburger and close

export const Navbar2 = () => {
    const navigate = useNavigate()

    const [connectModal, setConnectModal] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track hamburger menu

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <NavbarContainer>
            <nav>
                <Logo src="/logo-dark.svg" alt="logo"
                    onClick={() => navigate("/")}
                />
                <HamburgerIcon onClick={toggleMenu}>
                    {isMenuOpen ? <FaTimes /> : <FaBars />} {/* Toggle between hamburger and close icon */}
                </HamburgerIcon>
                <ConnectSection isMenuOpen={isMenuOpen}>
                    {!isMainnet && <Faucet style={{color: `#ed7e5c`}} target="_blank" href="http://leaderboard.assetchain.org/"> Leaderboard</Faucet>}
                    {!isMainnet && <Faucet target="_blank" rel="noreferrer" href="https://faucet.assetchain.org/" title="RWA Faucet">
                        <img height="12px" src="https://faucet.assetchain.org/favicon/favicon-32x32.png" alt="faucet" />
                        <p> RWA Faucet</p>
                    </Faucet>}
                    <ConnectWallet />
                </ConnectSection>
            </nav>
        </NavbarContainer>
    )
}

// Styled components

const NavbarContainer = styled.div`
  height: 108px;
  background: ${({ theme }) => theme.highlight2};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0 1rem;

  nav {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Logo = styled.img`
  cursor: pointer;
  height: 40px;

  @media (max-width: 768px) {
    height: 30px;
  }
`;

// Hamburger icon
const HamburgerIcon = styled.div`
  display: none;
  cursor: pointer;
  font-size: 1.5rem;
  z-index: 10;
  color: #fff;

  @media (max-width: 768px) {
    display: block;
  }
`;

const ConnectSection = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;

    @media (max-width: 768px) {
        position: absolute;
        top: 108px;
        right: 0;
        width: 100%;
        height: 100vh;
        background-color: ${({ theme }) => theme.highlight2};
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 2rem;
        transform: ${({ isMenuOpen }) => (isMenuOpen ? "translateX(0)" : "translateX(100%)")};
        transition: transform 0.3s ease-in-out;
        z-index: 5;
    }
`

const Faucet = styled.a`
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: ${({ theme }) => theme.textXXs};
    color: #FFFFFF;
    text-decoration: none;
    cursor: pointer;

    @media (max-width: 768px) {
        font-size: 16px;
    }
`;
