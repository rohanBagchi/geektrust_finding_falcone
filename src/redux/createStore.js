import { createStore } from "redux";
import rootReducer from "./rootReducer";

let devToolsExtension = f => f;
if (process.env.NODE_ENV === "development" && window.devToolsExtension) {
    devToolsExtension = window.devToolsExtension();
}

const initialState = {};

export default createStore(
    rootReducer,
    initialState,
    devToolsExtension
);
