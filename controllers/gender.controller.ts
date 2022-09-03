import { Request, Response } from "express";
import { Genero } from '../db/models/genero';

import path from "path";
import fileUpload from "express-fileupload";

type FileArray = fileUpload.FileArray;
type UploadedFile = fileUpload.UploadedFile;
type Options = fileUpload.Options;

export const getGenders = async (req: Request, res: Response) => {
    // const {nombre} = req.body;
    const genders = await Genero.findAll();

    if (!genders) {
        return res.status(400).json({
            msg: 'No hay generos aún'
        })
    }

    res.status(200).json({
        msg: genders
    })
}


export const postGender = async (req: Request, res: Response) => {
    const { nombre, imagen } = req.body;

    const exist = await Genero.findByPk(nombre);
    if (exist) {
        return res.status(400).json({
            msg: `Ya existe el genero ${nombre}`
        })
    }

    await Genero.create({ nombre, imagen });

    res.status(200).json({
        msg: `Genero ${nombre} creado con exito`
    })
}

function isSingleFile(file: UploadedFile | UploadedFile[]): file is UploadedFile {
    return typeof file === 'object' && (file as UploadedFile).name !== undefined;
}

function isFileArray(file: UploadedFile | UploadedFile[]): file is UploadedFile[] {
    return Array.isArray(file);
}

export const prueba = (req: Request, res: Response) => {
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
        })
    }
}