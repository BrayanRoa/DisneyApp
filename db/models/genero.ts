const {sequelize, DataTypes, Model} = require('../connection')

export class Genero extends Model {
    declare nombre: string;
    declare imagen: string;
}

Genero.init({
    nombre: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    imagen: {
        type: DataTypes.STRING,
    }
},   
    {
        sequelize,
        tableName: 'genero',
        timestamps: false
    }
);