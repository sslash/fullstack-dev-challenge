const express = require("express");
const bodyParser = require("body-parser");
const requestLogger = require("morgan");
const cors = require("cors");
const expressValidator = require("express-validator");
const Router = require("./router");

// controllers
const CalculateController = require("./calculateController");

class CreateApp {
    start() {
        this._createApp();
        this._initControllers();        
        this._initMiddleware();
    }

    _createApp() {
        this.app = express();
    }

    _initControllers() {
        this.app.locals.controllers = {
            calculateController: new CalculateController(this.app)
        };
    }

    _initMiddleware() {
        process.env.NODE_ENV !== "production" &&
        this.app.use(requestLogger("tiny"));
        this.app.use(cors());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        this.app.use(expressValidator({
            customSanitizers: {
                toFloat: value => parseFloat(value)
            }
        }));

        const router = new Router(this.app);
        this.app.use("/api", router.expressRouter);
        this.app.use((err, req, res, next) => {
            console.log("Failed to handle request", err);
            res.status(err.status || 500).send({ errorMessage: err.message })
        });
    }
}

module.exports = CreateApp;
