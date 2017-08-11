import React, { Component } from "react";
import { Provider } from "react-redux";
import createStore from "./utils/reduxStore";
import CalculatorPage from "./pages/CalculatorPage";

class App extends Component {
    constructor(props) {
        super(props);
        this.store = createStore();
    }

    render() {
        return (
            <Provider store={this.store}>
                <CalculatorPage onCalculate={this.onCalculate} />
            </Provider>
        );
    }
}

export default App;
