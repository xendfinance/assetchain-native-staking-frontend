import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../reusables/modal";
import { ButtonContainer, CenterContainer, Msg, Title } from "./statusstyle";
import { ButtonState } from "../reusables/button";
import { claimUserRewards } from "../../methods/redux/actions";
import Loader from "../reusables/loader";
import { numberWithCommaswithoutdecimals } from "../../methods/helper";
import claimIcon from "../../assets/icons/claim.svg";

const Claim = () => {
  const dispatch = useDispatch();
  const { claimingRewards } = useSelector((store: any) => store.LoaderReducer);
  const { tokenAddress} = useSelector((store: any) => store.General);
  const { pendingUserRewards } = useSelector((store: any) => store.StakingReducer);


  return (
    <Modal visible={true} width={"30%"} title={" "}>
      <div>
        <CenterContainer>
          <img src={claimIcon} alt="success" />
        </CenterContainer>
        <CenterContainer>
          <Title>
            {" "}
            You are claiming{" "}
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
                label={<Loader color={"#E5B910"} />}
                padding=""
                onClick={()=> {}}
              />
            ) : (
              <ButtonState
                fontSize={"0.8rem"}
                buttonClass={"secondary"}
                label={"Claim WNT now"}
                onClick={() => dispatch(claimUserRewards(tokenAddress))}
                padding=""
              />
            )}
          </div>
        </ButtonContainer>
      </div>
    </Modal>
  );
};

export default Claim;
