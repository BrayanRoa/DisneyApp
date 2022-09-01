"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tipo_documento_1 = require("../db/models/tipo_documento");
const usuarios_models_1 = require("./models/usuarios.models");
const personaje_1 = require("./models/personaje");
const entretenimiento_1 = __importDefault(require("./models/entretenimiento"));
const genero_1 = require("./models/genero");
//* OJO LAS FOREIGN KEY DEBEN TENER EL MISMO NOMBRE, SINO CREO DOS CLAVES
//* EL USUARIO TIENE UN TIPO DE DOC, PERO LOS TIPOS DE DOC PUEDEN TENER MUCHOS USUARIOS
usuarios_models_1.Usuarios.belongsTo(tipo_documento_1.TipoDocumento, { foreignKey: { name: 'id_tipo_documento' } });
tipo_documento_1.TipoDocumento.hasMany(usuarios_models_1.Usuarios, { foreignKey: { name: 'id_tipo_documento' } });
// Entretenimiento.hasMany(Personaje)
// Personaje.belongsTo(Entretenimiento)
// Entretenimiento.hasMany(Genero)
// Genero.belongsTo(Entretenimiento)
personaje_1.Personaje.belongsToMany(entretenimiento_1.default, { through: 'pelicula_personaje' });
entretenimiento_1.default.belongsToMany(personaje_1.Personaje, { through: 'pelicula_personaje' });
genero_1.Genero.belongsToMany(entretenimiento_1.default, { through: 'genero_entretenimiento' });
entretenimiento_1.default.belongsToMany(genero_1.Genero, { through: 'genero_entretenimiento' });
//# sourceMappingURL=asociaciones.js.map