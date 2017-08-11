import React from "react";
import CurrencyInput from "../components/CurrencyInput";
import SliderInput from "../components/SliderInput";
import DisplayGraph from "../components/DisplayGraph";
import InterestFrequency from "../components/InterestFrequency";

import "./CalculatorPage.css";

const CalculatorUI = ({
    onCalculate,
    selectedCurrency,
    handleChangeCurrency,
    selectableCurrencies,
    ...props
}) =>
    <div className="App">
        <div className="header-banner">
            <h1 className="fmz-white-font">
                Finimize Interest Rate Calculator
            </h1>
        </div>
        <div className="currencies">
            <p>Select currency</p>
            {selectableCurrencies &&
                selectableCurrencies.map(currency =>
                    <label className="currency-radio" key={currency}>
                        <input
                            type="radio"
                            value={currency}
                            checked={currency === selectedCurrency}
                            name="frequency"
                            onChange={(e) => handleChangeCurrency(e.target.value)}
                        />
                        {currency}
                    </label>
                )}
        </div>
        <div className="financial-inputs">
            <p className="input-label">How much have you saved?</p>
            <CurrencyInput
                currency={selectedCurrency}
                defaultValue={props.savings}
                onChange={savings => onCalculate({ savings })}
            />

            <p className="input-label">How much will you save each month?</p>
            <CurrencyInput
                currency={selectedCurrency}
                defaultValue={props.monthlyDeposit}
                onChange={monthlyDeposit => onCalculate({ monthlyDeposit })}
            />

            <p className="input-label">
                How much interest will you earn per year?
            </p>
            <SliderInput
                defaultValue={props.interestRate}
                onChange={interestRate => onCalculate({ interestRate })}
            />
            <p className="input-label">How often will interest be payed?</p>
            <InterestFrequency
                defaultValue={props.interestFrequency}
                onChange={interestFrequency =>
                    onCalculate({ interestFrequency })}
            />
        </div>
        <div className="financial-display">
            {/*We have included some sample data here, you will need to replace this
					with your own. Feel free to change the data structure if you wish.*/}
            {props.isCalculating && <p>Loading...</p>}
            {props.calculationResult &&
                <DisplayGraph data={props.calculationResult} />}
        </div>
    </div>;

export default CalculatorUI;
