import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import store from './redux/createStore';
import AppContainer from "./AppContainer";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";
import "./bootstrap.4.0.0.min.css";

ReactDOM.render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.getElementById("root"));
registerServiceWorker();
