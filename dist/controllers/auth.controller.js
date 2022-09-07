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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = exports.getUsuario = exports.getUsuarios = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const generarJWT_1 = require("../helpers/generarJWT");
const mailer_1 = __importDefault(require("../helpers/mailer"));
const tipo_documento_1 = require("../db/models/tipo_documento");
const usuarios_models_1 = require("../db/models/usuarios.models");
const getUsuarios = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuarios = yield usuarios_models_1.Usuarios.findAll({
            // attributes:['nombre', 'apellido'],
            where: { activo: 1 },
            include: { model: tipo_documento_1.TipoDocumento }
        });
        res.json({
            usuarios
        });
    }
    catch (error) {
        res.status(400).json({
            error
        });
    }
});
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const usuario = yield usuarios_models_1.Usuarios.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg: `No existe usuario con id ${id}`
            });
        }
        res.json({
            usuario
        });
    }
    catch (error) {
        res.status(400).json({
            error
        });
    }
});
exports.getUsuario = getUsuario;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { password } = _a, usuario = __rest(_a, ["password"]);
    try {
        //* VALIDÓ SI EL USUARIO YA ESTA EN LA BD
        const existe = yield usuarios_models_1.Usuarios.findByPk(usuario.documento);
        if (existe) {
            return res.json({
                msg: 'El usuario ya esta registrado'
            });
        }
        //* ENCRIPTO CONTRASEÑA
        const sal = bcrypt_1.default.genSaltSync();
        usuario.password = bcrypt_1.default.hashSync(password, sal);
        const msg = {
            to: usuario.correo,
            from: process.env.EMAIL,
            subject: 'Disney Rest API',
            text: `Hi ${usuario.nombre}`,
            html: `
        <h1>Welcome to DISNEY REST API</h1>
        <strong>thanks for using our disneyRest API</strong>
        ${usuario.nombre} ${usuario.apellido} hope you're well
        `,
        };
        yield mailer_1.default
            .send(msg)
            .then((response) => {
            console.log(response[0].statusCode);
            console.log(response[0].headers);
        })
            .catch((error) => {
            console.error(error);
        });
        //* GUARDO EN BASE DE DATOS
        yield usuarios_models_1.Usuarios.create(usuario);
        res.json({
            usuario
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error: error
        });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { documento, password } = req.body;
    try {
        const usuario = yield usuarios_models_1.Usuarios.findByPk(documento);
        if (!usuario) {
            return res.status(400).json({
                msg: `No existe un usuario con documento: ${documento}`
            });
        }
        if (!bcrypt_1.default.compareSync(password, usuario === null || usuario === void 0 ? void 0 : usuario.password)) {
            return res.status(400).json({
                msg: 'Contraseña incorrecta'
            });
        }
        if (!(usuario === null || usuario === void 0 ? void 0 : usuario.activo)) {
            return res.status(400).json({
                msg: 'Usuario inactivo hable con el administrador'
            });
        }
        const token = yield (0, generarJWT_1.generarJWT)(usuario === null || usuario === void 0 ? void 0 : usuario.documento);
        res.json({
            usuario,
            token
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: 'hable con el administrador',
            error
        });
    }
});
exports.login = login;
//# sourceMappingURL=auth.controller.js.map