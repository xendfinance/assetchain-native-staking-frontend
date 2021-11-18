import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import App from './App';
import {Provider} from 'react-redux'; 
import reportWebVitals from './reportWebVitals';
import reduxStore from './methods/redux';

let store = undefined;
reduxStore().then(value => {
    store = value;


    ReactDOM.render(
        <React.StrictMode>
            <Provider store={store}>
                        <App />
            </Provider>
        </React.StrictMode>,
        document.getElementById('root'),
    );
    reportWebVitals();

})



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
