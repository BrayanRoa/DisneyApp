const { sequelize, DataTypes, Model } = require('../connection')


export class TipoDocumento extends Model {
  declare id_tipo_documento: number
  declare tipo: string
}

TipoDocumento.init(
  {
    id_tipo_documento: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tipo: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize,
    tableName: 'tipos_documento',
    timestamps: false
  }
);

