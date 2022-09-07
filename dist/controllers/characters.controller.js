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
exports.association = exports.getDetailsCharacters = exports.getCharacter = exports.deleteCharacter = exports.putCharacter = exports.postCharacter = exports.getCharacters = void 0;
const personaje_1 = require("../db/models/personaje");
const entretenimiento_1 = __importDefault(require("../db/models/entretenimiento"));
const pelicula_personaje_1 = require("../db/models/pelicula_personaje");
//* ALL CHARACTERS
const getCharacters = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const personajes = yield personaje_1.Personaje.findAll({
            attributes: ['nombre', 'imagen'],
            where: { activo: 1 }
        });
        if (!personajes) {
            return res.status(400).json({
                msg: 'No hay personajes aún'
            });
        }
        res.status(200).json({
            personajes
        });
    }
    catch (error) {
        res.status(400).json({
            error
        });
    }
});
exports.getCharacters = getCharacters;
//* CREATE CHARACTER
const postCharacter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nameMovie = req.query.titulo || '';
    const { nombre, edad, peso, historia, entretenimientoTitulo } = req.body;
    try {
        const movie = yield entretenimiento_1.default.findByPk(nameMovie);
        if (!movie) {
            return res.status(400).json({
                msg: `No existe una pelicula con nombre ${nameMovie} - debes crearla primero para agregar personajes`
            });
        }
        //* VALIDO SI ESE PERSONAJE YA EXISTE EN BD
        const existe = yield personaje_1.Personaje.findByPk(nombre);
        if (existe) {
            return res.status(400).json({
                msg: `El personaje ${nombre} ya esta registrado`
            });
        }
        nombre.toLowerCase();
        const personaje = yield personaje_1.Personaje.create({
            nombre,
            imagen: 'https://res.cloudinary.com/dmaqkkeno/image/upload/v1662502752/png-transparent-the-walt-disney-company-business-logo-sign-21st-century-fox-business-text-people-logo_bax2s0.png',
            edad,
            peso,
            historia,
            entretenimientoTitulo
        });
        const association = yield pelicula_personaje_1.PeliculaPersonaje.create({
            PersonajeNombre: nombre,
            entretenimientoTitulo: movie.titulo.trim()
        });
        res.json({
            personaje,
            association
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
//* UPDATE ONE CHARACTER
const putCharacter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre } = req.params;
    const { imagen, peso, historia, edad } = req.body;
    try {
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
    }
    catch (error) {
        res.status(400).json({
            error
        });
    }
});
exports.putCharacter = putCharacter;
//* DELETE ONE CHARACTER
const deleteCharacter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre } = req.params;
    try {
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
    }
    catch (error) {
        res.status(400).json({
            error
        });
    }
});
exports.deleteCharacter = deleteCharacter;
//* GET ONE CHARACTER
const getCharacter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let character;
    try {
        character = yield personaje_1.Personaje.findByPk(req.params.nombre, {
            include: {
                model: entretenimiento_1.default,
                through: {
                    attributes: []
                }
            }
        });
        if (!character) {
            return res.status(400).json({
                msg: 'No hay personajes aún'
            });
        }
        res.status(200).json({
            character
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            error
        });
    }
});
exports.getCharacter = getCharacter;
//* GET DETAILS ONE CHARACTER
const getDetailsCharacters = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params.nombre);
    try {
        const personaje = yield personaje_1.Personaje.findAll({
            include: {
                model: entretenimiento_1.default,
                through: {
                    attributes: []
                }
            }
        });
        if (!personaje) {
            return res.status(400).json({
                msg: 'No hay personajes aún'
            });
        }
        res.status(200).json({
            personaje
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            error
        });
    }
});
exports.getDetailsCharacters = getDetailsCharacters;
const association = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { entretenimiento, personaje } = req.body;
    entretenimiento.toLowerCase();
    personaje.toLowerCase();
    try {
        const existAssoiation = yield pelicula_personaje_1.PeliculaPersonaje.findOne({
            where: {
                PersonajeNombre: personaje,
                entretenimientoTitulo: entretenimiento
            }
        });
        if (existAssoiation) {
            return res.json({
                msg: `Ya se encuentra relacionado el entretenimiento ${entretenimiento} con el personaje ${personaje}`
            });
        }
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
    }
    catch (error) {
        res.status(400).json({
            error
        });
    }
});
exports.association = association;
//# sourceMappingURL=characters.controller.js.map