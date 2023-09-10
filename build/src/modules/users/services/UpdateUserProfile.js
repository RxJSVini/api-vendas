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
exports.UpdateProfileService = void 0;
const AppError_1 = require("@shared/errors/AppError");
const bcryptjs_1 = require("bcryptjs");
const typeorm_1 = require("typeorm");
const UserRepository_1 = require("../typeorm/repositories/UserRepository");
class UpdateProfileService {
    execute({ user_id, name, email, password, old_password, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const usersRepository = (0, typeorm_1.getCustomRepository)(UserRepository_1.UserRepository);
            const user = yield usersRepository.findById(user_id);
            if (!user) {
                throw new AppError_1.AppError('User not found.');
            }
            const userUpdateEmail = yield usersRepository.findByEmail(email);
            if (userUpdateEmail && userUpdateEmail.id !== user_id) {
                throw new AppError_1.AppError('There is already one user with this email.');
            }
            if (password && !old_password) {
                throw new AppError_1.AppError('Old password is required.');
            }
            if (password && old_password) {
                const checkOldPassword = yield (0, bcryptjs_1.compare)(old_password, user.password);
                if (!checkOldPassword) {
                    throw new AppError_1.AppError('Old password does not match.');
                }
                user.password = yield (0, bcryptjs_1.hash)(password, 8);
            }
            user.name = name;
            user.email = email;
            yield usersRepository.save(user);
            return user;
        });
    }
}
exports.UpdateProfileService = UpdateProfileService;
