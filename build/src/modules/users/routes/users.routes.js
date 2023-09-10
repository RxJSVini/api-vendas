"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = require("express");
const UserController_1 = __importDefault(require("../controllers/UserController"));
const celebrate_1 = require("celebrate");
const isAuthenticated_1 = require("@shared/http/middlewares/isAuthenticated");
const multer_1 = __importDefault(require("multer"));
const uploads_1 = __importDefault(require("@config/uploads"));
const UserAvatarController_1 = require("../controllers/UserAvatarController");
const usersRouter = (0, express_1.Router)();
exports.usersRouter = usersRouter;
const usersAvatarController = new UserAvatarController_1.UserAvatarController();
const usersController = new UserController_1.default();
const upload = (0, multer_1.default)(uploads_1.default);
usersRouter.post('/', (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: {
        name: celebrate_1.Joi.string().required(),
        email: celebrate_1.Joi.string().email().required(),
        password: celebrate_1.Joi.string().required(),
    },
}), usersController.create);
usersRouter.patch('/avatar', isAuthenticated_1.isAuthenticated, upload.single('avatar'), usersAvatarController.update);
usersRouter.get('/', isAuthenticated_1.isAuthenticated, usersController.index);
