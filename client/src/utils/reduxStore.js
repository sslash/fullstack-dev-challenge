import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import reducers from "../ducks";
import Api from "../utils/Api";

export default ({ api = new Api()} = {}) => {
    return createStore(
        reducers,
        applyMiddleware(thunkMiddleware.withExtraArgument(api))
    );
};
