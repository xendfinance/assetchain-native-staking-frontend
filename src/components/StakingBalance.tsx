import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
} from "../styles/stakingStyles";
import { ButtonState } from "./ButtonState";
import truncateAddress from "../methods/utils/truncate-address";
import {
  getFormDetails,
  staketogglemodal,
  getAvailableBalance,
  getMarketQuote,
  getAllStakingIds,
  getActionLimit,
  getlockPeriod,
  getPendingRewards,
} from "../methods/redux/actions";
import { numberWithCommaswithoutdecimals } from "../methods/helper";
import ClaimableRewards from "./staking/claimablerewards";
import ConnectWallet from "./wallets/connectwallet";
import styled from "styled-components";

import doublearrow from "../assets/icons/doublearrow.svg"

const StakingBalance = () => {
  const dispatch = useDispatch();

  const { availableBalance, hidenumbers, tokenAddress, theme } = useSelector((store: any) => store.General);
  const { userStaked, ids } = useSelector((store: any) => store.StakingReducer);
  const { usdQuote } = useSelector((store: any) => store.MarketReducer);
  const { address, ownerAddress } = useSelector((store: any) => store.ConnectWalletReducer);

  useEffect(() => {
    dispatch(getAvailableBalance());
    dispatch(getMarketQuote());
    dispatch(getAllStakingIds());
    dispatch(getActionLimit());
    dispatch(getlockPeriod());
    dispatch(getPendingRewards());
  }, [dispatch, address]);

  return (
    <CardContainer>
      <StakingDiv>
        <CardTitle>My RWA Staking</CardTitle>
        <ViewOption>
          {" "}
          {!hidenumbers ? (
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
              <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.4" d="M10 0.881836H9.99024C5.86341 0.881836 2.14634 3.80583 0.0585366 8.70868C-0.0195122 8.89574 -0.0195122 9.11233 0.0585366 9.28954C0.731707 10.8736 1.58049 12.2529 2.5561 13.3949L6.16585 9.75226C6.12683 9.51597 6.09756 9.26 6.09756 9.00403C6.09756 6.82827 7.8439 5.066 10 5.066C10.2537 5.066 10.5073 5.09553 10.7415 5.13491L14 1.84567C12.7512 1.21657 11.3951 0.881836 10 0.881836ZM19.9415 8.70868C19.0439 6.60183 17.8439 4.84941 16.4293 3.54985L13.2195 6.78889C13.639 7.41897 13.8927 8.18689 13.8927 9.00403C13.8927 11.1699 12.1463 12.9322 10 12.9322C9.19024 12.9322 8.42927 12.6753 7.80488 12.2529L4.71219 15.3738C6.30244 16.506 8.10732 17.1262 9.99024 17.1262H10C14.1366 17.1262 17.8537 14.1924 19.9415 9.28954C20.0195 9.11233 20.0195 8.89574 19.9415 8.70868Z" fill="#2042B8" />
                <path d="M18.2051 0.714131C18.4978 0.999638 18.4978 1.4722 18.2051 1.75771L16.4295 3.54952L13.2197 6.78855L11.8056 8.215L12.1564 7.86206C12.332 8.19679 12.4296 8.59059 12.4296 9.00409C12.4296 10.3529 11.3369 11.4555 10.0003 11.4555C9.59094 11.4555 9.20106 11.3573 8.86956 11.1804L2.81972 17.2844C2.67337 17.4311 2.48801 17.5 2.30264 17.5C2.11728 17.5 1.92215 17.4311 1.78557 17.2844C1.54167 17.0383 1.50264 16.6435 1.69776 16.358L1.72703 16.3186L12.1953 5.7558L15.288 2.63491L16.1563 1.75771C16.1758 1.73802 16.1953 1.71833 16.2051 1.69864C16.2246 1.67895 16.2441 1.65926 16.2539 1.63957L17.1709 0.714131C17.4636 0.428623 17.9222 0.428623 18.2051 0.714131Z" fill="#2042B8" />
              </svg>


              <p> Hide all numbers </p>
            </HideContainer>
          )}
        </ViewOption>
      </StakingDiv>
      {/* <div > */}
        <WalletAddress> {truncateAddress(address)}</WalletAddress>
      {/* </div> */}

      <DescriptionContainer>
        <div>
          <Description> TOTAL STAKED</Description>
          <ValueDetail>
            {" "}
            {hidenumbers
              ? "-----" :
              numberWithCommaswithoutdecimals(userStaked) + " RWA"}
              {/* <img src={doublearrow} alt="doublearrow" /> */}
            <DescriptionSubValue>
              {" "}
              {hidenumbers ? (
                ""
              ) : (
                <i className="fa fa-arrows-h" aria-hidden="true" />
              )}
              {/* {hidenumbers
                ? ""
                : `$${numberWithCommaswithoutdecimals(usdQuote * userStaked)}`} */}
            </DescriptionSubValue>{" "}
          </ValueDetail>
        </div>

        <div>
          <Description> AVAILABLE IN WALLET</Description>
          <ValueDetail>
            {" "}
            {hidenumbers
              ? "-----"
              : numberWithCommaswithoutdecimals(availableBalance) + " RWA"}
               {/* <img src={doublearrow} alt="doublearrow" /> */}
            <DescriptionSubValue>
              {" "}
              {hidenumbers ? (
                ""
              ) : (
                <i className="fa fa-arrows-h" aria-hidden="true" />
              )}
              {/* {hidenumbers
                ? ""
                : `$${numberWithCommaswithoutdecimals(
                  usdQuote * availableBalance
                )}`} */}
            </DescriptionSubValue>{" "}
          </ValueDetail>
        </div>
      </DescriptionContainer>
      {address && <ClaimableRewards />}
      {address ? (
        <ButtonContainer className="row">
          <ButtonState
            fontSize={"0.8rem"}
            buttonClass="primary"
            label={"Stake"}
            onClick={() => dispatch(staketogglemodal(1))}
            padding={undefined}
          />
        </ButtonContainer>
      ) : (
        <ButtonContainer>
            <ConnectWallet/>
        </ButtonContainer>
      )}
      
      {ids.length > 0 && (
        <ButtonContainer className="row">
          <ButtonState
            fontSize={"0.8rem"}
            buttonClass="secondary"
            label={"UnStake"}
            onClick={() => dispatch(staketogglemodal(2))}
            padding={""}
          />
        </ButtonContainer>
      )}
    </CardContainer>
  );
};

const ButtonContainer = styled.div`
  margin-top: 10px;
  padding: 10px;
  padding-bottom: 0px;

  button{
    width: 100%;
  }
`;

export default StakingBalance;
