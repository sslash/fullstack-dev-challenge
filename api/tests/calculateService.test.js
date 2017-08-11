const {expect} = require('chai');
const CalculateService = require('../calculateService');
const service = new CalculateService({});

describe("calculateService", () => {
    it("should calculate", () => {
        const currency = "USD";
        const interestFrequency = "Quarterly";
        const interestRate = 2;
        const monthlyDeposit = 2;
        const savings = 0;

        return service.calculate({currency, interestFrequency, interestRate, monthlyDeposit, savings})
        .then(result => {
            expect(result.length).to.equal(50 * 12);
            expect(result[0].amount).to.equal(2);            
            expect(result[3].amount).to.equal(8.4);
            expect(result[49].amount).to.equal(314.23999999999995);
        });
    });

    it("should calculate", () => {
        const currency = "USD";
        const interestFrequency = "Monthly";
        const interestRate = 2;
        const monthlyDeposit = 2;
        const savings = 3;

        return service.calculate({currency, interestFrequency, interestRate, monthlyDeposit, savings})
        .then(result => {
            expect(result[0].amount).to.equal(5.1);
            expect(result[49].amount).to.equal(2312.9999999999995);
        });
    });
});
