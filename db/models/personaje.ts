const {sequelize, DataTypes, Model} = require('../connection')

export class Personaje extends Model {
    declare nombre: string;
    declare imagen: string;
    declare edad: number;
    declare peso: string;
    declare historia: string;
    // declare entretenimientoTitulo:string
}

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
    activo:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
    },
    // entretenimientoTitulo:{
    //     type:DataTypes.STRING
    // }
},   
    {
        sequelize,
        tableName: 'personaje',
        timestamps: false
    }
);