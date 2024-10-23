import React from 'react'
import styled from "styled-components";


//icons
import infoIcon from "../assets/icons/logo-dark.svg"
import fbk from "../assets/icons/fbk.svg"
import instagram from "../assets/icons/instagram.svg"
import telegram from "../assets/icons/telegram.svg"
import twitter from "../assets/icons/twitter.svg"
import youtube from "../assets/icons/youtube.svg"
import reddit from "../assets/icons/reddit.svg"
import linkedIn from "../assets/icons/linkedin.svg"
import discord from "../assets/icons/Discord.svg"
import shield from "../assets/icons/shield.svg"
import Github from "../assets/icons/github.png"
import Medium from "../assets/icons/medium.png"


export const Footer2 = () => {

    return (
        <FooterContainer>
            <Footer>
                <div>
                    <img src={infoIcon} alt="Asset Chain" />
                    <p id="copy">
                        &copy; {new Date().getFullYear()} Asset Chain.
                    </p>
                </div>

                <Socials>
                    <SocialRow>
                        {footerData.slice(0, 4).map((footer) => (
                            <FooterItem href={footer.link} key={footer.id} rel="noreferrer"
                            target="_blank">
                                <img src={footer.icon} alt={footer.title} width="25px" />
                                <p>{footer.title}</p>
                            </FooterItem>
                        ))}
                    </SocialRow>
                    <SocialRow>
                        {footerData.slice(4).map((footer) => (
                            <FooterItem href={footer.link} key={footer.id} rel="noreferrer"
                            target="_blank">
                                <img src={footer.icon} alt={footer.title} width="25px" />
                                <p>{footer.title}</p>
                            </FooterItem>
                        ))}
                    </SocialRow>
                </Socials>
            </Footer>
            <Audited
            href="https://drive.google.com/file/d/1Hg8-BIPcVkdS_HNA4j55BYwogAkGKKs8/view"
            rel="noreferrer"
            target="_blank" >
            Audited by Vidma
            <img src={shield} alt="audit" />
            </Audited>
            

        </FooterContainer>
    )
}

const FooterContainer = styled.footer`
  height: 108px;
  background: ${({ theme }) => theme.highlight2};
//   display: flex;
//   justify-content: center;
//   width: 100%;
`;

const Footer = styled.div`
  display: flex;
//   justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10rem;
  width: 100%;
  padding: 0rem 4rem;
`;

const Socials = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    align-content: center;
    // flex-wrap: wrap;
`

const SocialRow = styled.div`
    display: flex;
    justify-content: space-between;
    // width: 50%;
    gap: 4rem;
    flex-wrap: wrap;
`;

const FooterItem = styled.a`
    display: flex;
    gap: 0.5rem;
    align-items: center;
    margin-right: 20px;
    color: #FFFFFF;
    text-decoration: none;
`
const Audited = styled.a`
    display: flex;
    align-items: center;
    font-size: ${({ theme }) => theme.textXXs};
    color: #FFFFFF;
    text-decoration: none;
`
const footerData = [
    { id: 1, link: "https://github.com/xendfinance", icon: Github, title: "Github" },
    { id: 2, link: "https://www.instagram.com/xend.finance/?hl=en", icon: instagram, title: "Instagram" },
    { id: 3, link: "https://t.me/AssetChainBuilders", icon: telegram, title: "Telegram" },
    { id: 4, link: "https://x.com/rwaassetchain", icon: twitter, title: "Twitter" },
    { id: 5, link: "https://www.youtube.com/@AssetChain", icon: youtube, title: "Youtube" },
    { id: 6, link: " https://medium.com/asset-chain", icon: Medium, title: "Medium" },
    { id: 7, link: "https://www.linkedin.com/company/theassetchain", icon: linkedIn, title: "LinkedIn" },
    { id: 8, link: "https://discord.assetchain.org", icon: discord, title: "Discord" },
]