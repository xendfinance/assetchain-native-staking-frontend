import React, { FC, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "../reusables/connectmodal";
import styled from "styled-components";
import connectors from "../../methods/utils/connector-config";
import { disconnect } from "../../methods/redux/actions/contract-setup2";
import { login } from "../../methods/utils/useAuth";
import { connectorLocalStorageKey } from "../../methods/utils/config";

import { togglemodal } from "../../methods/redux/actions";
import { WalletOption } from "./walletstyles";

import walletIcon from "../../assets/icons/walletIcon.svg";
import truncateAddress from "methods/utils/truncate-address";

import arbitrum from "../../assets/icons/arbitrum.svg"
import tokenIcon from "../../assets/icons/tokenIcon.svg"

const ConnectionModal = () => {
  const dispatch = useDispatch();

  const { modalState, tokenAddress } = useSelector((store: any) => store.General);
  const [walletLogo, setWalletLogo] = useState("");
  const address = useSelector(
    (store: any) => store.ConnectWalletReducer.address
  );
  const walletInUse = useSelector(
    (store: any) => store.ConnectWalletReducer.walletInUse
  );
  const { allStaked, userStaked } = useSelector((store: any) => store.StakingReducer);
  const apys = useSelector((store: any) => store.ConnectWalletReducer.apys);
  const [selectableApys, setSelectableApys] = useState<Array<any>>([]);

  const [connectInfo, setConnectInfo] = useState({
    network: null,
    protocol: null,
    wallet: null,
    //chainId: 80001 testnet
    //chainId: 137
    chainId: 42421
  });

  const disconnectWallet = () => {
    togglemodal(false);
    dispatch(disconnect());
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  useEffect(() => {
    if (connectInfo.network) {
      const x = apys.filter(b => b.network === connectInfo.network);
      setSelectableApys(x);
    }
  }, [apys, connectInfo]);


  useEffect(() => {
    const connectedWallet = connectors.filter(x => x.title === walletInUse);
    connectedWallet[0] && setWalletLogo(connectedWallet[0].image);
  }, [address, walletInUse]);

  return (
    <>
      {!address ? (
        <Modal
          title="Connect Wallet"
          desc=""
          visible={modalState}
          width={"30%"}
          close={() => togglemodal(false)}
          icon={walletIcon}
        >
          <SectionWrapper>
            <SectionBody>
              {connectors.map((entry, i) => (
                <WalletOption key={i}
                  onClick={() => {
                    dispatch(
                      login(
                        entry.connectorId,
                        connectInfo.chainId,
                        entry.title,
                        tokenAddress
                      )
                    );

                    window.localStorage.setItem(
                      connectorLocalStorageKey,
                      entry.connectorId
                    );
                    // togglemodal(false);
                    //window.location.reload();
                  }}
                >
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "1rem"}} >
                    <CardWrapper
                      key={i}
                      style={{ backgroundColor: entry.title.toLowerCase() === "metamask" ? "#FFD2B0" : "#d5d5d5" }}
                    >
                      <img src={entry.image} alt={entry.title} />
                    </CardWrapper>
                    <WalletName>{entry.title}</WalletName>
                  </div>
                  {entry.title.toLowerCase() === "madwallet" && <Recommended> Recommended</Recommended>}
                </WalletOption>
              ))}
            </SectionBody>
          </SectionWrapper>
          <div>
            <InfoWrapper>
              By connecting a wallet, you agree to <br />
              <a
                href="https://xend.finance/terms"
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: "none" }}
              >
                {" "}
                (Xend Finance's agreement)
              </a>{" "}
            </InfoWrapper>
          </div>
        </Modal>
      ) : (
        <Modal
          title="Disconnect wallet"
          desc={`You are connected with ${walletInUse}`}
          width={"30%"}
          visible={modalState}
          close={() => togglemodal(false)}
          icon={walletIcon}
        >
          <SectionWrapper>
            <ConnectedWalletDetail>
              <div>
                <DetailHeading> Wallet Connected</DetailHeading>
                <DetailValue><span> <img height="16px" src={walletLogo} alt="arbitrum" /></span> {walletInUse}</DetailValue>
              </div>
              <div>
                <DetailHeading> Network Connected</DetailHeading>
                <DetailValue><span> <img height="16px" src={arbitrum} alt="arbitrum" /></span> Arbitrum</DetailValue>
              </div>
            </ConnectedWalletDetail>
            <ConnectedWalletContainer>
              <Address> {truncateAddress(address)}</Address>
              <DetailHeading> Balance</DetailHeading>
              <div className="mt-2">
                <Balance>{userStaked}</Balance>
                <DetailValue> ARB <span> <img height="16px" src={arbitrum} alt="wicrypt icon" /></span></DetailValue>
              </div>
              <div>
                <Balance>{allStaked}</Balance>
                <DetailValue>  RWA <span><img height="16px" src={tokenIcon} alt="wicrypt icon" /></span></DetailValue>
              </div>
            </ConnectedWalletContainer>

          </SectionWrapper>
          <ActionContainer>
            <div onClick={disconnectWallet}>
              <ConnectBtn>Disconnect</ConnectBtn>
            </div>
          </ActionContainer>
        </Modal>
      )}
    </>
  );
};

