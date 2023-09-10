"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const crypto_1 = __importDefault(require("crypto"));
const uploadFolder = path_1.default.resolve(__dirname, '..', '..', 'uploads');
exports.default = {
    directory: uploadFolder,
    storage: multer_1.default.diskStorage({
        destination: uploadFolder,
        filename(req, file, cb) {
            const fileHash = crypto_1.default.randomBytes(10).toString('hex');
            const filename = `${fileHash}-${file.originalname}`;
            cb(null, filename);
        },
    })
};
