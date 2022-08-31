// import TipoDocumento from './tipo_documento';
const { sequelize, DataTypes, Model } = require('../connection')

// Valid
export class Usuarios extends Model {
    declare documento: string;
    declare id_tipo_documento: number;
    declare nombre: string;
    declare apellido: string;
    declare telefono: string;
    declare correo: string;
    declare direccion: string;
    declare activo: boolean;
    declare password: string;
    declare updatedAt: Date;
    declare createdAt: Date; // this is ok! The 'declare' keyword ensures this field will not be emitted by TypeScript.
}

Usuarios.init({
    documento: {
        type: DataTypes.STRING,
        primaryKey: true
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
    activo:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
    },
    password: {
        type: DataTypes.STRING
    },
}, {
    sequelize,
    modelName: 'usuarios',
    timestamps: false
});


