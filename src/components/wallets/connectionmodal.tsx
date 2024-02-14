import React, { FC, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "../reusables/connectmodal";
import styled from "styled-components";
import connectors from "../../methods/utils/connector-config";
import { disconnect } from "../../methods/redux/actions/contract-setup2";
import { login } from "../../methods/utils/useAuth";
import { connectorLocalStorageKey } from "../../methods/utils/config";

import { togglemodal} from "../../methods/redux/actions";
import { WalletOption } from "./walletstyles";

import walletIcon from "../../assets/icons/walletIcon.svg";


const ConnectionModal = () => {
  const dispatch = useDispatch();

  const { modalState, tokenAddress} = useSelector((store: any) => store.General)
  const address = useSelector(
    (store: any) => store.ConnectWalletReducer.address
  );
  const walletInUse = useSelector(
    (store: any) => store.ConnectWalletReducer.walletInUse
  );
  const apys = useSelector((store: any) => store.ConnectWalletReducer.apys);
  const [selectableApys, setSelectableApys] = useState<Array<any>>([]);

  const [connectInfo, setConnectInfo] = useState({
    network: null,
    protocol: null,
    wallet: null,
    //chainId: 80001 testnet
    // chainId: 137
    chainId: 42161
  });

  const disconnectWallet = () => {
    togglemodal(false);
    dispatch(disconnect());
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  useEffect(() => {
    // console.log(apys)
    if (connectInfo.network) {
      const x = apys.filter(b => b.network === connectInfo.network);
      // console.log(x, ' the x')
      setSelectableApys(x);
    }
  }, [apys, connectInfo]);

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
                <WalletOption 
                  key={i}
                  onClick={() => {
                    // 1. should connect to the right network
                    // 2. switch to correct address
                    // 3. continue with wallet connection

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

                    // if (connectInfo.protocol) {
                    //   changeProtocol(connectInfo.protocol);
                    // }

                    // togglemodal(false);
                    //window.location.reload();
                  }}
                >
                  <CardWrapper
                    key={i}
                    
                  >
                    <img width={40} src={entry.image} alt={entry.title} /> 
                  </CardWrapper>
                  <WalletName>{entry.title}</WalletName>
                </WalletOption>
              ))}
            </SectionBody>
          </SectionWrapper>
          <div>
            <InfoWrapper>
              By connecting a wallet, you agree to 
              <a
                href="https://xend.finance/terms"
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: "underline", color: "#6F89E4" }}
              >
                {" "}
                (Xend Finance’s agreement)
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
            <SectionBody>
              {connectors.map((entry, i) => (
                <div className="t-center" key={i}>
                  <CardWrapper className={"check"} key={i} disabled={true}>
                    {walletInUse === entry.title ? (
                      <ActiveBox>
                        {" "}
                        <img src="/assets/activedot.png" alt="activedot" />{" "}
                      </ActiveBox>
                    ) : (
                      ""
                    )}
                    <img width={40} src={entry.image} alt={entry.title} />
                  </CardWrapper>
                  <WalletName>{entry.title}</WalletName>
                </div>
              ))}
            </SectionBody>
          </SectionWrapper>
          <ButtonContainer>
            <div onClick={disconnectWallet}>
              <ConnectBtn>Yes</ConnectBtn>
            </div>
          </ButtonContainer>
        </Modal>
      )}
    </>
  );
};

export default ConnectionModal;

const InfoWrapper = styled.div`
  color: ${({ theme }) => theme.flexiblegrey};
  font-size: ${({ theme }) => theme.textXXs};
  text-align: center;
  margin-bottom: 20px;
  margin-top: 20px;
`;

const ConnectBtn = styled.div`
  padding: 11px 53px;
  border-radius: 30px;
  border: 0px;
  background: ${({ theme }) => theme.yellow};
  border: 1px solid #e5b910;
  font-weight: 600;
  color: ${({ theme }) => theme.white};
`;

const RadioButton = styled.input`
  margin-right: 10px;
  cursor: pointer;
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
  // width: 100%;
  //margin-bottom: 10px;
  // height: 78px;
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

const ActiveBox = styled.div`
  position: absolute;
  right: -6px;
  top: -10px;
`;

const ButtonContainer = styled.div`
  margin-top: 10px;
  padding: 10px;
  padding-bottom: 0px;

  button{
    width: 100%;
  }
`;