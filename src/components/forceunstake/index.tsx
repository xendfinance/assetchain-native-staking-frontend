import React from "react";
import Modal from "../reusables/modal";
import {
  InstructionBox,
  Instruction,
  ButtonContainer,
  TitleContainer,
  Title,
  CurrentStakeContainer,
  Value,
  Text,
} from "./style";
import { ButtonState } from "../reusables/button";
import { forceUnlock } from "../../methods/redux/actions";
import { numberWithCommaswithoutdecimals } from "../../methods/helper";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../reusables/loader";

const ForceUnstake = () => {
  const dispatch = useDispatch();
  const { tokenAddress, theme} = useSelector((store: any) => store.General);
  const { unstakingToken} = useSelector((store: any) => store.LoaderReducer);
  const {  ids, stakingInfo, stakingPeriod, userStaked  } = useSelector((store: any) => store.StakingReducer);

  let timeBefore =
    (new Date(Number(stakingInfo[2])).getTime() +
      stakingPeriod[Number(stakingInfo[3])]) *
    1000;

  let offset = timeBefore - new Date().getTime();
  let estimatedAmt =
    userStaked - (0.01 * userStaked * (offset / 1000)) / stakingInfo[2];

  return (
    <Modal
      title={
        <React.Fragment>
          {" "}
          {!theme ? (
            <img
              src="/assets/unstakelightthemeicon.svg"
              alt={"stake-icon"}
              className={"mr-1"}
            />
          ) : (
            <img
              src="/assets/unstakedarkthemeicon.svg"
              alt={"stake-icon"}
              className={"mr-1"}
            />
          )}{" "}
          UnStake
        </React.Fragment>
      }
      visible={true}
      width={"30%"}
    >
      <TitleContainer>
        <Title> Are you sure you want to force unstake? </Title>
      </TitleContainer>

      <CurrentStakeContainer>
        <Text> Estimated Return</Text>
        <Value> {numberWithCommaswithoutdecimals(estimatedAmt)}WNT</Value>
      </CurrentStakeContainer>

      <div>
        <InstructionBox>
          <Instruction>
            You may lose up to 1% of your staked fund when you force unstake. By
            proceeding with this action your are confirming sole responsibility
            for this.
          </Instruction>
        </InstructionBox>

        {unstakingToken ? (
          <ButtonContainer>
            <div className="col-lg-12 t-center ">
              <ButtonState
                fontSize={"0.8rem"}
                buttonClass="secondary"
                label={<Loader color={"#FEFEFE"} />}
                padding=""
                onClick={()=> {}}
              />
            </div>
          </ButtonContainer>
        ) : (
          <ButtonContainer>
            <div className="col-lg-12 t-center ">
              <ButtonState
                fontSize={"0.8rem"}
                buttonClass="secondary"
                label={"Unstake"}
                onClick={() => dispatch(forceUnlock(ids.at(-1), tokenAddress))}
                padding=""
              />
            </div>
          </ButtonContainer>
        )}
      </div>
    </Modal>
  );
};

export default ForceUnstake;
