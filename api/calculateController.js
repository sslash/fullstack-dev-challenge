const CalculateService = require("./CalculateService");

class CalculateController {
    constructor(app) {
        this.app = app;
        this.calculateService = new CalculateService(app);

        this.calculate = this.calculate.bind(this);
    }

    calculate(req, res, next) {
        req.checkBody("savings", "Savings must be included").notEmpty();
        req.checkBody("monthlyDeposit", "monthlyDeposit must be included").notEmpty();
        req.checkBody("interestRate", "interestRate must be included").notEmpty();
        req.checkBody("interestFrequency", "interestFrequency must be included").notEmpty();

        req.sanitize('savings').toFloat();
        req.sanitize('monthlyDeposit').toFloat();
        req.sanitize('interestRate').toFloat();

        this._validate(req)
            .then(() => 
                this.calculateService.calculate(req.body)
            )
            .then(result => res.send({ result }))
            .catch(next);
    }

    _validate(req) {
        return req.getValidationResult().then(validationResult => {
            if (!validationResult.isEmpty()) {
                return Promise.reject({
                    status: 400,
                    message: validationResult.array()
                });
            }
        });
    }
}

module.exports = CalculateController;
