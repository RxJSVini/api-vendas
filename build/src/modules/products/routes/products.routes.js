"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRouter = void 0;
const express_1 = require("express");
const ProductsController_1 = require("@modules/products/controllers/ProductsController");
const celebrate_1 = require("celebrate");
exports.productsRouter = (0, express_1.Router)();
const productsController = new ProductsController_1.ProductsControler();
exports.productsRouter.get('/', productsController.index);
exports.productsRouter.get('/:id', (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: {
        id: celebrate_1.Joi.string().required(),
    },
}), productsController.show);
exports.productsRouter.post('/', (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: {
        name: celebrate_1.Joi.string().required(),
        price: celebrate_1.Joi.number().precision(2).required(),
        quantity: celebrate_1.Joi.number().required(),
    },
}), productsController.create);
exports.productsRouter.put('/:id', (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: {
        id: celebrate_1.Joi.string().required(),
    },
    [celebrate_1.Segments.BODY]: {
        name: celebrate_1.Joi.string().required(),
        price: celebrate_1.Joi.number().precision(2).required(),
        quantity: celebrate_1.Joi.number().required(),
    },
}), productsController.update);
exports.productsRouter.delete('/:id', (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: {
        id: celebrate_1.Joi.string().required(),
    }
}), productsController.delete);
