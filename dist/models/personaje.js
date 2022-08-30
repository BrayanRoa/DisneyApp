"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Personaje = connection_1.default.define('personaje', {
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true
    },
    imagen: {
        type: sequelize_1.DataTypes.STRING,
    },
    edad: {
        type: sequelize_1.DataTypes.INTEGER
    },
    peso: {
        type: sequelize_1.DataTypes.STRING
    },
    historia: {
        type: sequelize_1.DataTypes.STRING
    },
    updatedAt: {
        type: sequelize_1.DataTypes.TIME
    },
    createdAt: {
        type: sequelize_1.DataTypes.TIME
    },
}, {
    tableName: 'personaje'
});
exports.default = Personaje;
//# sourceMappingURL=personaje.js.map