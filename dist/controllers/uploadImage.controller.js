"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImageCloudinary = exports.getImage = exports.uploadImage = void 0;
const entretenimiento_1 = __importDefault(require("../db/models/entretenimiento"));
const personaje_1 = require("../db/models/personaje");
const genero_1 = require("../db/models/genero");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);
const uploadImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { coleccion, nombre } = req.params;
    // const d = req.file;
    let exist;
    switch (coleccion) {
        case 'movies':
            exist = yield entretenimiento_1.default.findByPk(nombre);
            if (!exist) {
                return res.status(400).json({
                    msg: `No existe una entretenimiento con nombre ${nombre}`
                });
            }
            break;
        case 'characters':
            exist = yield personaje_1.Personaje.findByPk(nombre);
            if (!exist) {
                return res.status(400).json({
                    msg: `No existe un personaje con nombre ${nombre}`
                });
            }
            break;
        case 'gender':
            exist = yield genero_1.Genero.findByPk(nombre);
            if (!exist) {
                return res.status(400).json({
                    msg: `No existe un genero con nombre ${nombre}`
                });
            }
            break;
        default:
            return res.status(500).json({
                msg: `Se me olvido validar algo`
            });
    }
    //* Limpiar Imagenes Previas
    if (exist.imagen) {
        //* OJO TENGO QUE SALIR DOS VECES DEÑ DIR PORQUE SI NO ENTRE A LA CARPETA DEL DIST Y NO ENCUENTRA LOS UPLOADS
        const pathImage = path_1.default.join(__dirname, '../../uploads', coleccion, exist.imagen);
        //* hay que borrar la imagen del servidor
        if (fs_1.default.existsSync(pathImage)) {
            fs_1.default.unlinkSync(pathImage);
            console.log("se esta borrando...");
        }
    }
    const data = (_a = req.file) === null || _a === void 0 ? void 0 : _a.originalname;
    yield exist.update({
        imagen: data
    });
    res.json({
        exist
    });
});
exports.uploadImage = uploadImage;
const getImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { coleccion, nombre } = req.params;
    let exist;
    switch (coleccion) {
        case 'movies':
            exist = yield entretenimiento_1.default.findByPk(nombre);
            if (!exist) {
                return res.status(400).json({
                    msg: `No existe una entretenimiento con nombre ${nombre}`
                });
            }
            break;
        case 'characters':
            exist = yield personaje_1.Personaje.findByPk(nombre);
            if (!exist) {
                return res.status(400).json({
                    msg: `No existe un personaje con nombre ${nombre}`
                });
            }
            break;
        case 'gender':
            exist = yield genero_1.Genero.findByPk(nombre);
            if (!exist) {
                return res.status(400).json({
                    msg: `No existe un genero con nombre ${nombre}`
                });
            }
            break;
        default:
            return res.status(500).json({
                msg: `Se me olvido validar algo`
            });
    }
    if (exist.imagen) {
        //* OJO TENGO QUE SALIR DOS VECES DEÑ DIR PORQUE SI NO ENTRE A LA CARPETA DEL DIST Y NO ENCUENTRA LOS UPLOADS
        const pathImage = path_1.default.join(__dirname, '../../uploads', coleccion, exist.imagen);
        if (fs_1.default.existsSync(pathImage)) {
            return res.sendFile(pathImage);
        }
    }
    const pathImage = path_1.default.join(__dirname, '../../assets/no-image.jpg');
    res.sendFile(pathImage);
});
exports.getImage = getImage;
const uploadImageCloudinary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { coleccion, nombre } = req.params;
    // const d = req.file;
    let exist;
    switch (coleccion) {
        case 'movies':
            exist = yield entretenimiento_1.default.findByPk(nombre);
            if (!exist) {
                return res.status(400).json({
                    msg: `No existe una entretenimiento con nombre ${nombre}`
                });
            }
            break;
        case 'characters':
            exist = yield personaje_1.Personaje.findByPk(nombre);
            if (!exist) {
                return res.status(400).json({
                    msg: `No existe un personaje con nombre ${nombre}`
                });
            }
            break;
        case 'gender':
            exist = yield genero_1.Genero.findByPk(nombre);
            if (!exist) {
                return res.status(400).json({
                    msg: `No existe un genero con nombre ${nombre}`
                });
            }
            break;
        default:
            return res.status(500).json({
                msg: `Se me olvido validar algo`
            });
    }
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET
        });
        //* Limpiar Imagenes Previas
        if (exist.imagen) {
            //* OBTENGO LA RUTA Y NECESITO SOLO EL FINAL DE LA URL (QUE ES EL NOMBRE COMO SE ALMACENO EN CLOUDINARY)
            const nombreArr = exist.imagen.split('/');
            //* OBTENGO EL ÚLTIMO
            const nombre = nombreArr[nombreArr.length - 1];
            console.log(nombre);
            //* Y SEPARO EL NOMBRE DE LA EXTENSIÓN
            const [public_id] = nombre.split('.');
            // console.log(public_id);
            //* LO BORRO DE CLOUDINARY
            yield cloudinary.uploader.destroy(public_id);
        }
        const path = (_b = req.file) === null || _b === void 0 ? void 0 : _b.path;
        const { secure_url } = yield cloudinary.uploader.upload(path);
        yield exist.update({
            imagen: secure_url
        });
        res.status(200).json({
            exist
        });
    }
    catch (error) {
        console.error(`Error: ${error}`);
        res.json({
            error
        });
    }
    // const data = req.file?.originalname;
    // await exist.update({
    //     imagen: data
    // });
});
exports.uploadImageCloudinary = uploadImageCloudinary;
//# sourceMappingURL=uploadImage.controller.js.map