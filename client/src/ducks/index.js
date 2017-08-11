import { combineReducers } from "redux";

import interestCalculator from "./interestCalculator";
import currencies from "./currencies";


const rootReducer = combineReducers({
    interestCalculator,
    currencies
});

export default rootReducer;
