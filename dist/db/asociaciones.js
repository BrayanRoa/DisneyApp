"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tipo_documento_1 = require("../db/models/tipo_documento");
const usuarios_models_1 = require("./models/usuarios.models");
const personaje_1 = require("./models/personaje");
const entretenimiento_1 = __importDefault(require("./models/entretenimiento"));
//* OJO LAS FOREIGN KEY DEBEN TENER EL MISMO NOMBRE, SINO CREO DOS CLAVES
//* EL USUARIO TIENE UN TIPO DE DOC, PERO LOS TIPOS DE DOC PUEDEN TENER MUCHOS USUARIOS
usuarios_models_1.Usuarios.belongsTo(tipo_documento_1.TipoDocumento, { foreignKey: { name: 'id_tipo_documento' } });
tipo_documento_1.TipoDocumento.hasMany(usuarios_models_1.Usuarios, { foreignKey: { name: 'id_tipo_documento' } });
personaje_1.Personaje.belongsToMany(entretenimiento_1.default, { through: 'pelicula_personaje' });
entretenimiento_1.default.belongsToMany(personaje_1.Personaje, { through: 'pelicula_personaje' });
//# sourceMappingURL=asociaciones.js.map