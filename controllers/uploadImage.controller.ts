import { Request, Response } from 'express'
import Entretenimiento from '../db/models/entretenimiento';
import { Personaje } from '../db/models/personaje';
import { Genero } from '../db/models/genero';
import path from 'path';
import fs from 'fs'

const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)


export const uploadImage = async (req: Request, res: Response) => {

    const { coleccion, nombre } = req.params;
    // const d = req.file;
    let exist;
    switch (coleccion) {
        case 'movies':
            exist = await Entretenimiento.findByPk(nombre)
            if (!exist) {
                return res.status(400).json({
                    msg: `No existe una entretenimiento con nombre ${nombre}`
                })
            }
            break;

        case 'characters':
            exist = await Personaje.findByPk(nombre)
            if (!exist) {
                return res.status(400).json({
                    msg: `No existe un personaje con nombre ${nombre}`
                })
            }
            break;

        case 'gender':
            exist = await Genero.findByPk(nombre)
            if (!exist) {
                return res.status(400).json({
                    msg: `No existe un genero con nombre ${nombre}`
                })
            }
            break;

        default:
            return res.status(500).json({
                msg: `Se me olvido validar algo`
            })
    }

    //* Limpiar Imagenes Previas
    if (exist.imagen) {
        //* OJO TENGO QUE SALIR DOS VECES DEÑ DIR PORQUE SI NO ENTRE A LA CARPETA DEL DIST Y NO ENCUENTRA LOS UPLOADS
        const pathImage = path.join(__dirname, '../../uploads', coleccion, exist.imagen)

        //* hay que borrar la imagen del servidor
        if (fs.existsSync(pathImage)) {
            fs.unlinkSync(pathImage)
            console.log("se esta borrando...");
        }
    }

    const data = req.file?.originalname;
    await exist.update({
        imagen: data
    });

    res.json({
        exist
    })
}


export const getImage = async (req: Request, res: Response) => {
    const { coleccion, nombre } = req.params;

    let exist;
    switch (coleccion) {
        case 'movies':
            exist = await Entretenimiento.findByPk(nombre)
            if (!exist) {
                return res.status(400).json({
                    msg: `No existe una entretenimiento con nombre ${nombre}`
                })
            }
            break;

        case 'characters':
            exist = await Personaje.findByPk(nombre)
            if (!exist) {
                return res.status(400).json({
                    msg: `No existe un personaje con nombre ${nombre}`
                })
            }
            break;

        case 'gender':
            exist = await Genero.findByPk(nombre)
            if (!exist) {
                return res.status(400).json({
                    msg: `No existe un genero con nombre ${nombre}`
                })
            }
            break;

        default:
            return res.status(500).json({
                msg: `Se me olvido validar algo`
            })
    }

    if (exist.imagen) {
        //* OJO TENGO QUE SALIR DOS VECES DEÑ DIR PORQUE SI NO ENTRE A LA CARPETA DEL DIST Y NO ENCUENTRA LOS UPLOADS
        const pathImage = path.join(__dirname, '../../uploads', coleccion, exist.imagen)

        if (fs.existsSync(pathImage)) {
            return res.sendFile(pathImage)
        }
    }

    const pathImage = path.join(__dirname, '../../assets/no-image.jpg');

    res.sendFile(pathImage)

}


export const uploadImageCloudinary = async (req: Request, res: Response) => {

    const { coleccion, nombre } = req.params;
    // const d = req.file;
    let exist;
    switch (coleccion) {
        case 'movies':
            exist = await Entretenimiento.findByPk(nombre)
            if (!exist) {
                return res.status(400).json({
                    msg: `No existe una entretenimiento con nombre ${nombre}`
                })
            }
            break;

        case 'characters':
            exist = await Personaje.findByPk(nombre)
            if (!exist) {
                return res.status(400).json({
                    msg: `No existe un personaje con nombre ${nombre}`
                })
            }
            break;

        case 'gender':
            exist = await Genero.findByPk(nombre)
            if (!exist) {
                return res.status(400).json({
                    msg: `No existe un genero con nombre ${nombre}`
                })
            }
            break;

        default:
            return res.status(500).json({
                msg: `Se me olvido validar algo`
            })
    }

    try {

        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET
        })

        //* Limpiar Imagenes Previas
        if (exist.imagen) {
            //* OBTENGO LA RUTA Y NECESITO SOLO EL FINAL DE LA URL (QUE ES EL NOMBRE COMO SE ALMACENO EN CLOUDINARY)
            const nombreArr = exist.imagen.split('/')
            //* OBTENGO EL ÚLTIMO
            const nombre = nombreArr[nombreArr.length - 1]
            console.log(nombre);

            //* Y SEPARO EL NOMBRE DE LA EXTENSIÓN
            const [public_id] = nombre.split('.')
            // console.log(public_id);
            //* LO BORRO DE CLOUDINARY
            await cloudinary.uploader.destroy(public_id)
        }
        

        const path = req.file?.path
        const { secure_url } = await cloudinary.uploader.upload(path)

        await exist.update({
            imagen: secure_url
        })

        res.status(200).json({
            exist
        })

    } catch (error) {
        console.error(`Error: ${error}`);
        res.json({
            error
        })
    }

    // const data = req.file?.originalname;
    // await exist.update({
    //     imagen: data
    // });


}