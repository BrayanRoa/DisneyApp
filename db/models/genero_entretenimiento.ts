const {sequelize, DataTypes, Model} = require('../connection')

export class PeliculaPersonaje extends Model {
    declare GeneroNombre: string;
    declare entretenimientoTitulo: string;
}

PeliculaPersonaje.init({
    GeneroNombre: {
        type: DataTypes.STRING,
        primaryKey:true
    },
    entretenimientoTitulo: {
        type: DataTypes.STRING,
    }
},   
    {
        sequelize,
        tableName: 'genero_personaje',
        timestamps: false
    }
);