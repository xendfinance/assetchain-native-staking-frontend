import removeAddress from '../../utils/remove-address';
import _const from '../../_const';
import { connectorLocalStorageKey } from '../../../utils/config';
import getNodeUrl from '../../../utils/node-url';
const rpcUrl = getNodeUrl();
const chainId = parseInt("56", 10);
const POLLING_INTERVAL = 12000;


export const disconnect = () => async (dispatch: Function) => {

    let connector: any = localStorage.getItem("CONNECTION_DETAILS");
    let { connectorID } = JSON.parse(connector);

    if (connectorID === "walletconnect") {
        localStorage.removeItem(connectorID)
    }


    removeAddress();



    window.sessionStorage.removeItem(connectorLocalStorageKey);
    window.sessionStorage.removeItem(_const.WEB3SETPROVIDER);
    window.sessionStorage.removeItem(_const.WEB3_WALLETCONNECT_HAS_DISCONNECTED);
    window.localStorage.removeItem(_const.NETWORK_PROVIDER_HAS_CHANGED);

    window.localStorage.removeItem("CONNECTION_DETAILS");

    dispatch({
        type: _const.PRISTINE,
    });


};
