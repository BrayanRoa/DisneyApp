"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoDocumento = void 0;
const { sequelize, DataTypes, Model } = require('../connection');
class TipoDocumento extends Model {
}
exports.TipoDocumento = TipoDocumento;
TipoDocumento.init({
    id_tipo_documento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tipo: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    tableName: 'tipos_documento',
    timestamps: false
});
//# sourceMappingURL=tipo_documento.js.map