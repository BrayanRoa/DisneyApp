"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generarJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generarJWT = (id = '') => {
    return new Promise((resolve, reject) => {
        const payload = { id };
        jsonwebtoken_1.default.sign(payload, process.env.SECRET_KEY || '', {
            expiresIn: '4h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se puede generar el JWT');
            }
            else {
                resolve(token);
            }
        });
    });
};
exports.generarJWT = generarJWT;
//# sourceMappingURL=generarJWT.js.map