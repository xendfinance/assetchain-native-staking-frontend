import web3 from "web3";
import {
  chains,
  connectorsByName,
  defaultChainId,
  switchChain,
} from "utils/web3React";
import _const from "../_const";
import removeAddress from "./remove-address";
import { connectorLocalStorageKey } from "./config";
import reduxStore from "methods/redux";
import {
  getUserStaked,
  getPendingRewards,
  getAvailableBalance,
  getAllStakingIds,
  togglemodal,
} from "methods/redux/actions";

export const login = (connectorID, chainId, walletName, tokenAddress) => {
  return async (dispatch) => {
    try {
      let account;
      const connector = await connectorsByName(connectorID, chainId);
      const dt = { chainId, connectorID, walletName };
      localStorage.setItem("CONNECTION_DETAILS", JSON.stringify(dt));
      if (connector) {
        if (connectorID === "injected") {
          const _chainId = await connector.getChainId();
          const provider = await connector.getProvider();

          provider.on("accountsChanged", (addresses) => {
            const accountSwitch = addresses[0];
            if (accountSwitch) {
              if (accountSwitch) {
                dispatch({
                  type: _const.ADDRESS,
                  payload: { address: accountSwitch },
                });
              }
            }
          });
          provider.on("chainChanged", async (chain) => {
            await switchOrAddNetworkToMetamask(parseInt(chain.toString()))
          });
          await switchOrAddNetworkToMetamask(parseInt(_chainId.toString()));
          let connection = await connector.activate();

          account = connection.account;

          window.APPWEB3 = new web3(web3.givenProvider);
        }
        if (connectorID === "walletconnect") {
          account = connector.accounts[0];

          const provider = new web3(connector);
          window.APPWEB3 = provider;

          connector.on("accountsChanged", (addresses) => {
            // sessionStorage.setItem(_const.TOKEN, addresses[0]);
            dispatch(getUserStaked(addresses[0]));
            dispatch({
              type: _const.ADDRESS,
              payload: {
                address: addresses[0],
                walletInUse: walletName,
                chainId,
              },
            });
          });
          // console.log(provider, 'provider')
        }
        if (account) {
          // sessionStorage.setItem(_const.TOKEN, account);
          dispatch({
            type: _const.ADDRESS,
            payload: { address: account, walletInUse: walletName, chainId },
          });
          dispatch(togglemodal(false, 0));
          dispatch(getUserStaked(account));
          dispatch(getPendingRewards());
          dispatch(getAvailableBalance());
          dispatch(getAllStakingIds());
        }
      } else {
        console.warn("Can't find connector \n The connector config is wrong");
        console.log("");
      }
    } catch (error) {
      console.log(error, "error");
    }
  };
};

