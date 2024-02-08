import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Footer, Navbar, Modal } from 'components'
import { IconCard } from "../components/IconCard";
import StakingBalance from "../components/StakingBalance";
import { StakingTitle, StakingContainer, StakingDescription } from "../styles/stakingStyles";
import { BackgroundCard } from "../components/BackgroundCard";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { lighttheme, darktheme } from "../styles/theme";
// import Stake from "../stake";
// import Unstake from "../unstake";
// import Success from "../status/success";
// import Failed from "../status/failed";
// import Claim from "../status/claim";
// import Restake from "../status/restake";
// import { getStakingScore, getAllStaked } from "../methods/actions";
// import { numberWithCommaswithoutdecimals } from "./../methods/helper";
// import StakingScoreInfo from "./stakingscoreinfo";
// import ForceUnstake from "../forceunstake";


const StakingV2 = () => {
  //   const stakeModal = useSelector((state) => state.General.stakeModal);
  //   const stakedStatus = useSelector(
  //     (state) => state.StakingReducer.stakedStatus
  //   );
  //   const allStaked = useSelector((state) => state.StakingReducer.allStaked);
  //   const usdQuote = useSelector((state) => state.MarketReducer.usdQuote);
  //   const stakingScore = useSelector((state) => state.MarketReducer.stakingScore);
  //   const ownerAddress = useSelector(
  //     (state) => state.ConnectWalletReducer.address
  //   );
  //   const stakingpoints = useSelector((state) => state.General.stakingpoints);

  let dispatch = useDispatch();
  const theme = true;

  //   useEffect(() => {
  //     dispatch(getAllStaked());
  //     {
  //       ownerAddress ? dispatch(getStakingScore(ownerAddress)) : console.log("");
  //     }
  //   }, [ownerAddress]);

  return (
    <ThemeProvider theme={theme ? darktheme : lighttheme}>
       <Navbar />
      <StakingContainer className="container">
        {/* {stakingpoints ? <StakingScoreInfo /> : null} */}
        <StakingTitle>Xend Finance Staking V2 </StakingTitle>
        <StakingDescription> Built on Arbitrum One</StakingDescription>
        <div className="row">
          <div className="col-sm-12 col-lg-5">
            <StakingBalance />
          </div>
          <div className="col-lg-7">
            <div className="row">
              <div className="col-lg-6 col-xs-6 col-sm-6">
                <IconCard
                  label={"Total Staked"}
                  currency={"RWA"}
                  icon={"./assets/scale.svg"}
                  // value={numberWithCommaswithoutdecimals(allStaked)}
                  // subvalue={
                  //   "$" + numberWithCommaswithoutdecimals(usdQuote * allStaked)
                  // }
                  value={100}
                  subvalue={
                    "$1000"
                  }
                  info={false}
                />
              </div>
              <div className="col-lg-6 col-xs-6  col-sm-6">
                <BackgroundCard label={undefined} error={undefined} errorText={undefined} />
              </div>
              <div className="col-lg-6 col-xs-6 col-sm-6">
                <IconCard
                  label={"Staking Score"}
                  currency={""}
                  icon={"/assets/points.svg"}
                  // value={numberWithCommaswithoutdecimals(stakingScore)}
                  value={10}
                  subvalue={0}
                  info={true}
                />
              </div>
              <div className="col-lg-6 col-xs-6 col-sm-6">
                <IconCard
                  label={"RWA Price"}
                  currency={""}
                  icon={"./assets/chart-pie.svg"}
                  // value={"$" + usdQuote}
                  value={10}
                  info={false}
                  subvalue={0}
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
        {/* 
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
      )} */}
        <Footer />
      </StakingContainer>
    </ThemeProvider>
  );
};

export default StakingV2;
