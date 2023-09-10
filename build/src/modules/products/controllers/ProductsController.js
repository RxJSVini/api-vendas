"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsControler = void 0;
const ListProductService_1 = require("../services/ListProductService");
const ShowProductService_1 = require("../services/ShowProductService");
const UpdateProductService_1 = require("../services/UpdateProductService");
const CreateProductService_1 = require("../services/CreateProductService");
const DeleteProductService_1 = require("../services/DeleteProductService");
class ProductsControler {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const listProducts = new ListProductService_1.ListProductService();
            const products = yield listProducts.execute();
            return res.status(200).json(products);
        });
    }
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const showProduct = new ShowProductService_1.ShowProductService();
            const product = yield showProduct.execute({ id });
            return res.status(200).json(product);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, price, quantity } = req.body;
            const createProduct = new CreateProductService_1.CreateProductService();
            const product = yield createProduct.execute({
                name,
                price,
                quantity,
            });
            return res.status(201).json(product);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, price, quantity } = req.body;
            const { id } = req.params;
            const updateProduct = new UpdateProductService_1.UpdateProductService();
            const product = yield updateProduct.execute({
                id,
                name,
                price,
                quantity,
            });
            return res.status(200).json(product);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const deleteProduct = new DeleteProductService_1.DeleteProductService();
            yield deleteProduct.execute({ id });
            return res.end();
        });
    }
}
exports.ProductsControler = ProductsControler;
