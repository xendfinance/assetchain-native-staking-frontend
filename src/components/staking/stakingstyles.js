import styled from "styled-components";
import { device } from "../../styles/theme";

export const StakingTitle = styled.p`
  text-align: center;
  font-size: ${({ theme }) => theme.textSmd};
  font-weight: 700;
  color: ${({ theme }) => theme.textColor};
  line-height: 143%;
  margin-bottom: 50px;
`;

export const StakingContainer = styled.div`
  padding: 20px;
`;
export const CardContainer = styled.div`
  padding: 20px;
  background: ${({ theme }) => theme.highlight3};
  box-shadow: 0px 14px 40px rgba(0, 0, 0, 0.1);
  border-radius: 8.17112px;
  position: relative;
  margin-bottom: 10px;
`;
export const LongCardContainer = styled.div`
  padding: 20px;
  background: ${({ theme }) => theme.highlight2};
  border-radius: 8.17112px;
  position: relative;
  margin-bottom: 10px;
  margin-top: 10px;
`;
export const DescriptionContainer = styled.div`
  display: block;

  @media ${device.laptop} {
    display: flex;
    justify-content: space-between;
  }
`;
export const ViewOption = styled.p`
  font-size: ${({ theme }) => theme.textXXs};
  font-weight: ${({ theme }) => theme.textBold};
  color: ${({ theme }) => theme.highlight};
  cursor: pointer;
`;
export const CardTitle = styled.p`
  font-size: ${({ theme }) => theme.textXs};
  font-weight: ${({ theme }) => theme.textBold};
  color: ${({ theme }) => theme.grey2};
`;
export const Description = styled.div`
  color: ${({ theme }) => theme.grey2};
  font-weight: ${({ theme }) => theme.textBold};
  font-size: ${({ theme }) => theme.textXXs};
`;
export const DescriptionValue = styled.p`
  color: ${({ theme }) => theme.textColor};
  font-size: ${({ theme }) => theme.textXXs};
  font-weight: ${({ theme }) => theme.textBold};
`;

export const ValueDetail = styled.p`
  color: ${({ theme }) => theme.textColor};
  font-size: ${({ theme }) => theme.textXs};
  font-weight: ${({ theme }) => theme.textBold};
  @media ${device.laptop} {
    font-size: ${({ theme }) => theme.textXs};
  }
`;

export const DescriptionSubValue = styled.span`
  color: ${({ theme }) => theme.grey2};
  font-size: ${({ theme }) => theme.textXXs};
`;

export const WalletAddress = styled.div`
  background: ${({ theme }) => theme.walletbox};
  color: ${({ theme }) => theme.grey2};
  font-size: 0.6rem;
  padding: 7px;
  border-radius: 18.1224px;
  margin-bottom: 10px;
  width: 35%;
  text-align: center;
  @media ${device.laptop} {
    width: 80%;
  }
`;
export const Badge = styled.div`
  padding: 5px;
  background: ${({ theme }) => theme.highlight};
  border-radius: 0px 0px 4.95238px 4.95238px;
  position: absolute;
  top: 0;
  right: 4%;
`;
export const StakingDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const InstructionBox = styled.div`
  padding: 20px;
  background: ${({ theme }) => theme.walletbox};
  border-radius: 4px;
  margin-top: 10px;
  margin-bottom: 20px;
`;

export const Title = styled.div`
  margin-bottom: 0;
  color: ${({ theme }) => theme.flexiblegrey};
  font-size: ${({ theme }) => theme.textXXs};
  font-weight: ${({ theme }) => theme.textBold};
  display: inline-flex;
  position: relative;
  p {
    margin-bottom: 0px;
  }
`;

export const Value = styled.p`
  margin-bottom: 0;
  color: ${({ theme }) => theme.highlight};
  font-size: ${({ theme }) => theme.textXs};
  font-weight: ${({ theme }) => theme.textBold};
`;

export const NextClaim = styled.p`
  margin-bottom: 0;
  color: ${({ theme }) => theme.yellow};
  font-size: ${({ theme }) => theme.textXs};
  font-weight: ${({ theme }) => theme.textBold};
`;

export const Restake = styled.div`
  font-size: ${({ theme }) => theme.textXXs};
  color: ${({ theme }) => theme.highlight};
  border: ${({ theme }) => `1px solid ${theme.highlight}`};
  text-align: center;
  border-radius: 13.3467px;
  padding: 5px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 10px;
  @media ${device.laptop} {
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;

export const Claim = styled.div`
  font-size: ${({ theme }) => theme.textXXs};
  color: ${({ theme }) => theme.white};
  background-color: ${({ theme }) => theme.highlight};
  border: ${({ theme }) => `1px solid ${theme.highlight}`};
  text-align: center;
  border-radius: 13.3467px;
  padding: 5px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 10px;
  @media ${device.laptop} {
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;

export const InfoContainer = styled.div`
  position: absolute;

  top: 60%;
  border-radius: 5px;
  box-shadow: 0 10px 20px #0000002f;
  padding: 10px;
  background-color: ${({ theme }) => theme.cardcolor};
`;
export const InfoMsg = styled.p`
  margin-bottom: 0;
  font-size: ${({ theme }) => theme.textXXs};
  color: ${({ theme }) => theme.flexiblegrey};
  margin-right: 50;
  margin-bottom: 20px;
`;
export const InfoTitle = styled.p`
  margin-bottom: 0;
  font-size: ${({ theme }) => theme.textXs};
  color: ${({ theme }) => theme.modalText};
  margin-right: 50;
  margin-bottom: 10px;
  font-weight: 500;
`;

export const HideContainer = styled.div`
  display: flex;
  align-content: center;
  p {
    margin-left: 10px;
    font-weight: 600;
  }
`;

export const CarouselContainer = styled.div`
  display: flex;
  flex-wrap: noWrap;
  overflow: hidden;
  //margin: 0px 20px 30px; 20px;
`;
export const CarouselItem = styled.a`
  min-width: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 1s cubic-bezier(0.39, 0.575, 0.565, 1);
  transform: ${(props) => `translate(-${props.currentIndex * 100}%)`};
  @media ${device.laptop} {
    min-width: 50%;
    width: 50%;
    transform: none;
  }
`;
