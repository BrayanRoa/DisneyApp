"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Personaje = void 0;
const { sequelize, DataTypes, Model } = require('../connection');
class Personaje extends Model {
}
exports.Personaje = Personaje;
Personaje.init({
    nombre: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    imagen: {
        type: DataTypes.STRING,
    },
    edad: {
        type: DataTypes.INTEGER
    },
    peso: {
        type: DataTypes.STRING
    },
    historia: {
        type: DataTypes.STRING
    },
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    // entretenimientoTitulo:{
    //     type:DataTypes.STRING
    // }
}, {
    sequelize,
    tableName: 'personaje',
    timestamps: false
});
//# sourceMappingURL=personaje.js.map