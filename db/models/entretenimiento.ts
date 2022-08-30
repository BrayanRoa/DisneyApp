const { sequelize, DataTypes, Model } = require('../connection')

// Valid
class Entretenimiento extends Model {
    declare titulo: string;
    declare imagen: string;
    declare fecha_creacion: Date;
    declare calificacion: number;
    declare tipo: string;
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
}, {
    sequelize,
    modelName: 'entretenimiento',
    timestamps:false
});

export default Entretenimiento





