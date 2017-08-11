import { convertRates } from "../utils/convertRates";
import constants from "../utils/appConstants";
/* CONSTANTS */
export const CALCULATE = "@finimize:interestCalculator:calculate";
export const CALCULATE_SUCCESS = "@finimize:interestCalculator:calculate_success";
export const CALCULATE_FAILURE = "@finimize:interestCalculator:calculate_failure";

const CHANGE_CURRENCY = "@finimize:interestCalculator:change_currency";

/* ACTIONS */

export const requestCalculate = preferences => ({
    type: CALCULATE,
    preferences
});

export const receiveCalculation = calculationResult => ({
    type: CALCULATE_SUCCESS,
    calculationResult
});

export const handleCalculationError = calculationError => ({
    type: CALCULATE_FAILURE,
    calculationError
});

export const calculate = (preferences = {}) => {
    return (dispatch, getState, api) =>
        _runCalculation(preferences, dispatch, getState(), api);
};

const _runCalculation = (newPreferences, dispatch, state, api) => {
    const updatedPreferences = _updatePreferences(
        state.interestCalculator.preferences,
        newPreferences
    );

    dispatch(requestCalculate(updatedPreferences));

    return api
        .calculate(updatedPreferences)
        .then(payload => dispatch(receiveCalculation(payload)))
        .catch(error => dispatch(handleCalculationError(error)));
};

const _updatePreferences = (oldPrefs, newPrefs) => ({
    ...oldPrefs,
    ...newPrefs
});

const _convertPreferences = (
    { savings, monthlyDeposit },
    fromCurrency,
    toCurrency
) => ({
    savings: convertRates(savings, fromCurrency, toCurrency),
    monthlyDeposit: convertRates(monthlyDeposit, fromCurrency, toCurrency)
});

export const changeCurrency = toCurrency => {
    return (dispatch, getState, api) => {
        const { preferences, selectedCurrency } = getState().interestCalculator;
        const newPreferences = _updatePreferences(
                preferences,
                _convertPreferences(
                    preferences,
                    selectedCurrency,
                    toCurrency
                )
            );

        dispatch({
            type: CHANGE_CURRENCY,
            selectedCurrency: toCurrency,
            preferences: newPreferences
        });

        return _runCalculation(newPreferences, dispatch, getState(), api);
    };
};

/* REDUCER */

export const INITIAL_STATE = {
    isCalculating: false,
    calculationResult: null,
    calculationError: null,

    selectedCurrency: "GBP",

    preferences: {
        savings: 0,
        monthlyDeposit: 0,
        interestRate: 4,
        interestFrequency: constants.calculations.MONTHLY
    }
};

const internals = {
    [CALCULATE]: (state, { preferences }) => ({
        ...state,
        calculationError: null,
        isCalculating: true,
        preferences
    }),

    [CALCULATE_SUCCESS]: (state, { calculationResult }) => ({
        ...state,
        isCalculating: false,
        calculationResult
    }),

    [CALCULATE_FAILURE]: (state, { calculationError }) => ({
        ...state,
        isCalculating: false,
        calculationError
    }),

    [CHANGE_CURRENCY]: (state, { selectedCurrency, preferences }) => ({
        ...state,
        selectedCurrency,
        preferences
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
