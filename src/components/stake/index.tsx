import React from "react";
import Modal from "../reusables/modal";
import {
  OptionButton,
  SubTitle,
  AmountBox,
  FlexContainer,
  WalletDetailContainer,
  Value,
  StakeAmount,
  ButtonContainer,
  TermaandConditions,
  RadioButton,
  Symbol,
  ErrMsg,
  InfoIcons,
} from "./stakestyle";
import { ButtonState } from "../reusables/button";
import {
  getFormDetails,
  stakeUserToken,
  toggletermsandconditions,
} from "../../methods/redux/actions";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../reusables/loader";
import { numberWithCommaswithoutdecimals } from "../../methods/helper";
import Info from "./info";

// Icons
import stakeIcon from "../../assets/icons/stake.svg";
import infoIcon from "../../assets/icons/info.svg";
import tokenIcon from "../../assets/icons/tokenIcon.svg";

const Stake = () => {
  const dispatch = useDispatch();
  const { stakeType, termsandconditions, amttoStake, theme, availableBalance, tokenAddress, infoModal} = useSelector((store: any) => store.General);
  const { rewards, stakingFailedMsg, stakingInfo, timeLimit } = useSelector((store: any) => store.StakingReducer);
  const { stakingToken } = useSelector((store: any) => store.LoaderReducer);

  return (
    <React.Fragment>
      {infoModal ?  <Info /> : 
      <Modal
        title={
          <React.Fragment>
            {" "}
            <img
              src={stakeIcon}
              alt={"stake-icon"}
              className={"mr-1"}
            />
            Stake
          </React.Fragment>
        }
        visible={true}
        width={"30%"}
      >
        <div>
          <div>
            <SubTitle> Type</SubTitle>
            <div className="row">
              <div
                className="col-lg-4"
                onClick={() =>
                  dispatch(
                    getFormDetails({
                      props: ["stakeType"],
                      value: 0,
                    })
                  )
                }
              >
                <OptionButton active={stakeType === 0}> Flexible</OptionButton>
              </div>
              <div
                onClick={() =>
                  dispatch(
                    getFormDetails({
                      props: ["stakeType"],
                      value: 1,
                    })
                  )
                }
                className="col-lg-4"
              >
                <OptionButton active={stakeType != 0}> Locked</OptionButton>
              </div>
              <InfoIcons
                className="col-lg-4"
                onClick={() =>
                  dispatch(
                    getFormDetails({
                      props: ["infoModal"],
                      value: true,
                    })
                  )
                }
              >
                <img src={infoIcon} alt="info" />
              </InfoIcons>
            </div>
          </div>
          {stakeType != 0 ? (
            <div>
              <SubTitle> Duration</SubTitle>
              <div className="row">
                <div className="col-lg-4">
                  <OptionButton
                    onClick={() =>
                      dispatch(
                        getFormDetails({
                          props: ["stakeType"],
                          value: 1,
                        })
                      )
                    }
                    active={stakeType === 1}
                  >
                    {" "}
                    3 Months
                  </OptionButton>
                </div>
                <div className="col-lg-4">
                  <OptionButton
                    onClick={() =>
                      dispatch(
                        getFormDetails({
                          props: ["stakeType"],
                          value: 2,
                        })
                      )
                    }
                    active={stakeType === 2}
                  >
                    {" "}
                    6 Months
                  </OptionButton>
                </div>
                <div className="col-lg-4"></div>

                <div className="col-lg-4">
                  <OptionButton
                    onClick={() =>
                      dispatch(
                        getFormDetails({
                          props: ["stakeType"],
                          value: 3,
                        })
                      )
                    }
                    active={stakeType === 3}
                  >
                    {" "}
                    9 Months
                  </OptionButton>
                </div>
                <div className="col-lg-4">
                  <OptionButton
                    onClick={() =>
                      dispatch(
                        getFormDetails({
                          props: ["stakeType"],
                          value: 4,
                        })
                      )
                    }
                    active={stakeType === 4}
                  >
                    {" "}
                    12 Months
                  </OptionButton>
                </div>
              </div>
            </div>
          ) : (
            <div />
          )}
          <div className="row">
            <div className="col-lg-12">
              <AmountBox>
                <FlexContainer>
                  <SubTitle> AMOUNT</SubTitle>
                  <SubTitle>
                    {" "}
                    AVAILABLE:{" "}
                    {numberWithCommaswithoutdecimals(availableBalance)} RWA
                  </SubTitle>
                </FlexContainer>
                <div className="row">
                  <div className="col-lg-7">
                    <StakeAmount
                      onChange={(e) =>
                        dispatch(
                          getFormDetails({
                            props: ["amttoStake"],
                            value: e.target.value,
                          })
                        )
                      }
                      value={amttoStake}
                      placeholder={0}
                    />
                  </div>

                  <div className="col-lg-4">
                    <WalletDetailContainer>
                      <OptionButton
                        onClick={() =>
                          dispatch(
                            getFormDetails({
                              props: ["amttoStake"],
                              value:
                                availableBalance > 0.01
                                  ? availableBalance - 0.01
                                  : 0,
                            })
                          )
                        }
                      >
                        {" "}
                        MAX
                      </OptionButton>

                      <img height="30px" src={tokenIcon} alt="icon" />
                      <Symbol> RWA</Symbol>
                    </WalletDetailContainer>
                  </div>
                </div>
              </AmountBox>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <FlexContainer>
                <SubTitle> Best Deal Reward (APR)</SubTitle>
                <Value> {rewards}% APR</Value>
              </FlexContainer>
            </div>
            <div className="col-lg-12">
              <FlexContainer>
                <SubTitle> Estimated Interest</SubTitle>
                <Value>
                  {" "}
                  {numberWithCommaswithoutdecimals(
                    (rewards * amttoStake) / 100
                  )}
                  RWA
                </Value>
              </FlexContainer>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <TermaandConditions>
                <RadioButton
                  onChange={() =>
                    dispatch(toggletermsandconditions(!termsandconditions))
                  }
                  type="checkbox"
                  checked={termsandconditions}
                />
                I have read and I agree to the above stated statement
              </TermaandConditions>
            </div>
          </div>
          {stakingFailedMsg ? (
            <ErrMsg> {stakingFailedMsg}</ErrMsg>
          ) : (
            <div> </div>
          )}
          <ButtonContainer>
            <div className="col-lg-12 t-center ">
              {stakingToken ? (
                <ButtonState
                  fontSize={"0.8rem"}
                  buttonClass={"secondary"}
                  label={<Loader color={"#fefefe"} />} 
                  padding={""} 
                  onClick={()=> {}}                
                />
              ) : (
                <ButtonState
                  fontSize={"0.8rem"}
                  buttonClass={"secondary"}
                  label={"Stake"}
                  padding={""}
                  onClick={() =>
                    dispatch(
                      stakeUserToken(
                        amttoStake,
                        stakeType,
                        tokenAddress,
                        termsandconditions,
                        availableBalance,
                        stakingInfo[3]
                      )
                    )
                  }
                />
              )}
            </div>
          </ButtonContainer>
        </div>
      </Modal>}
    </React.Fragment>
  );
};

export default Stake;
