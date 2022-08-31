"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Genero = void 0;
const { sequelize, DataTypes, Model } = require('../connection');
class Genero extends Model {
}
exports.Genero = Genero;
Genero.init({
    nombre: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    imagen: {
        type: DataTypes.STRING,
    }
}, {
    sequelize,
    tableName: 'genero',
    timestamps: false
});
//# sourceMappingURL=genero.js.map