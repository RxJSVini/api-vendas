"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const products_routes_1 = require("@modules/products/routes/products.routes");
const users_routes_1 = require("@modules/users/routes/users.routes");
const sessions_routes_1 = require("@modules/users/routes/sessions.routes");
const password_routes_1 = require("@modules/users/routes/password.routes");
exports.routes = express_1.default.Router();
exports.routes.use('/products', products_routes_1.productsRouter);
exports.routes.use('/users', users_routes_1.usersRouter);
exports.routes.use('/sessions', sessions_routes_1.sessionsRouter);
exports.routes.use('/password', password_routes_1.passwordRouter);
exports.routes.get('/ping', (req, res) => {
    return res.send('ok');
});
