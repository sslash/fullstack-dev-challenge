import axios from "axios";
import get from "lodash/get";

class ApiError extends Error {
    constructor(message) {
        super(message, 400);
    }
}

class Api {
    constructor({apiRequest, ratesRequest} = {}) {
        this.createRequest({ apiRequest, ratesRequest });
    }

    createRequest ({ apiRequest, ratesRequest }) {
        this.apiRequest = apiRequest || axios.create({
            baseURL: 'http://localhost:3001/api'
        });

        this.ratesRequest = ratesRequest || axios.create({
            baseURL: 'http://api.fixer.io/latest'
            
        })
    }

    fetchRates () {
        return this.ratesRequest.get("http://api.fixer.io/latest")
            .then(this._formatRatesResult);
    }

    _formatRatesResult ({ data }) { return data; }

    calculate(params) {
        return this.apiRequest
            .post("/calculate", params)
            .then(this._formatCalculateResult)
            .catch(this._formatError);
    }

    _formatCalculateResult({ data }) { return data.result; }

    _formatError(error) {
        const errorMessage = get(
            error,
            "errorMessage",
            "Something went wrong! Please try again later"
        );

        throw new ApiError(errorMessage);
    }
}

export default Api;
