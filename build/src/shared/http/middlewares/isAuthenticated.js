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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const auth_1 = __importDefault(require("@config/auth"));
function isAuthenticated(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(400).json({
                status: 400,
                error: 'JWT Token is missing.',
            });
        }
        const [, token] = authHeader.split(' ');
        try {
            const decodeToken = (0, jsonwebtoken_1.verify)(token, auth_1.default.secret);
            const { sub } = decodeToken;
            req.user = {
                id: sub,
            };
            console.log(decodeToken);
            return next();
        }
        catch (error) {
            if (error instanceof jsonwebtoken_1.TokenExpiredError) {
                res.status(401).json({
                    status: 403,
                    error: 'JWT Token has expired.',
                });
            }
            if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
                res.status(401).json({
                    status: 403,
                    error: 'JWT Token Error.',
                });
            }
        }
    });
}
exports.isAuthenticated = isAuthenticated;
