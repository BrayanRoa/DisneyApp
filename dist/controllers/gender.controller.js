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
Object.defineProperty(exports, "__esModule", { value: true });
exports.prueba = exports.postGender = exports.getGenders = void 0;
const genero_1 = require("../db/models/genero");
const getGenders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const {nombre} = req.body;
    const genders = yield genero_1.Genero.findAll();
    if (!genders) {
        return res.status(400).json({
            msg: 'No hay generos aún'
        });
    }
    res.status(200).json({
        msg: genders
    });
});
exports.getGenders = getGenders;
const postGender = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, imagen } = req.body;
    const exist = yield genero_1.Genero.findByPk(nombre);
    if (exist) {
        return res.status(400).json({
            msg: `Ya existe el genero ${nombre}`
        });
    }
    yield genero_1.Genero.create({ nombre, imagen });
    res.status(200).json({
        msg: `Genero ${nombre} creado con exito`
    });
});
exports.postGender = postGender;
function isSingleFile(file) {
    return typeof file === 'object' && file.name !== undefined;
}
function isFileArray(file) {
    return Array.isArray(file);
}
const prueba = (req, res) => {
    const files = req.files; // $ExpectType FileArray | null | undefined
    if (files != null) {
        const fileField = files.field; // $ExpectType UploadedFile | UploadedFile[]
        if (isSingleFile(fileField)) {
            fileField.data; // $ExpectType Buffer
            fileField.encoding; // $ExpectType string
            fileField.md5; // $ExpectType string
            fileField.mimetype; // $ExpectType string
            fileField.name; // $ExpectType string
            fileField.size; // $ExpectType number
            fileField.tempFilePath; // $ExpectType string
            fileField.truncated; // $ExpectType boolean
            console.log(fileField.name);
            // $ExpectType void
            fileField.mv('/tmp/test', err => {
                err; // $ExpectType any
                if (err) {
                    console.log('Error while copying file to target location');
                }
            });
            fileField.mv('foo'); // $ExpectType Promise<void>
        }
        if (isFileArray(fileField)) {
            console.log(fileField[0].name);
            fileField[0].mv('/tmp/test', err => {
                if (err) {
                    console.log('Error while copying file to target location');
                }
            });
        }
        const fileList = files.fileList;
        if (Array.isArray(fileList)) {
            for (const file of fileList) {
                console.log(file.name);
            }
        }
        res.json({
            fileList
        });
    }
};
exports.prueba = prueba;
//# sourceMappingURL=gender.controller.js.map