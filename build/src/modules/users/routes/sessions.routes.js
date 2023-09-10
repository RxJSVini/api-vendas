"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionsRouter = void 0;
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const SessionsController_1 = require("../controllers/SessionsController");
const sessionsRouter = (0, express_1.Router)();
exports.sessionsRouter = sessionsRouter;
const sessionsController = new SessionsController_1.SessionsController();
sessionsRouter.post('/', (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: {
        email: celebrate_1.Joi.string().email().required(),
        password: celebrate_1.Joi.string().required(),
    },
}), sessionsController.create);
