const {sequelize,  DataTypes, Model} = require('../connection')

class PeliculaPersonaje extends Model{
    declare personajeNombre:  string;
    declare EntretenimientoTitulo:  string;
}

PeliculaPersonaje.init({
    
},{
    sequelize,
    timestamps:false
})

export default PeliculaPersonaje;