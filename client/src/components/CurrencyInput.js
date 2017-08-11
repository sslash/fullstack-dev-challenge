import React, { Component } from "react";
import PropTypes from "prop-types";
import "./CurrencyInput.css";

export default class CurrencyInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasFocus: false,
            value: props.defaultValue
        };
    }

    componentWillReceiveProps({ defaultValue }) {
        if (defaultValue !== this.state.value) {
            console.log(`🐓 !! ${defaultValue}`);
            this.setState({ value: defaultValue});
        }
    }

    handleChange = e => {
        const { value } = e.target;
        this.props.onChange(parseFloat(e.target.value));
        this.setState({ value });
    };

    handleFocus = e => {
        this.setState({
            hasFocus: true
        });
    };

    render() {
        const { value } = this.state;
        const {currency} = this.props;

        return (
            <div
                className={`currency-input ${value !== undefined
                    ? "default-value"
                    : ""}`}
            >
                <span>{currency}</span>
                <input
                    type="number"
                    value={value}
                    onChange={this.handleChange}
                    onFocus={this.handleFocus}
                />
            </div>
        );
    }
}

CurrencyInput.propTypes = {
    defaultValue: PropTypes.number
};
