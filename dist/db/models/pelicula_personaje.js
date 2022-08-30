"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { sequelize, DataTypes, Model } = require('../connection');
class PeliculaPersonaje extends Model {
}
PeliculaPersonaje.init({}, {
    sequelize,
    timestamps: false
});
exports.default = PeliculaPersonaje;
//# sourceMappingURL=pelicula_personaje.js.map