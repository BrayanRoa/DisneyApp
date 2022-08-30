"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { sequelize, DataTypes, Model } = require('../db/connection');
// Valid
class Usuarios extends Model {
}
Usuarios.init({
    documento: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    id_tipo_documento: {
        type: DataTypes.INTEGER
    },
    nombre: {
        type: DataTypes.STRING
    },
    apellido: {
        type: DataTypes.STRING
    },
    telefono: {
        type: DataTypes.STRING
    },
    correo: {
        type: DataTypes.STRING
    },
    direccion: {
        type: DataTypes.STRING
    },
    activo: {
        type: DataTypes.BOOLEAN
    },
    password: {
        type: DataTypes.STRING
    },
    updatedAt: {
        type: DataTypes.TIME
    },
    createdAt: {
        type: DataTypes.TIME
    },
}, {
    sequelize,
    tableName: 'usuarios',
});
exports.default = Usuarios;
//* ESTA ES OTRA FORMA DE HACERLO, PERO NO ESTOY SEGURO PARA HACER LAS
//* RELACIONES ENTRE TABLAS COMO HACERLO DE ESTA MANERA
// import { DataTypes } from 'sequelize';
// import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
// import db from '../db/connection';
// interface UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
//     documento:         string;
//     id_tipo_documento: number;
//     nombre:            string;
//     apellido:          string;
//     telefono:          string;
//     correo:            string;
//     direccion:         string;
//     activo:            boolean;
//     password:          string;
//     updatedAt:         Date;
//     createdAt:         Date;
// }
// const Usuario = db.define<UserModel>('usuarios',{
//     documento:{
//         type: DataTypes.STRING,
//         primaryKey:true
//     },
//     id_tipo_documento:{
//         type: DataTypes.INTEGER
//     },
//     nombre:{
//         type: DataTypes.STRING
//     },
//     apellido:{
//         type: DataTypes.STRING
//     },
//     telefono:{
//         type: DataTypes.STRING
//     },
//     correo:{
//         type: DataTypes.STRING
//     },
//     direccion:{
//         type: DataTypes.STRING
//     },
//     activo:{
//         type: DataTypes.BOOLEAN
//     },
//     password:{
//         type: DataTypes.STRING
//     },
//     updatedAt:{
//         type: DataTypes.TIME
//     },
//     createdAt:{
//         type: DataTypes.TIME
//     },
// },{
//     tableName:'usuarios'
// })
// export default Usuario;
//# sourceMappingURL=usuario.js.map