import { Request, Response } from "express";
import { Personaje } from '../db/models/personaje';
import Entretenimiento from '../db/models/entretenimiento';
import { PeliculaPersonaje } from '../db/models/pelicula_personaje';

//* ALL CHARACTERS
export const getCharacters = async (req: Request, res: Response) => {

    const personajes = await Personaje.findAll({
        attributes: ['nombre', 'imagen'],
        where: { activo: 1 }
    })

    if (!personajes) {
        return res.status(400).json({
            msg: 'No hay personajes aún'
        })
    }

    res.status(200).json({
        personajes
    })
}

//* CREATE CHARACTER
export const postCharacter = async (req: Request, res: Response) => {

    const nameMovie = req.query.titulo || '';

    const movie = await Entretenimiento.findByPk(nameMovie);

    if (!movie) {
        return res.status(400).json({
            msg: `No existe una pelicula con nombre ${nameMovie} - debes crearla primero para agregar personajes`
        })
    }

    const { nombre, imagen, edad, peso, historia, entretenimientoTitulo } = req.body;

    try {

        //* VALIDO SI ESE PERSONAJE YA EXISTE EN BD
        const existe = await Personaje.findByPk(nombre);
        if (existe) {
            return res.status(400).json({
                msg: `El personaje ${nombre} ya esta registrado`
            })
        }

        nombre.toLowerCase();
        const personaje = await Personaje.create({
            nombre, imagen, edad, peso, historia, entretenimientoTitulo
        });

        const association = await PeliculaPersonaje.create({
            PersonajeNombre: nombre,
            entretenimientoTitulo: movie.titulo.trim()
        })

        res.json({
            personaje,
            association
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: error
        })
    }
}

//* UPDATE ONE CHARACTER
export const putCharacter = async (req: Request, res: Response) => {

    const { nombre } = req.params;
    const { imagen, peso, historia, edad } = req.body;

    const existe = await Personaje.findByPk(nombre.toLowerCase());
    if (!existe) {
        return res.status(400).json({
            msg: `El personaje ${nombre} no existe`
        })
    }

    const personaje = await Personaje.update(
        { imagen, peso, historia, edad },
        { where: { nombre } }
    );

    res.status(200).json({
        personaje
    })
}

//* UPDATE ONE CHARACTER
export const deleteCharacter = async (req: Request, res: Response) => {
    const { nombre } = req.params;

    const existe = await Personaje.findByPk(nombre.toLowerCase());

    if (!existe) {
        return res.status(400).json({
            msg: `El personaje ${nombre} no existe`
        })
    }

    const personaje = await Personaje.update(
        { activo: 0 },
        { where: { nombre } }
    );

    res.status(200).json({
        personaje
    })
}

//* GET ONE CHARACTER
export const getCharacter = async (req: Request, res: Response) => {

    console.log(req.params.nombre);

    try {
        const personaje = await Personaje.findByPk(req.params.nombre,
            {
                include: {
                    model: Entretenimiento,
                    through: {
                        attributes: []
                    }
                }
            })


        if (!personaje) {
            return res.status(400).json({
                msg: 'No hay personajes aún'
            })
        }

        res.status(200).json({
            personaje
        })
    } catch (error) {
        console.log(error);
        res.json({
            error
        })
    }

}

//* GET DETAILS ONE CHARACTER
export const getDetailsCharacters = async (req: Request, res: Response) => {

    console.log(req.params.nombre);

    try {
        const personaje = await Personaje.findAll({
            include: {
                model: Entretenimiento,
                through: {
                    attributes: []
                }
            }
        })


        if (!personaje) {
            return res.status(400).json({
                msg: 'No hay personajes aún'
            })
        }

        res.status(200).json({
            personaje
        })
    } catch (error) {
        console.log(error);
        res.json({
            error
        })
    }

}


export const searchCharacter = async (req: Request, res: Response)=>{

    const {name, age, movie} = req.query;

    const character = await Personaje.findOne({
        where:{nombre:name}
    })
}


export const association = async(req:Request, res:Response)=>{
    const {entretenimiento, personaje} = req.body;
    entretenimiento.toLowerCase();
    personaje.toLowerCase();

    const existEntertainment = await Entretenimiento.findByPk(entretenimiento);
    const existCharcater = await Personaje.findByPk(personaje);

    if(!existCharcater || !existEntertainment){
        return res.status(400).json({
            msg:`Personaje ${personaje} o entretenimiento ${entretenimiento} no existe`
        })
    }

    const relationship = await PeliculaPersonaje.create({
        PersonajeNombre: personaje,
        entretenimientoTitulo: entretenimiento
    })

    res.status(200).json({
        relationship
    })
}