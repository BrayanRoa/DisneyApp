"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Entretenimiento = connection_1.default.define('personaje', {
    titulo: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true
    },
    imagen: {
        type: sequelize_1.DataTypes.STRING,
    },
    fecha_creacion: {
        type: sequelize_1.DataTypes.DATE
    },
    calificacion: {
        type: sequelize_1.DataTypes.INTEGER
    },
    tipo: {
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
exports.default = Entretenimiento;
//# sourceMappingURL=entretenimiento.js.map