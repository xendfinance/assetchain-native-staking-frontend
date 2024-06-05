import React from 'react'
import styled from "styled-components";


//icons
import infoIcon from "../assets/icons/footerLogo.svg"
import fbk from "../assets/icons/fbk.svg"
import instagram from "../assets/icons/instagram.svg"
import telegram from "../assets/icons/telegram.svg"
import twitter from "../assets/icons/twitter.svg"
import youtube from "../assets/icons/youtube.svg"
import reddit from "../assets/icons/reddit.svg"
import linkedIn from "../assets/icons/linkedIn.svg"
import discord from "../assets/icons/discord.svg"
import shield from "../assets/icons/shield.svg"


export const Footer2 = () => {

    return (
        <FooterContainer>
            <Footer>
                <div>
                    <img src={infoIcon} alt="Xend Finance" />
                    <p id="copy">
                        &copy; {new Date().getFullYear()} Xend Finance.
                    </p>
                </div>

                <Socials>
                    <SocialRow>
                        {footerData.slice(0, 4).map((footer) => (
                            <FooterItem href={footer.link} key={footer.id} rel="noreferrer"
                            target="_blank">
                                <img src={footer.icon} alt={footer.title} />
                                <p>{footer.title}</p>
                            </FooterItem>
                        ))}
                    </SocialRow>
                    <SocialRow>
                        {footerData.slice(4).map((footer) => (
                            <FooterItem href={footer.link} key={footer.id} rel="noreferrer"
                            target="_blank">
                                <img src={footer.icon} alt={footer.title} />
                                <p>{footer.title}</p>
                            </FooterItem>
                        ))}
                    </SocialRow>
                </Socials>
            </Footer>
            <Audited
            href="https://drive.google.com/file/d/1npX5uQXUhMNXec1r3XQIMwOJB_bzFjix/view"
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
    { id: 1, link: "https://web.facebook.com/XendFinance", icon: fbk, title: "Facebook" },
    { id: 2, link: "", icon: instagram, title: "Instagram" },
    { id: 3, link: "https://t.me/xendFinance", icon: telegram, title: "Telegram" },
    { id: 4, link: "https://x.com/xendfinance", icon: twitter, title: "Twitter" },
    { id: 5, link: "https://www.youtube.com/channel/UCcR2lTpYwCws-axra4AAO8Q/featured", icon: youtube, title: "Youtube" },
    { id: 6, link: "https://www.reddit.com/r/XendFinance/", icon: reddit, title: "Reddit" },
    { id: 7, link: "https://www.linkedin.com/company/xend-finance/", icon: linkedIn, title: "LinkedIn" },
    { id: 8, link: "https://discord.com/invite/QGHb7jp2GV", icon: discord, title: "Discord" },
]