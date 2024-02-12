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
          {!theme ? (
            <img src="/assets/lightInfo.svg" alt="info-icon" />
          ) : (
            <img src="/assets/darkinfo.svg" alt="info-icon" />
          )}
        </div>

        <div>
          {" "}
          <InfoTitle> Staking Score</InfoTitle>
          <InfoMsg>
            {" "}
            Staking score is determined by the average amount of tokens held
            during the last 12 months. The higher the staked lockup period, the
            higher the staking score. The higher the staking score, the higher
            the rewards earned during staking. Higher staking scores also leads
            to higher number of $WNT which can be mined from the Hotspot Hub.
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
