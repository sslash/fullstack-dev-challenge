import fx from "money";

export const setRates = ({ rates }) => {
    fx.rates = rates;
};

export const convertRates = (baseValue, fromCurrency, toCurrency) => {
    return fx(baseValue).from(fromCurrency).to(toCurrency).toFixed(4);
};
