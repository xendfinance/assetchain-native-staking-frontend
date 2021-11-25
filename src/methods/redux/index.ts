import { applyMiddleware, createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

//import ConnectWalletReducer from './reducers/ConnectWalletReducer';
import DashboardReducer from './reducers/DashboardReducer';


const reducers = combineReducers({
  
    DashboardReducer
    //ConnectWalletReducer,
});

async function reduxStore() {
    const initstore: any = undefined;

    return createStore(reducers, initstore, composeWithDevTools(applyMiddleware(thunk)));
}

export default reduxStore;
