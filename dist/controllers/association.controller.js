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
exports.association = void 0;
const entretenimiento_1 = __importDefault(require("../db/models/entretenimiento"));
const personaje_1 = require("../db/models/personaje");
const pelicula_personaje_1 = require("../db/models/pelicula_personaje");
const association = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { entretenimiento, personaje } = req.body;
    entretenimiento.toLowerCase();
    personaje.toLowerCase();
    const existEntertainment = yield entretenimiento_1.default.findByPk(entretenimiento);
    const existCharcater = yield personaje_1.Personaje.findByPk(personaje);
    if (!existCharcater || !existEntertainment) {
        return res.status(400).json({
            msg: `Personaje ${personaje} o entretenimiento ${entretenimiento} no existe`
        });
    }
    const relationship = yield pelicula_personaje_1.PeliculaPersonaje.create({
        PersonajeNombre: personaje,
        entretenimientoTitulo: entretenimiento
    });
    res.status(200).json({
        relationship
    });
});
exports.association = association;
//# sourceMappingURL=association.controller.js.map