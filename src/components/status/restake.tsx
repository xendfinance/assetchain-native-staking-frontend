import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../reusables/modal";
import { ButtonContainer, CenterContainer, Msg, Title } from "./statusstyle";
import { ButtonState } from "../reusables/button";
import { reStake } from "../../methods/redux/actions";
import Loader from "../reusables/loader";
import { numberWithCommaswithoutdecimals } from "../../methods/helper";

const Restake = () => {
  const dispatch = useDispatch();
  const { tokenAddress } = useSelector((store: any) => store.General);
  const { pendingUserRewards } = useSelector((store: any) => store.StakingReducer);
  const { claimingRewards } = useSelector((store: any) => store.LoaderReducer);



  return (
    <Modal visible={true} width={"30%"} title={" "}>
      <div>
        <CenterContainer>
          <img src="/assets/claimicon.svg" alt="success" />
        </CenterContainer>
        <CenterContainer>
          <Title>
            {" "}
            You are restaking{" "}
            {numberWithCommaswithoutdecimals(pendingUserRewards)} WNT
          </Title>{" "}
          <Msg>
            You will not be able to claim rewards within 24 hours if you do
            this.
          </Msg>
        </CenterContainer>
        <ButtonContainer>
          <div className="col-lg-12 t-center ">
            {claimingRewards ? (
              <ButtonState
                fontSize={"0.8rem"}
                buttonClass={"secondary"}
                label={<Loader color={"#FEFEFE"} />}
                padding={""}  
                onClick={()=> {}}
              />
            ) : (
              <ButtonState
                fontSize={"0.8rem"}
                buttonClass={"secondary"}
                label={"Restake WNT now"}
                padding={""}  
                onClick={() => dispatch(reStake(tokenAddress))}
              />
            )}
          </div>
        </ButtonContainer>
      </div>
    </Modal>
  );
};

export default Restake;
