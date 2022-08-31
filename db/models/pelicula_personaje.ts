const {sequelize, DataTypes, Model} = require('../connection')

export class PeliculaPersonaje extends Model {
    declare PersonajeNombre: string;
    declare entretenimientoTitulo: string;
}

PeliculaPersonaje.init({
    PersonajeNombre: {
        type: DataTypes.STRING,
        primaryKey:true
    },
    entretenimientoTitulo: {
        type: DataTypes.STRING,
    }
},   
    {
        sequelize,
        tableName: 'pelicula_personaje',
        timestamps: false
    }
);