import React, { FC, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import connectors from "../../methods/utils/connector-config";
import { useWeb3React } from "@web3-react/core";
import truncateAddress from "../../methods/utils/truncate-address";
import retrieveAddress from "../../methods/utils/retrieve-address";
import _const from "../../methods/_const";
import saveAddress from "../../methods/utils/save-address";
import { reacquireEmit } from "../../methods/utils/event-fnc-recall";
import { assignAddresses } from "../../methods/utils/protocol-settings";
import { addSettingsObjectToStorage } from "../../methods/utils/intro-settings";
import { Button } from "./walletstyles";
import { togglemodal } from "../../methods/redux/actions";


const ConnectWallet = () => {
  const dispatch = useDispatch();
  const { account } = useWeb3React();

  const { address, walletInUse } = useSelector(
    (store: any) => store.ConnectWalletReducer
  );

  const [width, setWidth] = useState<number>(window.innerWidth);

  const [walletLogo, setWalletLogo] = useState("");

  function addressWork() {
    const localAddress = retrieveAddress();
    dispatch({
      type: _const.ADDRESS,
      payload: {
        address: localAddress
      }
    });
  }

  // main function handling the connection into the app
  const insideConnectWallet = (account: any) => {
    saveAddress(account);
    dispatch({
      type: _const.ADDRESS,
      payload: { address: account }
    });
    // dispatch({ type: _const.PRISTINE });
    let path = window.location.pathname;
    path = path.length > 1 ? path.substring(1) : path;
    reacquireEmit(path);
  };

  useEffect(() => {
    if (typeof address !== "undefined" && address) {
      insideConnectWallet(address);
      // dispatch(connectWallet());
    }
  }, [address]);

  // runs once whenever the account is changed
  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      window.ethereum.on("accountsChanged", () => {
        // dispatch(connectWallet());
        if (typeof account !== "undefined" && account) {
          insideConnectWallet(account);
        }
      });
    }
  }, []);

  // runs once when the network is changed
  // useEffect(() => {
  //   if (typeof window.ethereum !== "undefined") {
  //     window.ethereum.on("chainChanged", () => {
  //       // dispatch(connectWallet());
  //       if (typeof account !== "undefined" && account) {
  //         insideConnectWallet(account);
  //       }
  //     });
  //   }
  //   console.log('ddsjdshj')
  //   // eslint-disable-next-line
  // }, []);

  // runs once when metamask is disconnected
  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      window.ethereum.on("disconnect", () => {
        console.log("DISCONNECTED EVENT FIRED FROM METAMASK");
      });
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    assignAddresses();
    addressWork();
    addSettingsObjectToStorage();

    // eslint-disable-next-line
  }, []);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  function handleRejectedCall() {
    console.warn(`UNHANDLED PROMISE REJECTION:`);
  }

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    window.addEventListener("unhandledrejection", handleRejectedCall);

    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  useEffect(() => {
    const connectedWallet = connectors.filter(x => x.title === walletInUse);
    connectedWallet[0] && setWalletLogo(connectedWallet[0].image);
  }, [address, walletInUse]);

  return (
    <div onClick={() => dispatch(togglemodal(true))}>
      {!address ? (
        <Button> Connect Wallet</Button>
      ) : (
        <Button>
          <span className="mr-1">
            <img src={walletLogo} width={20} alt="walletLogo" />
          </span>
          <span>{truncateAddress(address)}</span>
        </Button>
      )}
    </div>
  );
};

export default ConnectWallet;
