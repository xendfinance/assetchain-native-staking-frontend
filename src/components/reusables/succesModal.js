import styled from "styled-components/macro";
import { useSelector } from "react-redux";
import { Overlay } from "./wishListModal";
import { device } from "../../theme";
import { NotConnectedCardBody } from "../home/homestyles";
import { Back } from "../success/successstyles";
import {
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
  FacebookShareButton,
  FacebookIcon
} from "react-share";

export const SuccessModal = ({ onClick }) => {
  const theme = useSelector(state => state.General.theme);
  return (
    <>
      <Overlay />
      <Container>
        {/* <div> */}
        <Back onClick={onClick}>Back to Home</Back>
        {/* </div> */}
        <NotConnectedCardBody>
          {theme ? (
            <embed
              width="30%"
              src="/assets/waitlistsent/darkwaitlistsent.gif"
              alt="location-icon"
            />
          ) : (
            <embed
              width="30%"
              src="/assets/waitlistsent/lightwaitlistsent.gif"
              alt="location-icon"
            />
          )}
        </NotConnectedCardBody>
        <h3>Thanks, you’re now on the waitlist</h3>
        <p className="mb-0">
          You will be the first to know about our device sales
        </p>

        <p className="mb-0">
          {" "}
          You can share with your friends, simply click on the links below
        </p>
        <SocialsContainer>
          <LinkedinShareButton
            className="Demo__some-network mr-1"
            title={"I just minted Wicrypt NFT devices"}
            summary={"The Wicrypt NFT Devices"}
            url={"https://nft.wicrypt.com/"}
          >
            <LinkedinIcon
              size={32}
              round={true}
              iconFillColor={"#25346A"}
              bgStyle={{ fill: "#d3d3d3" }}
            />
          </LinkedinShareButton>
          <TwitterShareButton
            className="Demo__some-network mr-1"
            title={"I just minted Wicrypt NFT devices"}
            url={"https://nft.wicrypt.com/"}
          >
            <TwitterIcon
              size={32}
              round={true}
              bgStyle={{ fill: "#d3d3d3" }}
              iconFillColor={"#25346A"}
            />
          </TwitterShareButton>

          <FacebookShareButton
            className="Demo__some-network mr-1"
            quote={"I just minted Wicrypt NFT devices, mint yours here"}
            url={"https://nft.wicrypt.com/"}
          >
            <FacebookIcon
              size={32}
              round={true}
              bgStyle={{ fill: "#d3d3d3" }}
              iconFillColor={"#25346A"}
            />
          </FacebookShareButton>
        </SocialsContainer>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.modalContainer};
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.05), 0px 25px 35px rgba(0, 0, 0, 0.03);
  border-radius: 12px;
  position: fixed;
  z-index: 4;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0px 20px;
  padding-bottom: 55px;

  @media (max-width: 1000px) {
    width: 90%;
  }

  h3 {
    font-size: ${({ theme }) => theme.textXs};
    font-weight: ${({ theme }) => theme.textBold};
    margin-top: 68px;
    color: ${({ theme }) => theme.blueHeader};
    text-align: center;
  }

  p {
    font-size: 14px;
    color: ${({ theme }) => theme.labelText};
    margin-top: 28px;
    margin-bottom: 35px;
    text-align: center;
  }

  @media ${device.laptop} {
    padding: 0px 31px;
  }
`;

const SocialsContainer = styled.div`
  padding: 20px;
`;
