import SmallModal from "../reusables/smallModal";
import { InfoMsg, InfoTitle } from "./stakestyle";
import { ButtonState } from "../reusables/button";
import { useSelector, useDispatch } from "react-redux";
import { getFormDetails } from "../../methods/redux/actions";

// icons
import infoIcon from "../../assets/icons/alert.svg"

const Info = () => {
  const { theme} = useSelector((store: any) => store.General);
  const dispatch = useDispatch();

  return (
    <SmallModal theme={theme}>
      <div>
        <div className="t-center mb-3">
          <img src={infoIcon} alt="info-icon" />
        </div>

        <div>
          {" "}
          <InfoTitle> Flexible Staking</InfoTitle>
          <InfoMsg>
            {" "}
            Flexible Staking allows you to stake any amount of RWA and redeem your 
            reward after a 7days period of staking. And also top-up your RWA staking.

          </InfoMsg>
        </div>
        <div>
          <InfoTitle> Fixed Staking</InfoTitle>
          <InfoMsg>
            Fixed saving allows you to lock up your RWA Token for a set period of time i.e 1 month, 2 Months, 
            e.t.c and redeem your XEND reward in a 7day period. Note: you can't top up Fixed staking, to restake, 
            claim your RWA reward after 7days of staking and Stake with a different wallet.
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
                    props: ["infoModal"],
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

export default Info;
