"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeliculaPersonaje = void 0;
const { sequelize, DataTypes, Model } = require('../connection');
class PeliculaPersonaje extends Model {
}
exports.PeliculaPersonaje = PeliculaPersonaje;
PeliculaPersonaje.init({
    GeneroNombre: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    entretenimientoTitulo: {
        type: DataTypes.STRING,
    }
}, {
    sequelize,
    tableName: 'genero_personaje',
    timestamps: false
});
//# sourceMappingURL=genero_entretenimiento.js.map