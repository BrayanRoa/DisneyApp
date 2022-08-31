"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeliculaPersonaje = void 0;
const { sequelize, DataTypes, Model } = require('../connection');
class PeliculaPersonaje extends Model {
}
exports.PeliculaPersonaje = PeliculaPersonaje;
PeliculaPersonaje.init({
    PersonajeNombre: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    entretenimientoTitulo: {
        type: DataTypes.STRING,
    }
}, {
    sequelize,
    tableName: 'pelicula_personaje',
    timestamps: false
});
//# sourceMappingURL=pelicula_personaje.js.map