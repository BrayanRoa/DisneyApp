"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const PeliculaPersonaje = connection_1.default.define('pelicula_personaje', {
    nombre_personaje: {
        type: sequelize_1.DataTypes.STRING,
    },
    titulo_personaje: {
        type: sequelize_1.DataTypes.STRING,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.TIME
    },
    createdAt: {
        type: sequelize_1.DataTypes.TIME
    },
}, {
    tableName: 'pelicula_personaje'
});
exports.default = PeliculaPersonaje;
//# sourceMappingURL=genero.js.map