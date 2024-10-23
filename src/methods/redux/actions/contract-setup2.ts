import Web3Modal from "web3modal";
import Web3 from "web3";
// import WalletConnectProvider from "@walletconnect/web3-provider";
import removeAddress from "../../utils/remove-address";
import _const from "../../_const";
import { connectorLocalStorageKey } from "../../utils/config";

export const web3Connection = async function() {
  const providerOptions = {
    walletconnect: {
      package: {},
      options: {
        rpc: {
          56: "https://bsc-dataseed1.defibit.io/",
          137: process.env.REACT_APP_RPC_URL,
          80001: process.env.REACT_APP_RPC_URL,
          1: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
        }
        //network: 'binance',
      }
    }
  };

  const web3Modal = new Web3Modal({
    //network: "ganache", // optional
    cacheProvider: true, // optional
    providerOptions: providerOptions
  });

  web3Modal.clearCachedProvider();
  const provider = await web3Modal.connect();
  const web3 = new Web3(provider);
  return web3;
};

export const connectWalletConnect = () => async (dispatch: Function) => {};

export const disconnect = () => async (dispatch: Function) => {
  let connector: any = localStorage.getItem("CONNECTION_DETAILS");
  let { connectorID } = JSON.parse(connector);

  if (connectorID === "walletconnect") {
    localStorage.removeItem(connectorID);
  }

  removeAddress();

  window.sessionStorage.removeItem(connectorLocalStorageKey);
  window.sessionStorage.removeItem(_const.WEB3SETPROVIDER);
  window.sessionStorage.removeItem(_const.WEB3_WALLETCONNECT_HAS_DISCONNECTED);
  window.localStorage.removeItem(_const.NETWORK_PROVIDER_HAS_CHANGED);

  window.localStorage.removeItem("CONNECTION_DETAILS");

  dispatch({
    type: _const.PRISTINE
  });
};
