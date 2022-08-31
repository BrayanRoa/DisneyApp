"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuarios = void 0;
// import TipoDocumento from './tipo_documento';
const { sequelize, DataTypes, Model } = require('../connection');
// Valid
class Usuarios extends Model {
}
exports.Usuarios = Usuarios;
Usuarios.init({
    documento: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING
    },
    apellido: {
        type: DataTypes.STRING
    },
    telefono: {
        type: DataTypes.STRING
    },
    correo: {
        type: DataTypes.STRING
    },
    direccion: {
        type: DataTypes.STRING
    },
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    password: {
        type: DataTypes.STRING
    },
}, {
    sequelize,
    modelName: 'usuarios',
    timestamps: false
});
//# sourceMappingURL=usuarios.models.js.map