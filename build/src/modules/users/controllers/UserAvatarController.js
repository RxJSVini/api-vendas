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
exports.UserAvatarController = void 0;
const UpdateUserAvatarService_1 = require("../services/UpdateUserAvatarService");
class UserAvatarController {
    update(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const updateAvatar = new UpdateUserAvatarService_1.UpdateUserAvatarService();
            const user = yield updateAvatar.execute({
                user_id: req.user.id,
                avatarFilename: `${(_a = req.file) === null || _a === void 0 ? void 0 : _a.filename}`
            });
            return res.json(user);
        });
    }
}
exports.UserAvatarController = UserAvatarController;
