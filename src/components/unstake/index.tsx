import React, { useEffect } from "react";
import Modal from "../reusables/modal";
import {
  InstructionBox,
  Instruction,
  ButtonContainer,
  TitleContainer,
  Title,
  CurrentStakeContainer,
  Text,
  Value,
  ErrMsg,
} from "./unstakestyle";
import { ButtonState } from "../reusables/button";
import { clearError, unStakeAvailableToken } from "../../methods/redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../reusables/loader";
import moment from "moment";

// Icons
import unstakeIcon from "../../assets/icons/unstake.svg";

const Unstake = () => {
  const dispatch = useDispatch();
  const { theme} = useSelector((store: any) => store.General);
  const { unstakingToken } = useSelector((store: any) => store.LoaderReducer);
  const { stakingInfo, userStaked, timeLimit,period, stakingPeriod, unstakingFailedMsg    } = useSelector((store: any) => store.StakingReducer);


  useEffect(()=> {
    dispatch(clearError())
  }, [])

  
  let timeBefore =
    (new Date(Number(stakingInfo[2])).getTime() +
      stakingPeriod[Number(stakingInfo[3])]) *
    1000;
  return (
    <Modal
      title={
        <React.Fragment>
          {" "}
          {!theme ? (
            <img
              src={unstakeIcon}
              alt={"un-stake-icon"}
              className={"mr-1"}
            />
          ) : (
            <img
              src={unstakeIcon}
              alt={"un-stake-icon"}
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
        <Title> Are you sure you want to unstake? </Title>
      </TitleContainer>
      <CurrentStakeContainer>
        <Text> Current Unstake Return</Text>
        <Value> {userStaked.toFixed(2)}RWA</Value>
      </CurrentStakeContainer>
      {stakingInfo[3] === "0" ? null : (
        <CurrentStakeContainer>
          <Text> Lock Period</Text>
          <Text> {moment(timeBefore).endOf("day").fromNow()}</Text>
        </CurrentStakeContainer>
      )}

      <div>
        <InstructionBox>
          <Instruction>
            Note: Unstaking before the end of lock duration may lead to loss of
            earned score.
          </Instruction>
        </InstructionBox>
        {unstakingFailedMsg ? (
          <ErrMsg> {unstakingFailedMsg}</ErrMsg>
        ) : (
          <div> </div>
        )}
        {unstakingToken ? (
          <ButtonContainer>
            <div className="col-lg-12 t-center ">
              <ButtonState
                fontSize={"0.8rem"}
                buttonClass="secondary"
                label={<Loader color={"#FEFEFE"} />} 
                padding={""} 
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
                onClick={() =>
                  dispatch(
                    unStakeAvailableToken(
                      stakingInfo[2],
                      timeLimit,
                      period,
                      timeBefore
                    )
                  )
                }
                padding={""} 
              />
            </div>
          </ButtonContainer>
        )}
      </div>
    </Modal>
  );
};

export default Unstake;
