import get from "lodash/get";
import keys from "lodash/keys";
import { setRates } from "../utils/convertRates";

/* CONSTANTS */
const FETCH_RATES = "@finimize:currencies:fetchRates";
const FETCH_RATES_SUCCESS = "@finimize:currencies:fetchRates_success";
const FETCH_RATES_FAILURE = "@finimize:currencies:FETCH_RATES_failure";

/* ACTIONS */

export const requestRates = () => ({ type: FETCH_RATES });

export const receiveRates = rates => {
    setRates(rates);
    const selectableCurrencies = keys(get(rates, "rates", {}));
    return { type: FETCH_RATES_SUCCESS, selectableCurrencies };
};

export const handleFetchRates = fetchRatesError => ({
    type: FETCH_RATES_FAILURE,
    fetchRatesError
});

export const fetchRates = () => {
    return (dispatch, getState, api) => {
        dispatch(requestRates());

        return api
            .fetchRates()
            .then(payload => dispatch(receiveRates(payload)))
            .catch(error => dispatch(handleFetchRates(error)));
    };
};

/* REDUCER */

const INITIAL_STATE = {
    isFetching: false,
    selectableCurrencies: [],
    fetchRatesError: null
};

const internals = {
    [FETCH_RATES]: (state, action) => ({
        ...state,
        fetchRatesError: null,
        isFetching: true
    }),

    [FETCH_RATES_SUCCESS]: (state, { selectableCurrencies }) => ({
        ...state,
        isFetching: false,
        selectableCurrencies
    }),

    [FETCH_RATES_FAILURE]: (state, { fetchRatesError }) => ({
        ...state,
        isFetching: false,
        fetchRatesError
    })
};

const reducer = (state = INITIAL_STATE, action) => {
    if (internals[action.type]) {
        return internals[action.type](state, action);
    } else {
        return state;
    }
};

export default reducer;