export default ConnectionModal;

const InfoWrapper = styled.div`
  color: ${({ theme }) => theme.flexiblegrey};
  font-size: ${({ theme }) => theme.textXs};
  text-align: center;
  margin-bottom: 20px;
  margin-top: 20px;
  a{
    color: ${({ theme }) => theme.highlight};
  }
`;

const ConnectBtn = styled.div`
  padding: 11px 53px;
  border-radius: 30px;
  border: 0px;
  background: ${({ theme }) => theme.highlight};
  font-weight: 600;
  color: ${({ theme }) => theme.white};
`;


const WalletName = styled.p`
  color: ${({ theme }) => theme.flexiblegrey};
  font-size: ${({ theme }) => theme.textXXs};
  text-align: center;
  font-weight: ${({ theme }) => theme.textNormal};
`;

interface ICardWrapper {
  show?: boolean;
}
const CardWrapper = styled.button<ICardWrapper>`
  cursor: pointer;
  position: relative;
  display: ${p => (p.show === false ? "none" : "flex")};
  align-items: center;
  height: 60px;
  width: 60px;
  background: #d3d3d3;
  border: none;
  box-sizing: border-box;
  box-shadow: 0px 3.51724px 36.0517px rgba(0, 0, 0, 0.06);
  border-radius: 14.7847px;
  padding: 16px;
  curaor-pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    background: #d3d3d3;
    border-radius: 8px;
  }

  ]

  & .apy {
    color: ${p => p.theme.fontAlt};
    font-size: 14px;
    font-weight: 600;
  }

  & .check {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(30%, -30%);
  }
`;

const SectionWrapper = styled.div`
  margin-top: 40px;
`;

const SectionBody = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;

  @media (min-width: 768px) {
    flex-direction: column;
    justify-content: space-around;
    //justify-content: space-between;
  }
`;


const Recommended = styled.div`
 background: #00C0871A;
  color: #00C087;
  text-align:center;
  font-size: 8px;
  padding: 6px;
  border-radius: 8px;
  font-weight 600;
`

const ActionContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;

  & div {
    cursor: pointer;
    display: flex;
    align-items: center;

    & p {
      margin-left: 8px;
    }
  }

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
  }
`;


const ConnectedWalletDetail = styled.div`
  background: #E5B91005;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  border-radius: 8px;
  border: 1px solid #E5B9101A;
  margin-bottom: 10px;
`

export const ConnectedWalletContainer = styled.div`
  background: #E5B91005;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #E5B9101A;
  margin-bottom: 10px;

  div{
    display: flex;
    justify-content: space-between;
  }
`

const DetailHeading = styled.p`
  margin-bottom: 3px;
  color: #6B6B6B;
  line-height: 15px;
  font-size: 12px;
}
`

const DetailValue = styled.p`
  font-size: ${({ theme }) => theme.textXXs};
  color: ${({ theme }) => theme.descriptionColor};
  margin-bottom: 0px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const Address = styled.p`
  font-size: ${({ theme }) => theme.textXXs};
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 1rem;
`

const Balance = styled.p`
  font-size: ${({ theme }) => theme.textXs};
  font-weight: 600;
  line-height: 21px
  margin-bottom: 0;
  color: ${({ theme }) => theme.descriptionColor};
`