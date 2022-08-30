const { sequelize, DataTypes, Model} = require('../db/connection')

// Valid
class Usuarios extends Model {
    declare documento:         string;
    declare id_tipo_documento: number;
    declare nombre:            string;
    declare apellido:          string;
    declare telefono:          string;
    declare correo:            string;
    declare direccion:         string;
    declare activo:            boolean;
    declare password:          string;
    declare updatedAt:         Date;
    declare createdAt:         Date; // this is ok! The 'declare' keyword ensures this field will not be emitted by TypeScript.
  }
  
  Usuarios.init({
    documento:{
        type: DataTypes.STRING,
        primaryKey:true
    },
    id_tipo_documento:{
        type: DataTypes.INTEGER
    },
    nombre:{
        type: DataTypes.STRING
    },
    apellido:{
        type: DataTypes.STRING
    },
    telefono:{
        type: DataTypes.STRING
    },
    correo:{
        type: DataTypes.STRING
    },
    direccion:{
        type: DataTypes.STRING
    },
    activo:{
        type: DataTypes.BOOLEAN
    },
    password:{
        type: DataTypes.STRING
    },
    updatedAt:{
        type: DataTypes.TIME
    },
    createdAt:{
        type: DataTypes.TIME
    },
  }, {     
    sequelize,
    tableName:'usuarios',
    });

  export default Usuarios
  
 


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