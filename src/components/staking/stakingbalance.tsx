import React, { useEffect } from "react";
import {
  CardContainer,
  Description,
  ValueDetail,
  DescriptionSubValue,
  DescriptionContainer,
  WalletAddress,
  CardTitle,
  ViewOption,
  StakingDiv,
  HideContainer,
} from "./stakingstyles.js";
import { ButtonState } from "../reusables/button";
import truncateAddress from "../../methods/utils/truncate-address";
import {
  getFormDetails,
  staketogglemodal,
  getAvailableBalance,
  getMarketQuote,
  getAllStakingIds,
  getActionLimit,
  getlockPeriod,
  getPendingRewards,
} from "../../methods/redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { numberWithCommaswithoutdecimals } from "../../methods/helper";
import ClaimableRewards from "./claimablerewards.js";
import ConnectWallet from "../wallets/connectwallet";

const StakingBalance = () => {
  const dispatch = useDispatch();

  const { circulatingSupply, usdQuote } = useSelector((store: any) => store.MarketReducer);
  const { availableBalance, hidenumbers, tokenAddress, theme } = useSelector((store: any) => store.General);
  const { address, } = useSelector((store: any) => store.ConnectWalletReducer);
  const { userStaked, ids } = useSelector((store: any) => store.StakingReducer);

  useEffect(() => {
    dispatch(getAvailableBalance(tokenAddress));
    dispatch(getMarketQuote());
    dispatch(getAllStakingIds());
    dispatch(getActionLimit());
    dispatch(getlockPeriod());
    dispatch(getPendingRewards());
  }, [dispatch, tokenAddress, address]);

  return (
    <CardContainer>
      <StakingDiv>
        <CardTitle>My WNT Staking</CardTitle>
        <ViewOption>
          {" "}
          {hidenumbers ? (
            <HideContainer
              onClick={() =>
                dispatch(
                  getFormDetails({
                    props: ["hidenumbers"],
                    value: !hidenumbers,
                  })
                )
              }
            >
              <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.4" d="M10 0C12.0683 0 14.0293 0.717576 15.7366 2.04606C17.4439 3.36388 18.8976 5.29455 19.9415 7.70909C20.0195 7.89236 20.0195 8.10667 19.9415 8.28121C17.8537 13.1103 14.1366 16 10 16H9.99024C5.86341 16 2.14634 13.1103 0.0585366 8.28121C-0.0195122 8.10667 -0.0195122 7.89236 0.0585366 7.70909C2.14634 2.87903 5.86341 0 9.99024 0H10ZM10 4.12121C7.8439 4.12121 6.09756 5.85697 6.09756 8C6.09756 10.1333 7.8439 11.8691 10 11.8691C12.1463 11.8691 13.8927 10.1333 13.8927 8C13.8927 5.85697 12.1463 4.12121 10 4.12121Z" fill="#25346A" />
                <path d="M12.4308 7.99687C12.4308 9.32536 11.3381 10.4114 10.0015 10.4114C8.65518 10.4114 7.5625 9.32536 7.5625 7.99687C7.5625 7.83203 7.58201 7.67784 7.61128 7.52269H7.66006C8.74299 7.52269 9.62104 6.66936 9.66006 5.60172C9.76738 5.5833 9.88445 5.57263 10.0015 5.57263C11.3381 5.57263 12.4308 6.65869 12.4308 7.99687Z" fill="#25346A" />
              </svg>


              <p> View all numbers </p>
            </HideContainer>
          ) : (
            <HideContainer
              onClick={() =>
                dispatch(
                  getFormDetails({
                    props: ["hidenumbers"],
                    value: !hidenumbers,
                  })
                )
              }
            >
               <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.4" d="M10 0C12.0683 0 14.0293 0.717576 15.7366 2.04606C17.4439 3.36388 18.8976 5.29455 19.9415 7.70909C20.0195 7.89236 20.0195 8.10667 19.9415 8.28121C17.8537 13.1103 14.1366 16 10 16H9.99024C5.86341 16 2.14634 13.1103 0.0585366 8.28121C-0.0195122 8.10667 -0.0195122 7.89236 0.0585366 7.70909C2.14634 2.87903 5.86341 0 9.99024 0H10ZM10 4.12121C7.8439 4.12121 6.09756 5.85697 6.09756 8C6.09756 10.1333 7.8439 11.8691 10 11.8691C12.1463 11.8691 13.8927 10.1333 13.8927 8C13.8927 5.85697 12.1463 4.12121 10 4.12121Z" fill="#25346A" />
                <path d="M12.4308 7.99687C12.4308 9.32536 11.3381 10.4114 10.0015 10.4114C8.65518 10.4114 7.5625 9.32536 7.5625 7.99687C7.5625 7.83203 7.58201 7.67784 7.61128 7.52269H7.66006C8.74299 7.52269 9.62104 6.66936 9.66006 5.60172C9.76738 5.5833 9.88445 5.57263 10.0015 5.57263C11.3381 5.57263 12.4308 6.65869 12.4308 7.99687Z" fill="#25346A" />
              </svg>
              <p> Hide all numbers </p>
            </HideContainer>
          )}
        </ViewOption>
      </StakingDiv>
      <div className="col-lg-3 col-sm-3">
        <WalletAddress> {truncateAddress(address)}</WalletAddress>
      </div>

      <DescriptionContainer>
        <div>
          <Description> TOTAL STAKED</Description>
          <ValueDetail>
            {" "}
            {hidenumbers
              ? "-----"
              : numberWithCommaswithoutdecimals(userStaked) + " WNT"}{" "}
            <DescriptionSubValue>
              {" "}
              {hidenumbers ? (
                ""
              ) : (
                <i className="fa fa-arrows-h" aria-hidden="true" />
              )}
              {hidenumbers
                ? ""
                : `$${numberWithCommaswithoutdecimals(usdQuote * userStaked)}`}
            </DescriptionSubValue>{" "}
          </ValueDetail>
        </div>

        <div>
          <Description> AVAILABLE IN WALLET</Description>
          <ValueDetail>
            {" "}
            {hidenumbers
              ? "-----"
              : numberWithCommaswithoutdecimals(availableBalance) + " WNT"}{" "}
            <DescriptionSubValue>
              {" "}
              {hidenumbers ? (
                ""
              ) : (
                <i className="fa fa-arrows-h" aria-hidden="true" />
              )}
              {hidenumbers
                ? ""
                : `$${numberWithCommaswithoutdecimals(
                  usdQuote * availableBalance
                )}`}
            </DescriptionSubValue>{" "}
          </ValueDetail>
        </div>
      </DescriptionContainer>
      {address ? <ClaimableRewards /> : null}
      {address ? (
        <div className="row mb-3 padbtn">
          <ButtonState
            fontSize={"0.8rem"}
            buttonClass="primary"
            label={"Stake"}
            onClick={() => dispatch(staketogglemodal(1))}
            padding=""
          />
        </div>
      ) : (
        <div className="row t-center">
          <div className="col-lg-12">
            <ConnectWallet />
          </div>
        </div>
      )}
      {ids.length > 0 ? (
        <div className="row padbtn">
          <ButtonState
            fontSize={"0.8rem"}
            buttonClass="secondary"
            label={"UnStake"}
            onClick={() => dispatch(staketogglemodal(2))}
            padding=""
          />
        </div>
      ) : (
        <div> </div>
      )}
    </CardContainer>
  );
};

export default StakingBalance;
