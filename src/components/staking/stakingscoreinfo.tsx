import SmallModal from "../reusables/smallModal";
import { InfoMsg, InfoTitle } from "./stakingstyles";
import { ButtonState } from "../reusables/button";
import { useSelector, useDispatch } from "react-redux";
import { getFormDetails } from "../../methods/redux/actions";

const StakingScoreInfo = () => {
  const { theme } = useSelector((store: any) => store.General);
  const dispatch = useDispatch();

  return (
    <SmallModal theme={theme}>
      <div>
        <div className="t-center mb-3">
          <img src="/icons/info.svg" alt="info-icon" />
        </div>

        <div>
          {" "}
          <InfoTitle> Staking Score</InfoTitle>
          <InfoMsg>
            {" "}
            The staking score is determined by the average amount of tokens held during the last 12 months. 
            The higher the staked lockup period, the higher the staking score. 
            The higher the staking score, the greater the Asset Chain ecosystem activities, rewards, and discounts the user can access. 
            A higher staking score means increased voting power in governance, up-voting asset validators/authenticators, and discounts in the asset tokenization process. 
            It also improves the chances for ecosystem airdrops, among many other benefits.


          </InfoMsg>
        </div>
        <div>
          <div className="t-center">
            <ButtonState
              fontSize={"0.8rem"}
              buttonClass={"secondary"}
              label={"Close"}
              padding=""
              onClick={() =>
                dispatch(
                  getFormDetails({
                    props: ["stakingpoints"],
                    value: false,
                  })
                )
              }
            />
          </div>
        </div>
      </div>
    </SmallModal>
  );
};

export default StakingScoreInfo;
