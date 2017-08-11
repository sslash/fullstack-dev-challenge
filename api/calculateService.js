const _ = require('lodash');
const appConstants = require('../shared/utils/appConstants');

const TOTAL_DURATION_IN_YEARS = 50;
const TOTAL_MONTHS = TOTAL_DURATION_IN_YEARS * 12;

const interestIntervals = {
    [appConstants.calculations.MONTHLY]: 1,
    [appConstants.calculations.QUARTERLY]: 4,
    [appConstants.calculations.ANNUALLY]: 12
}

class CalculateService {
    constructor(app) {
        this.app = app;
        this.calculate = _.memoize(this._calculate.bind(this), JSON.stringify);
    }

    _calculate({interestFrequency, interestRate, monthlyDeposit, savings}) {
        const interestInterval = interestIntervals[interestFrequency];
        let calculatorFn = this._createCalculatorFn({interestInterval, interestRate, monthlyDeposit, savings});
        const monthsArr = _.range(1, TOTAL_MONTHS + 1);

        return Promise.resolve(monthsArr.map(calculatorFn));
    }

    _createCalculatorFn({interestInterval, interestRate, monthlyDeposit, savings}) {
        const calculatedRate = interestRate / 100;
        const interest = (savings * calculatedRate) + (monthlyDeposit * calculatedRate);
        let amount = savings;
        let currentInterest = 0;

        return (month) => {
            amount += monthlyDeposit;
            currentInterest += interest * month;

            if (this._shouldAddInterest(interestInterval, month)) {
                amount += currentInterest;
            }

            return {
                month,
                amount
            };
        }
    }

    _shouldAddInterest (interestInterval, month) {
        return month % interestInterval === 0; // if interest will be added the first month, then add || month === 1;
    }
}

module.exports = CalculateService;
