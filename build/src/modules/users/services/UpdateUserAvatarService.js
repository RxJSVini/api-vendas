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
exports.UpdateUserAvatarService = void 0;
const AppError_1 = require("@shared/errors/AppError");
const typeorm_1 = require("typeorm");
const UserRepository_1 = require("../typeorm/repositories/UserRepository");
const uploads_1 = __importDefault(require("@config/uploads"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class UpdateUserAvatarService {
    execute({ user_id, avatarFilename }) {
        return __awaiter(this, void 0, void 0, function* () {
            const usersRepository = (0, typeorm_1.getCustomRepository)(UserRepository_1.UserRepository);
            const user = yield usersRepository.findById(user_id);
            if (!user) {
                throw new AppError_1.AppError('User not found');
            }
            if (user.avatar) {
                const userAvatarFilePath = path_1.default.join(uploads_1.default.directory, user.avatar);
                const userAvatarFileExists = yield fs_1.default.promises.stat(userAvatarFilePath);
                if (userAvatarFileExists) {
                    yield fs_1.default.promises.unlink(`${userAvatarFileExists}`);
                }
            }
            user.avatar = avatarFilename;
            return user;
        });
    }
}
exports.UpdateUserAvatarService = UpdateUserAvatarService;