export const recreateWeb3 = (tokenAddress) => {
  return async (dispatch) => {
    try {
      const connectionDetails = JSON.parse(
        localStorage.getItem("CONNECTION_DETAILS")
      );

      if (connectionDetails) {
        let account = null;

        let { walletName, chainId } = connectionDetails;
        dispatch({
          type: _const.ADDRESS,
          payload: { address: "", walletInUse: walletName, chainId },
        });

        const connector = await connectorsByName(
          connectionDetails.connectorID,
          connectionDetails.chainId
        );

        if (connector) {
          if (connectionDetails.connectorID === "injected") {
            const _chainId = await connector.getChainId();
            await switchOrAddNetworkToMetamask(parseInt(_chainId.toString()));

            let connection = await connector.activate();

            connection.provider.on("accountsChanged", (code, reason) => {
              const accountSwitch = code[0];
              if (accountSwitch) {
                if (accountSwitch) {
                  dispatch({
                    type: _const.ADDRESS,
                    payload: { address: accountSwitch },
                  });
                }
              } else {
                DisconnectFromWallet();
              }
            });

            connection.provider.on("chainChanged", async (chain) => {
              await switchOrAddNetworkToMetamask(parseInt(chain.toString()))
            });

            account = connection.account;

            window.APPWEB3 = await new web3(web3.givenProvider);
          }
          if (connectionDetails.connectorID === "walletconnect") {
            account = connector.accounts[0];
            connector.on("accountsChanged", (addresses) => {
              // sessionStorage.setItem(_const.TOKEN, addresses[0]);
              dispatch(getUserStaked(addresses[0]));
              dispatch({
                type: _const.ADDRESS,
                payload: {
                  address: addresses[0],
                  walletInUse: walletName,
                  chainId,
                },
              });
            });
            const provider = new web3(connector);
            window.APPWEB3 = provider;
          }
          if (account) {
            // sessionStorage.setItem(_const.TOKEN, account);
            dispatch({
              type: _const.ADDRESS,
              payload: { address: account },
            });
            dispatch(getUserStaked(account));
            dispatch(getPendingRewards());
            dispatch(getAvailableBalance());
            dispatch(getAllStakingIds());
          }
        } else {
          console.warn("Can't find connector \n The connector config is wrong");
        }
      } else {
        console.log("Storage Data Not There Yet Show Modal");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const DisconnectFromWallet = async () => {
  try {
    let connector = localStorage.getItem("CONNECTION_DETAILS");
    let { connectorID } = JSON.parse(connector);

    if (connectorID === "walletconnect") {
      localStorage.removeItem(connectorID);
    }

    removeAddress();

    window.sessionStorage.removeItem(connectorLocalStorageKey);
    window.sessionStorage.removeItem(_const.WEB3SETPROVIDER);
    window.sessionStorage.removeItem(
      _const.WEB3_WALLETCONNECT_HAS_DISCONNECTED
    );
    window.localStorage.removeItem(_const.NETWORK_PROVIDER_HAS_CHANGED);

    window.localStorage.removeItem("CONNECTION_DETAILS");

    const ConnectWalletReducerAction = await reduxStore();
    ConnectWalletReducerAction.dispatch({
      type: _const.PRISTINE,
    });
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};

async function switchOrAddNetworkToMetamask(chainId) {
  const hexChainId = `0x${chainId.toString(16)}`;
  try {
    if (window.ethereum) {
      if (!chains.map((c) => c.chainId).includes(chainId)) {
        await switchChain(defaultChainId, window.ethereum);
      }
      // switch to the selected network
      // await window.ethereum.request({
      //   method: "wallet_switchEthereumChain",
      //   params: [{ chainId: hexChainId }],
      // });
    } else {
      alert("Install an Injected Wallet!");
    }
  } catch (e) {
    if (e.code === 4902) {
      let params = {};
      if (chainId === 137) {
        params = {
          chainId: hexChainId,
          chainName: "Polygon Mainnet",
          nativeCurrency: {
            name: "MATIC",
            symbol: "matic",
            decimals: 18,
          },

          rpcUrls: [process.env.REACT_APP_RPC_URL],
          blockExplorerUrls: ["https://explorer.matic.network/"],
        };
      }

      if (chainId === 42161) {
        params = {
          chainId: hexChainId,
          chainName: "Arbitrum One",
          nativeCurrency: {
            name: "Ethereum",
            symbol: "ETH",
            decimals: 18,
          },

          rpcUrls: [process.env.REACT_APP_RPC_URL],
          blockExplorerUrls: ["https://explorer.arbitrum.io"],
        };
      }

      // add test polygon
      if (chainId === 80001) {
        params = {
          chainId: hexChainId,
          chainName: "Polygon Testnet",
          nativeCurrency: {
            name: "MATIC",
            symbol: "matic",
            decimals: 18,
          },
          rpcUrls: process.env.REACT_APP_RPC_URL,
          blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
        };
      }

      try {
        // the network is added
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [params],
        });
      } catch (e) {
        console.log(e);
      }
    }
  }
}
