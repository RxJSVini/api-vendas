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
exports.ResetPasswordService = void 0;
const AppError_1 = require("@shared/errors/AppError");
const typeorm_1 = require("typeorm");
const date_fns_1 = require("date-fns");
const UserRepository_1 = require("../typeorm/repositories/UserRepository");
const UserTokenRepository_1 = require("../typeorm/repositories/UserTokenRepository");
const bcryptjs_1 = require("bcryptjs");
class ResetPasswordService {
    execute({ token, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const usersRepository = (0, typeorm_1.getCustomRepository)(UserRepository_1.UserRepository);
            const userTokensRepository = (0, typeorm_1.getCustomRepository)(UserTokenRepository_1.UserTokenRepository);
            const userToken = yield userTokensRepository.findByToken(token);
            if (!userToken) {
                throw new AppError_1.AppError('User does not exists');
            }
            const user = yield usersRepository.findById(userToken.user_id);
            if (!user) {
                throw new AppError_1.AppError('User does not exists.');
            }
            const tokenCreatedAt = userToken.created_at;
            const compareDate = (0, date_fns_1.addHours)(tokenCreatedAt, 2);
            if ((0, date_fns_1.isAfter)(Date.now(), compareDate)) {
                throw new AppError_1.AppError('Token Expirado.');
            }
            user.password = yield (0, bcryptjs_1.hash)(password, 8);
            yield usersRepository.save(user);
        });
    }
}
exports.ResetPasswordService = ResetPasswordService;
