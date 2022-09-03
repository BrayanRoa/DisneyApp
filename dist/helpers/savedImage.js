"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
// const extensionesValidas = ['png', 'jpeg', 'jpg', 'gif']
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        const folder = req.params.coleccion;
        cb(null, `uploads/${folder}`);
    },
    filename: function (req, file, cb) {
        // const extension = file.mimetype.split('/');
        // if (!) {
        //   throw new Error(`La extension ${extension} no es valida`)
        // }
        cb(null, `${file.originalname}`);
    }
});
exports.upload = (0, multer_1.default)({ storage: storage });
//# sourceMappingURL=savedImage.js.map