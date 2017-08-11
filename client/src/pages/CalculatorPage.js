import React, { Component } from "react";
import { connect } from "react-redux";
import CalculatorPageUI from "./Calculator.ui";
import { calculate, changeCurrency } from "../ducks/interestCalculator";
import { fetchRates } from "../ducks/currencies";
import debounce from "lodash/debounce";

class CalculatorPage extends Component {
    constructor(props) {
        super(props);
        this.onCalculate = debounce(props.calculate, 500);
    }

    componentDidMount() {
        this.props.fetchRates();
    }

    render() {
        const {
            preferences,
            selectedCurrency,
            ...requestProps
        } = this.props.interestCalculator;
        return (
            <CalculatorPageUI
                onCalculate={this.onCalculate}
                handleChangeCurrency={this.props.changeCurrency}
                selectableCurrencies={this.props.selectableCurrencies}
                selectedCurrency={selectedCurrency}
                {...preferences}
                {...requestProps}
            />
        );
    }
}

export default connect(
    ({ interestCalculator, currencies }) => ({
        interestCalculator,
        selectableCurrencies: currencies.selectableCurrencies
    }),
    {
        calculate,
        fetchRates,
        changeCurrency
    }
)(CalculatorPage);
