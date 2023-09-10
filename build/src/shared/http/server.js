"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const AppError_1 = require("@shared/errors/AppError");
const cors_1 = __importDefault(require("cors"));
require("@shared/typeorm");
require("reflect-metadata");
const routes_1 = require("./routes");
const celebrate_1 = require("celebrate");
const uploads_1 = __importDefault(require("@config/uploads"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/files', express_1.default.static(uploads_1.default.directory));
app.use('/api', routes_1.routes);
app.use((0, celebrate_1.errors)());
app.use((error, request, response, next) => {
    if (error instanceof AppError_1.AppError) {
        return response.status(error.statusCode).json({
            status: 'error',
            message: error.message,
        });
    }
    console.log(error);
    return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
});
app.listen(3333, () => console.log('Server was started at 3333 port'));
