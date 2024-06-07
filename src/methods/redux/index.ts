import { applyMiddleware, createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

//import ConnectWalletReducer from './reducers/ConnectWalletReducer';
import DashboardReducer from './reducers/DashboardReducer';

import General from "./reducers/generalReducer";
import ConnectWalletReducer from "./reducers/ConnectWalletReducer";
import LoaderReducer from "./reducers/loaderReducer";
import StakingReducer from "./reducers/stakingReducer";
import MarketReducer from "./reducers/marketReducer";


const reducers = combineReducers({
  
    DashboardReducer,
    //ConnectWalletReducer,
    General,
    LoaderReducer,
    ConnectWalletReducer,
    StakingReducer,
    MarketReducer
});

async function reduxStore() {
    const initstore: any = undefined;

    return createStore(reducers, initstore, composeWithDevTools(applyMiddleware(thunk)));
}

export default reduxStore;
