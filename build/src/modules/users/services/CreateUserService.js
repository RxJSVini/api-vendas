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
exports.CreateUserService = void 0;
const AppError_1 = require("@shared/errors/AppError");
const typeorm_1 = require("typeorm");
const UserRepository_1 = require("../typeorm/repositories/UserRepository");
const bcryptjs_1 = require("bcryptjs");
class CreateUserService {
    execute({ name, email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const usersRepository = (0, typeorm_1.getCustomRepository)(UserRepository_1.UserRepository);
            const emailExists = yield usersRepository.findByEmail(email);
            if (emailExists) {
                throw new AppError_1.AppError('Email address alredy used');
            }
            const hasPassword = yield (0, bcryptjs_1.hash)(password, 10);
            const user = usersRepository.create({
                name,
                email,
                password: hasPassword,
            });
            yield usersRepository.save(user);
            return user;
        });
    }
}
exports.CreateUserService = CreateUserService;
