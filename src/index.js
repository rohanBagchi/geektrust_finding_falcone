import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import store from './redux/createStore';
import "./index.css";
import AppContainer from "./AppContainer";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.getElementById("root"));
registerServiceWorker();
