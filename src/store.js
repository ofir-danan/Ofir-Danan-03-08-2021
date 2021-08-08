import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import userPref from "./reducers";

const store = createStore(userPref, applyMiddleware(thunkMiddleware));

export default store;
