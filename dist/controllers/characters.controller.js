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
exports.deleteCharacter = exports.putCharacter = exports.postCharacter = exports.getCharacters = void 0;
const personaje_1 = require("../db/models/personaje");
const getCharacters = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const characters = yield personaje_1.Personaje.findAll({
        attributes: ['nombre', 'imagen']
    });
    if (!characters) {
        return res.status(400).json({
            msg: 'No hay personajes aún'
        });
    }
    res.status(200).json({
        characters
    });
});
exports.getCharacters = getCharacters;
const postCharacter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, imagen, edad, peso, historia } = req.body;
    try {
        //* VALIDO SI ESE PERSONAJE YA EXISTE EN BD
        const existe = yield personaje_1.Personaje.findByPk(nombre);
        if (existe) {
            return res.status(400).json({
                msg: `El personaje ${nombre} ya esta registrado`
            });
        }
        nombre.toLowerCase();
        const personaje = yield personaje_1.Personaje.create({
            nombre, imagen, edad, peso, historia
        });
        res.json({
            personaje
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            msg: error
        });
    }
});
exports.postCharacter = postCharacter;
const putCharacter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre } = req.params;
    const { imagen, peso, historia, edad } = req.body;
    const existe = yield personaje_1.Personaje.findByPk(nombre.toLowerCase());
    if (!existe) {
        return res.status(400).json({
            msg: `El personaje ${nombre} no existe`
        });
    }
    const personaje = yield personaje_1.Personaje.update({ imagen, peso, historia, edad }, { where: { nombre } });
    res.status(200).json({
        personaje
    });
});
exports.putCharacter = putCharacter;
const deleteCharacter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre } = req.params;
    const existe = yield personaje_1.Personaje.findByPk(nombre.toLowerCase());
    if (!existe) {
        return res.status(400).json({
            msg: `El personaje ${nombre} no existe`
        });
    }
    const personaje = yield personaje_1.Personaje.update({ activo: 0 }, { where: { nombre } });
    res.status(200).json({
        personaje
    });
});
exports.deleteCharacter = deleteCharacter;
// module.exports = { getCharacters }
//# sourceMappingURL=characters.controller.js.map