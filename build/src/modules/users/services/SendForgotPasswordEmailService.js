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
exports.SendForgotPasswordEmailService = void 0;
const AppError_1 = require("@shared/errors/AppError");
const typeorm_1 = require("typeorm");
const UserRepository_1 = require("../typeorm/repositories/UserRepository");
const UserTokenRepository_1 = require("../typeorm/repositories/UserTokenRepository");
const EtherealMail_1 = require("@config/mail/EtherealMail");
const path_1 = __importDefault(require("path"));
class SendForgotPasswordEmailService {
    execute({ email }) {
        return __awaiter(this, void 0, void 0, function* () {
            const usersRepository = (0, typeorm_1.getCustomRepository)(UserRepository_1.UserRepository);
            const userTokensRepository = (0, typeorm_1.getCustomRepository)(UserTokenRepository_1.UserTokenRepository);
            const user = yield usersRepository.findByEmail(email);
            if (!user) {
                throw new AppError_1.AppError('User does not exists');
            }
            const { token } = yield userTokensRepository.generate(user.id);
            const forgotPasswordTemplate = path_1.default.resolve(__dirname, '..', 'views', 'forgot_password.hbs');
            yield EtherealMail_1.EtherealMail.sendMail({
                to: {
                    name: user.name,
                    email: user.email,
                },
                subject: '[ API Vendas ] Reperação de Senha',
                templateData: {
                    file: forgotPasswordTemplate,
                    variables: {
                        name: user.name,
                        link: `http://localhost:3000/reset_password?token${token}`,
                    },
                },
            });
        });
    }
}
exports.SendForgotPasswordEmailService = SendForgotPasswordEmailService;
