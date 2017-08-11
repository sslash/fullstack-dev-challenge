const express = require("express");
const assert = require("assert");

class Router {
    constructor(app) {
        this.app = app;
        this.expressRouter = express.Router();
        this._initRouter();
    }

    _initRouter() {
        const { calculateController } = this.app.locals.controllers;

        // even though this endpoint presumably should have been a GET request,
        // I chose to make it a POST request, as I assume
        // it won't be idempotent in the future
        // (some data will probably be persisted, and side-effects will be caused)
        // also, complex calculation endpoints like these are often nice to handle 
        // as POST requests.
        this.expressRouter.post("/calculate", calculateController.calculate);
    }
}

module.exports = Router;