import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Footer2, Modal, Navbar2 } from 'components'
import { IconCard } from "../components/IconCard";
import StakingBalance from "../components/StakingBalance";
import { StakingTitle, StakingContainer, StakingDescription } from "../styles/stakingStyles";
import { BackgroundCard } from "../components/BackgroundCard";
import { ThemeProvider } from "styled-components";
import { lighttheme, darktheme } from "../styles/theme";
import Stake from "../components/stake";
import Unstake from "../components/unstake";
import Success from "../components/status/success";
import Failed from "../components/status/failed";
import Claim from "../components/status/claim";
import Restake from "../components/status/restake";
import { getStakingScore, getAllStaked } from "../methods/redux/actions";
import { numberWithCommaswithoutdecimals, toFixed } from "../methods/helper";
import StakingScoreInfo from "components/staking/stakingscoreinfo";
import ForceUnstake from "components/forceunstake";
import ConnectionModal from "components/wallets/connectionmodal";

//icons 
import piechart from "../assets/icons/chart-pie.svg";
import analytics from "../assets/icons/analytics.svg";
import scale from "../assets/icons/scale.svg";
import arbitrum from "../assets/icons/arbitrum.svg"



const StakingV2 = () => {
  let dispatch = useDispatch();
  const { stakeModal, stakingpoints, theme } = useSelector((store: any) => store.General);
  const { stakedStatus, allStaked } = useSelector((store: any) => store.StakingReducer);
  const { usdQuote, percentageChange, stakingScore } = useSelector((store: any) => store.MarketReducer);
  const { address } = useSelector((store: any) => store.ConnectWalletReducer);

  useEffect(() => {
    dispatch(getAllStaked());
    {
      address ? dispatch(getStakingScore(address)) : console.log("");
    }
  }, [address]);

  return (
    <ThemeProvider theme={theme ? darktheme : lighttheme}>
      <Navbar2 />
      <StakingContainer className="container">
        {stakingpoints ? <StakingScoreInfo /> : null}
        <StakingTitle> RWA Staking <span style={{color: "#E66A62"}}> TESTNET</span> </StakingTitle>
        <StakingDescription> Built on <span> <img src={arbitrum} alt="arbitrum" /></span>Asset Chain</StakingDescription>
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
                  icon={scale}
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
                  icon={analytics}
                  value={numberWithCommaswithoutdecimals(stakingScore)}
                  subvalue={""}
                  info={true}
                />
              </div>
              <div className="col-lg-6 col-xs-6 col-sm-6">
                <IconCard
                  label={"RWA Price"}
                  currency={""}
                  icon={piechart}
                  value={"$" + Number(usdQuote).toFixed(4)}
                  info={false}
                  subvalue={Number(percentageChange)}
                />
              </div>
            </div>
          </div>
        </div>

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
      <Footer2 />
      <ConnectionModal />
    </ThemeProvider>
  );
};

export default StakingV2;
