import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconCard } from "../reusables/iconCard";
import StakingBalance from "./stakingbalance";
import { StakingTitle, StakingContainer } from "./stakingstyles.js";
import { BackgroundCard } from "../reusables/backgroundCard";
import Stake from "../stake";
import Unstake from "../unstake";
import Success from "../status/success";
import Failed from "../status/failed";
import Claim from "../status/claim";
import Restake from "../status/restake";
import { getStakingScore, getAllStaked } from "../methods/actions";
import { numberWithCommaswithoutdecimals } from "./../methods/helper";
import StakingScoreInfo from "./stakingscoreinfo";
import ForceUnstake from "../forceunstake";
// import AnnouncementSection from "./announcements";

const Home = () => {
  const stakeModal = useSelector((state) => state.General.stakeModal);
  const stakedStatus = useSelector(
    (state) => state.StakingReducer.stakedStatus
  );
  const allStaked = useSelector((state) => state.StakingReducer.allStaked);
  const usdQuote = useSelector((state) => state.MarketReducer.usdQuote);
  const stakingScore = useSelector((state) => state.MarketReducer.stakingScore);
  const ownerAddress = useSelector(
    (state) => state.ConnectWalletReducer.address
  );
  const stakingpoints = useSelector((state) => state.General.stakingpoints);

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllStaked());
    {
      ownerAddress ? dispatch(getStakingScore(ownerAddress)) : console.log("");
    }
  }, [ownerAddress]);

  return (
    <StakingContainer className="container">
      {stakingpoints ? <StakingScoreInfo /> : null}
      <StakingTitle> Wicrypt Staking Dashboard</StakingTitle>
      <div className="row">
        <div className="col-sm-12 col-lg-5">
          <StakingBalance />
        </div>
        <div className="col-lg-7">
          <div className="row">
            <div className="col-lg-6 col-xs-6 col-sm-6">
              <IconCard
                label={"Total Staked"}
                currency={"WNT"}
                icon={"./assets/scale.svg"}
                value={numberWithCommaswithoutdecimals(allStaked)}
                subvalue={
                  "$" + numberWithCommaswithoutdecimals(usdQuote * allStaked)
                }
                info={false}
              />
            </div>
            <div className="col-lg-6 col-xs-6  col-sm-6">
              <BackgroundCard />
            </div>
            <div className="col-lg-6 col-xs-6 col-sm-6">
              <IconCard
                label={"Staking Score"}
                currency={""}
                icon={"./assets/points.svg"}
                value={numberWithCommaswithoutdecimals(stakingScore)}
                info={true}
              />
            </div>
            <div className="col-lg-6 col-xs-6 col-sm-6">
              <IconCard
                label={"WNT Price"}
                currency={""}
                icon={"./assets/chart-pie.svg"}
                value={"$" + usdQuote}
                info={false}
              />
            </div>
          </div>
        </div>
      </div>
      {/* <div className="row">
        <div className="col-lg-12">
          <AnnouncementSection />
        </div>
      </div> */}

      {stakeModal === 1 ? (
        <Stake />
      ) : stakeModal === 2 ? (
        <Unstake />
      ) : stakeModal === 5 ? (
        <Claim />
      ) : stakeModal === 6 ? (
        <Restake />
      ) : stakeModal === 7 ? (
        <ForceUnstake />
      ) : stakeModal === 3 ? (
        <Success
          title={
            stakedStatus === 1
              ? "Stake Successful"
              : stakedStatus === 2
              ? "Unstake Successful"
              : "Claim Successful"
          }
          msg={
            stakedStatus === 1
              ? "Your stake was successful. Click on close to view your staking statistics."
              : stakedStatus === 2
              ? "Your unstake was successful. Click on close to view your staking statistics."
              : "You have successfully claimed your reward"
          }
        />
      ) : stakeModal === 4 ? (
        <Failed
          title={
            stakedStatus === 1
              ? "Stake Unsuccessful"
              : stakedStatus === 2
              ? "Unstake Unsuccessful"
              : "Claim Unsuccessful"
          }
          msg={
            stakedStatus === 1
              ? "Your stake was Unsuccessful"
              : stakedStatus === 2
              ? "Your unstake was Unsuccessful"
              : "Your claim was unsuccessful"
          }
        />
      ) : (
        <div></div>
      )}
    </StakingContainer>
  );
};

export default Home;
