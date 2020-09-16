import { createStore, applyMiddleware, compose } from "redux";

import rootReducer from "../reducer/rootReducer.js";
import thunk from "redux-thunk";
// import logger from 'redux-logger';

const store = createStore(
    rootReducer,

    compose(applyMiddleware(thunk))

);

export default store;
