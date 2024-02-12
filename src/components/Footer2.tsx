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
                            <FooterItem key={footer.id}>
                                <img src={footer.icon} alt={footer.title} />
                                <p>{footer.title}</p>
                            </FooterItem>
                        ))}
                    </SocialRow>
                    <SocialRow>
                        {footerData.slice(4).map((footer) => (
                            <FooterItem key={footer.id}>
                                <img src={footer.icon} alt={footer.title} />
                                <p>{footer.title}</p>
                            </FooterItem>
                        ))}
                    </SocialRow>
                </Socials>
            </Footer>

        </FooterContainer>
    )
}

const FooterContainer = styled.footer`
  height: 108px;
  background: ${({ theme }) => theme.highlight2};
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const Socials = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

const SocialRow = styled.div`
    display: flex;
    justify-content: space-between;
    width: 50%;
    gap: 1rem;
`;

const FooterItem = styled.div`
    display: flex;
    gap: 0.5rem;
    align-items: center;
    margin-right: 20px;
`

const footerData = [
    { id: 1, link: "", icon: fbk, title: "Facebook" },
    { id: 2, link: "", icon: instagram, title: "Instagram" },
    { id: 3, link: "", icon: telegram, title: "Telegram" },
    { id: 4, link: "", icon: twitter, title: "Twitter" },
    { id: 5, link: "", icon: youtube, title: "Youtube" },
    { id: 6, link: "", icon: reddit, title: "Reddit" },
    { id: 7, link: "", icon: linkedIn, title: "LinkedIn" },
    { id: 8, link: "", icon: discord, title: "Discord" },
]