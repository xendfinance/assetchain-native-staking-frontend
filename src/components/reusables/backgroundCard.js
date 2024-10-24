import { useEffect } from "react";
import styled from "styled-components";
// import { getEstimatedRewards } from "../methods/actions";
import { useDispatch, useSelector } from "react-redux";
import rewards from "../assets/icons/rewards.svg"

export const BackgroundCard = ({ label, error, errorText, ...rest }) => {
  let dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getEstimatedRewards());
  // }, []);

  // const rewards = useSelector((state) => state.StakingReducer.rewards);
  // const theme = useSelector((state) => state.General.theme);


  return (
    <CardContainer>
      <Title> Estimated Rewards</Title>
      <Value>
        {" "}
        {10}% <Currency> APR</Currency>
      </Value>
      <SubValue> </SubValue>
      <Badge>
        <img src={rewards} height="20" alt="scale" />
      </Badge>
      {/* <BackgroundImage height="100" src="./assets/rewardsbkg.svg" alt="bkg" /> */}
    </CardContainer>
  );
};

const CardContainer = styled.div`
  padding: 20px;
  background: ${({ theme }) => theme.highlight};
  box-shadow: 0px 0px 8.17112px rgba(45, 58, 58, 0.02);
  border-radius: 8.17112px;
  position: relative;
  margin-bottom: 10px;
  margin-top: 10px;
  min-height: 150px;
`;
const Title = styled.p`
  color: ${({ theme }) => theme.white};
  font-size: ${({ theme }) => theme.textXs};
  margin-bottom: 10px;
  font-weight: ${({ theme }) => theme.textBold};
`;
const Value = styled.p`
  color: ${({ theme }) => theme.white};
  font-size: ${({ theme }) => theme.textMd};
  font-weight: ${({ theme }) => theme.textBold};
  margin-bottom: 0px;
`;
const Currency = styled.span`
  font-size: ${({ theme }) => theme.textXXs};
`;
const SubValue = styled.span`
  color: ${({ theme }) => theme.grey2};
  font-size: ${({ theme }) => theme.textXXs};
`;
const Badge = styled.div`
  padding: 5px;
  background: #fefefe;
  border-radius: 0px 0px 4.95238px 4.95238px;
  position: absolute;
  top: 0;
  right: 10%;
`;
const BackgroundImage = styled.img`
  position: absolute;
  right: 10%;
  top: 30%;
`;
