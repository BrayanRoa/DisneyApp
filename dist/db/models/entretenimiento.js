"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { sequelize, DataTypes, Model } = require('../connection');
// Valid
class Entretenimiento extends Model {
}
Entretenimiento.init({
    titulo: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    imagen: {
        type: DataTypes.STRING,
    },
    fecha_creacion: {
        type: DataTypes.DATE
    },
    calificacion: {
        type: DataTypes.INTEGER
    },
    tipo: {
        type: DataTypes.STRING
    },
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize,
    modelName: 'entretenimiento',
    timestamps: false
});
exports.default = Entretenimiento;
//# sourceMappingURL=entretenimiento.js.map