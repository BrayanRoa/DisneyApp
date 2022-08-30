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
exports.validarJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usuarios_models_1 = require("../db/models/usuarios.models");
const validarJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }
    try {
        //* OBTENGO EL DOC DEL USUARIO 
        const { id } = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY || '');
        //* LO BUSCO EN LA BASE DE DATOS
        const usuario = yield usuarios_models_1.Usuarios.findByPk(id);
        if (!usuario) {
            return res.status(500).json({
                msg: 'Token no valido - Usuario no registrado en BD'
            });
        }
        //* verificar si el usuario que desea hacer la accion aun sigue activo
        if (!(usuario === null || usuario === void 0 ? void 0 : usuario.activo)) {
            return res.status(401).json({
                msg: 'Token no valido - usuario inactivo para realizar esta acción'
            });
        }
        req.usuario = usuario;
        req.uid = id.toString();
        next();
    }
    catch (error) {
        res.status(401).json({
            msg: 'Token no valido',
            error
        });
    }
});
exports.validarJWT = validarJWT;
//# sourceMappingURL=validarJWT.js.map