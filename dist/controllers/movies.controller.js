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
exports.deleteMovie = exports.putMovie = exports.getDetailsMovies = exports.postMovie = exports.getMovies = void 0;
const entretenimiento_1 = __importDefault(require("../db/models/entretenimiento"));
const personaje_1 = require("../db/models/personaje");
const genero_1 = require("../db/models/genero");
const getMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const movies = yield entretenimiento_1.default.findAll({
        attributes: ['titulo', 'imagen', 'fecha_creacion'],
        where: { activo: 1 }
    });
    if (!movies) {
        return res.status(400).json({
            msg: 'There are not movies'
        });
    }
    res.status(200).json({
        movies
    });
});
exports.getMovies = getMovies;
const postMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { titulo, fecha_creacion, calificacion, tipo } = req.body;
    const existe = yield entretenimiento_1.default.findByPk(titulo.toLowerCase());
    if (existe) {
        return res.status(400).json({
            msg: `Pelicula/serie ${titulo} ya esta registrada`
        });
    }
    const movies = yield entretenimiento_1.default.create({
        titulo,
        imagen: 'https://res.cloudinary.com/dmaqkkeno/image/upload/v1662502429/disneyplus-1024x577_ni47yj.jpg',
        fecha_creacion,
        calificacion,
        tipo
    });
    res.status(200).json({
        movies
    });
});
exports.postMovie = postMovie;
const getDetailsMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const moviesTest = yield entretenimiento_1.default.findAll({
        include: [
            {
                model: personaje_1.Personaje, through: {
                    attributes: []
                }
            },
            {
                model: genero_1.Genero, through: {
                    attributes: []
                }
            },
        ],
        where: { activo: 1 }
    });
    if (!moviesTest) {
        return res.status(400).json({
            msg: 'There are not movies'
        });
    }
    res.status(200).json({
        moviesTest
    });
});
exports.getDetailsMovies = getDetailsMovies;
const putMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre } = req.params;
    const exist = yield entretenimiento_1.default.findByPk(nombre);
    if (!exist) {
        return res.status(400).json({
            msg: `The movie or serie does not exist`
        });
    }
    const { fecha_creacion, calificacion, tipo } = req.body;
    const update = yield entretenimiento_1.default.update({ fecha_creacion, calificacion, tipo }, { where: { titulo: nombre } });
    res.status(200).json({
        update,
        msg: `successfully updated movie`
    });
});
exports.putMovie = putMovie;
const deleteMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre } = req.params;
    const exist = yield entretenimiento_1.default.findByPk(nombre);
    if (!exist) {
        return res.status(400).json({
            msg: `There is no movie with name: ${nombre}`
        });
    }
    yield entretenimiento_1.default.update({ activo: 0 }, { where: { titulo: nombre } });
    res.status(200).json({
        msg: `successfully deleted movie`
    });
});
exports.deleteMovie = deleteMovie;
//# sourceMappingURL=movies.controller.js.map