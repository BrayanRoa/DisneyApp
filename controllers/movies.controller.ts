import Entretenimiento from '../db/models/entretenimiento';
import { Personaje } from '../db/models/personaje';
import { Request, Response } from 'express'
import { Genero } from '../db/models/genero';



export const getMovies = async (req: Request, res: Response) => {

    const movies = await Entretenimiento.findAll({
        attributes: ['titulo', 'imagen', 'fecha_creacion'],
        where: { activo: 1 }
    });

    if (!movies) {
        return res.status(400).json({
            msg: 'There are not movies'
        })
    }

    res.status(200).json({
        movies
    })

}

export const postMovie = async (req: Request, res: Response) => {

    const { titulo, fecha_creacion, calificacion, tipo } = req.body

    const existe = await Entretenimiento.findByPk(titulo.toLowerCase())

    if (existe) {
        return res.status(400).json({
            msg: `Pelicula/serie ${titulo} ya esta registrada`
        })
    }

    const movies = await Entretenimiento.create({
        titulo,
        imagen: 'https://res.cloudinary.com/dmaqkkeno/image/upload/v1662502429/disneyplus-1024x577_ni47yj.jpg',
        fecha_creacion, 
        calificacion, 
        tipo
    });

    res.status(200).json({
        movies
    })

}

export const getDetailsMovies = async (req: Request, res: Response) => {

    const moviesTest = await Entretenimiento.findAll({
        include: [
            {
                model: Personaje, through: {
                    attributes: []
                }
            },
            {
                model: Genero, through: {
                    attributes: []
                }
            },
        ],
        where: { activo: 1 }
    });


    if (!moviesTest) {
        return res.status(400).json({
            msg: 'There are not movies'
        })
    }

    res.status(200).json({
        moviesTest
    })

}


export const putMovie = async (req: Request, res: Response) => {

    const { nombre } = req.params;
    const exist = await Entretenimiento.findByPk(nombre);

    if (!exist) {
        return res.status(400).json({
            msg: `The movie or serie does not exist`
        })
    }

    const { fecha_creacion, calificacion, tipo } = req.body;
    const update = await Entretenimiento.update(
        { fecha_creacion, calificacion, tipo },
        { where: { titulo: nombre } }
    );

    res.status(200).json({
        update,
        msg: `successfully updated movie`
    })
}


export const deleteMovie = async (req: Request, res: Response) => {
    const { nombre } = req.params;

    const exist = await Entretenimiento.findByPk(nombre);

    if (!exist) {
        return res.status(400).json({
            msg: `There is no movie with name: ${nombre}`
        })
    }

    await Entretenimiento.update(
        { activo: 0 },
        { where: { titulo: nombre } }
    )

    res.status(200).json({
        msg: `successfully deleted movie`
    })
}