import {
  InstructionBox,
  Title,
  Value,
  // Restake,
  Claim,
  InfoContainer,
} from "./stakingstyles.js";
import { getFormDetails, staketogglemodal } from "../../methods/redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { numberWithCommaswithoutdecimals } from "../../methods/helper";

const Rewards = () => {
  const dispatch = useDispatch();
  const { pendingUserRewards } = useSelector((store: any) => store.StakingReducer);
  const { showInfo } = useSelector((store: any) => store.General);


  return (
    <InstructionBox>
      <div className="row">
        <div className="col-lg-5">
          <Title>
            {" "}
            <div>
              {" "}
              <p> CLAIMABLE REWARDS</p>{" "}
            </div>
            <div>
              <i
                onClick={() =>
                  dispatch(
                    getFormDetails({
                      props: ["showInfo"],
                      value: !showInfo,
                    })
                  )
                }
                className={
                  showInfo
                    ? "fa fa-info-circle active"
                    : "fa fa-info-circle inactive"
                }
              />
            </div>
            {showInfo ? (
              <InfoContainer>
                {" "}
                You will start earning rewards after the first week of staking
              </InfoContainer>
            ) : null}
          </Title>
          <Value>
            {" "}
            {numberWithCommaswithoutdecimals(pendingUserRewards)} WNT
          </Value>
        </div>
        <div className="col-lg-1"></div>
        {pendingUserRewards ? (
          <>
            {/* <div
              onClick={() => {
                dispatch(staketogglemodal(6));
                dispatch(
                  getFormDetails({
                    props: ["amttoStake"],
                    value: pendingUserRewards.toFixed(2)
                  })
                );
              }}
              className="col-lg-3"
            >
              <Restake>Restake</Restake>
            </div> */}
            <div className={"col-lg-3"}></div>
            <div
              className="col-lg-3"
              onClick={() => dispatch(staketogglemodal(5))}
            >
              <Claim> Claim </Claim>
            </div>{" "}
          </>
        ) : (
          <div />
        )}
      </div>
    </InstructionBox>
  );
};

export default Rewards;
