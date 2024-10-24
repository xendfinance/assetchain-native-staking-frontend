import React from 'react'
import styled from "styled-components";


//icons
import infoIcon from "../assets/icons/logo-dark.svg"
// import fbk from "../assets/icons/fbk.svg"
// import instagram from "../assets/icons/instagram.svg"
import telegram from "../assets/icons/telegram.svg"
import twitter from "../assets/icons/twitter.svg"
import youtube from "../assets/icons/youtube.svg"
// import reddit from "../assets/icons/reddit.svg"
import linkedIn from "../assets/icons/linkedin.svg"
import discord from "../assets/icons/discord.svg"
// import shield from "../assets/icons/shield.svg"
import Github from "../assets/icons/github.svg"
import Medium from "../assets/icons/medium.png"
import vidma from "../assets/icons/vidma.png"


export const Footer2 = () => {
    const firstRow = footerData.slice(0, 4);
    const secondRow = footerData.slice(4);
    return (
        // <FooterContainer>
        //     <Footer>
        //         <div>
        //             <img src={infoIcon} alt="Asset Chain" />
        //             <p id="copy">
        //                 &copy; {new Date().getFullYear()} Asset Chain.
        //             </p>
        //         </div>

        //         <Socials>
        //             <SocialRow>
        //                 {footerData.slice(0, 4).map((footer) => (
        //                     <FooterItem href={footer.link} key={footer.id} rel="noreferrer"
        //                     target="_blank">
        //                         <img src={footer.icon} alt={footer.title} width="25px" />
        //                         <p>{footer.title}</p>
        //                     </FooterItem>
        //                 ))}
        //             </SocialRow>
        //             <SocialRow>
        //                 {footerData.slice(4).map((footer) => (
        //                     <FooterItem href={footer.link} key={footer.id} rel="noreferrer"
        //                     target="_blank">
        //                         <img src={footer.icon} alt={footer.title} width="25px" />
        //                         <p>{footer.title}</p>
        //                     </FooterItem>
        //                 ))}
        //             </SocialRow>
        //         </Socials>
        //     </Footer>
        //     {/* <Audited
        //     href="https://drive.google.com/file/d/1Hg8-BIPcVkdS_HNA4j55BYwogAkGKKs8/view"
        //     rel="noreferrer"
        //     target="_blank" >
        //     Audited by Vidma
        //     <img src={shield} alt="audit" />
        //     </Audited> */}
            

        // </FooterContainer>
        <FooterContainer>
            <FooterContent>
                {/* Logo and Copyright Section */}
                <LogoSection>
                    <LogoImage src={infoIcon} alt="Asset Chain" />
                    <Copyright>
                        &copy; {new Date().getFullYear()} Asset Chain.
                    </Copyright>
                </LogoSection>

                {/* Social Links Section */}
                <SocialsContainer>
                    <SocialRow>
                        {firstRow.map((item) => (
                            <FooterItem 
                                href={item.link} 
                                key={item.id} 
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img src={item.icon} alt={item.title} />
                                <span>{item.title}</span>
                            </FooterItem>
                        ))}
                    </SocialRow>
                    <SocialRow>
                        {secondRow.map((item) => (
                            <FooterItem 
                                href={item.link} 
                                key={item.id} 
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img src={item.icon} alt={item.title} />
                                <span>{item.title}</span>
                            </FooterItem>
                        ))}
                    </SocialRow>
                </SocialsContainer>
            </FooterContent>
        </FooterContainer>
    )
}

// const FooterContainer = styled.footer`
//   height: 108px;
//   background: ${({ theme }) => theme.highlight2};
// //   display: flex;
// //   justify-content: center;
// //   width: 100%;
// `;

// const Footer = styled.div`
//   display: flex;
// //   justify-content: space-between;
//   align-items: center;
//   flex-wrap: wrap;
//   gap: 10rem;
//   width: 100%;
//   padding: 0rem 4rem;
// `;

// const Socials = styled.div`
//     display: flex;
//     flex-direction: column;
//     gap: 1rem;
//     justify-content: center;
//     align-content: center;
//     // flex-wrap: wrap;
// `

// const SocialRow = styled.div`
//     display: flex;
//     justify-content: space-between;
//     // width: 50%;
//     gap: 4rem;
//     flex-wrap: wrap;
// `;

// const FooterItem = styled.a`
//     display: flex;
//     gap: 0.5rem;
//     align-items: center;
//     margin-right: 20px;
//     color: #FFFFFF;
//     text-decoration: none;
// `
// const Audited = styled.a`
//     display: flex;
//     align-items: center;
//     font-size: ${({ theme }) => theme.textXXs};
//     color: #FFFFFF;
//     text-decoration: none;
// `

const FooterContainer = styled.footer`
    background: ${({ theme }) => theme.highlight2};
    width: 100%;
    padding: 1.5rem 1rem;

    @media (min-width: 768px) {
        padding: 2rem;
    }
`;

const FooterContent = styled.div`
    max-width: 1280px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;

    @media (min-width: 1024px) {
        flex-direction: row;
        align-items: flex-start;
        justify-content: space-between;
        gap: 4rem;
    }
`;

const LogoSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
`;

const LogoImage = styled.img`
    height: 2rem;
    width: auto;
`;

const Copyright = styled.p`
    color: #FFFFFF;
    font-size: 0.875rem;
    white-space: nowrap;
    text-align: center;
`;

const SocialsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;

    @media (min-width: 1024px) {
        width: auto;
    }
`;

const SocialRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.5rem;

    @media (min-width: 1024px) {
        justify-content: flex-end;
    }
`;

const FooterItem = styled.a`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #FFFFFF;
    text-decoration: none;
    min-width: 120px;
    transition: opacity 0.2s ease;

    @media (min-width: 640px) {
        min-width: unset;
    }

    &:hover {
        opacity: 0.8;
    }

    img {
        width: 1.25rem;
        height: 1.25rem;
    }

    span {
        font-size: 0.875rem;
        white-space: nowrap;
    }
`;
const footerData = [
    { id: 1, link: "https://github.com/xendfinance", icon: Github, title: "Github" },
    // { id: 2, link: "https://www.instagram.com/xend.finance/?hl=en", icon: instagram, title: "Instagram" },
    { id: 2, link: "https://t.me/AssetChainBuilders", icon: telegram, title: "Telegram" },
    { id: 3, link: "https://x.com/rwaassetchain", icon: twitter, title: "Twitter" },
    { id: 4, link: "https://www.youtube.com/@AssetChain", icon: youtube, title: "Youtube" },
    { id: 5, link: " https://medium.com/asset-chain", icon: Medium, title: "Medium" },
    { id: 6, link: "https://www.linkedin.com/company/theassetchain", icon: linkedIn, title: "LinkedIn" },
    { id: 7, link: "https://discord.assetchain.org", icon: discord, title: "Discord" },
    { id: 8, link: "https://drive.google.com/file/d/1Hg8-BIPcVkdS_HNA4j55BYwogAkGKKs8/view", icon: vidma, title: "Audited by Vidma"}
]