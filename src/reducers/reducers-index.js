import { combineReducers } from "redux";
import news from "./reducer.js";

const rootReducer = combineReducers({ news });

export default rootReducer;