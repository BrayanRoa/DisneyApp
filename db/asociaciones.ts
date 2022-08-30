import {TipoDocumento}  from "../db/models/tipo_documento";
import {Usuarios} from './models/usuarios.models';
import { Personaje } from './models/personaje';
import Entretenimiento from './models/entretenimiento';

//* OJO LAS FOREIGN KEY DEBEN TENER EL MISMO NOMBRE, SINO CREO DOS CLAVES
//* EL USUARIO TIENE UN TIPO DE DOC, PERO LOS TIPOS DE DOC PUEDEN TENER MUCHOS USUARIOS
Usuarios.belongsTo(TipoDocumento, {foreignKey: {name: 'id_tipo_documento'}});
TipoDocumento.hasMany(Usuarios, {foreignKey: {name: 'id_tipo_documento'}});


Personaje.belongsToMany(Entretenimiento, { through: 'pelicula_personaje' });
Entretenimiento.belongsToMany(Personaje, { through: 'pelicula_personaje' });