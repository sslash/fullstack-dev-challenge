import React, { Component } from "react";
import constants from '../utils/appConstants';
import "./InterestFrequency.css";

const {calculations: {MONTHLY, QUARTERLY, ANNUALLY}} = constants;

class InterestFrequency extends Component {

    constructor(props) {
		super(props);
		this.state = {
			value: props.defaultValue
		};
	}

	handleChange = (e) => {
		const {value} = e.target;
		this.props.onChange(e.target.value);
		this.setState({value});
	}

    render() {
        const {value} = this.state;
        return (
            <form>
                <div className="freq-radio">
                    <label>
                        <input
                            type="radio"
                            value={MONTHLY}
                            name="frequency"
                            checked={value === MONTHLY}
                            onChange={this.handleChange}
                        />
                        {MONTHLY}
                    </label>
                </div>
                <div className="freq-radio">
                    <label>
                        <input
                            type="radio"
                            checked={value === QUARTERLY}
                            name="frequency"
                            value={QUARTERLY}
                            onChange={this.handleChange}
                        />
                        {QUARTERLY}
                    </label>
                </div>
                <div className="freq-radio">
                    <label>
                        <input
                            type="radio"
                            value={ANNUALLY}
                            checked={value === ANNUALLY}
                            onChange={this.handleChange}
                        />
                        {ANNUALLY}
                    </label>
                </div>
            </form>
        );
    }
}

export default InterestFrequency;
