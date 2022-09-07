import { Request, Response } from "express";
import { Personaje } from '../db/models/personaje';
import Entretenimiento from '../db/models/entretenimiento';
import { PeliculaPersonaje } from '../db/models/pelicula_personaje';


//* ALL CHARACTERS
export const getCharacters = async (req: Request, res: Response) => {

    try {
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
        
    } catch (error) {
        res.status(400).json({
            error
        })
    }


}

//* CREATE CHARACTER
export const postCharacter = async (req: Request, res: Response) => {

    const nameMovie = req.query.titulo || '';
    const { nombre, edad, peso, historia, entretenimientoTitulo } = req.body;

    try {

        const movie = await Entretenimiento.findByPk(nameMovie);

        if (!movie) {
            return res.status(400).json({
                msg: `No existe una pelicula con nombre ${nameMovie} - debes crearla primero para agregar personajes`
            })
        }

        //* VALIDO SI ESE PERSONAJE YA EXISTE EN BD
        const existe = await Personaje.findByPk(nombre);
        if (existe) {
            return res.status(400).json({
                msg: `El personaje ${nombre} ya esta registrado`
            })
        }

        nombre.toLowerCase();
        const personaje = await Personaje.create({
            nombre,
            imagen: 'https://res.cloudinary.com/dmaqkkeno/image/upload/v1662502752/png-transparent-the-walt-disney-company-business-logo-sign-21st-century-fox-business-text-people-logo_bax2s0.png',
            edad,
            peso,
            historia,
            entretenimientoTitulo
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

    try {
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
    } catch (error) {
        res.status(400).json({
            error
        })
    }


}

//* DELETE ONE CHARACTER
export const deleteCharacter = async (req: Request, res: Response) => {
    const { nombre } = req.params;

    try {

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

    } catch (error) {
        res.status(400).json({
            error
        })
    }


}

//* GET ONE CHARACTER
export const getCharacter = async (req: Request, res: Response) => {

    let character;

    try {

        character = await Personaje.findByPk(req.params.nombre,
            {
                include: {
                    model: Entretenimiento,
                    through: {
                        attributes: []
                    }
                }
            })


        if (!character) {
            return res.status(400).json({
                msg: 'No hay personajes aún'
            })
        }

        res.status(200).json({
            character
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


export const association = async (req: Request, res: Response) => {
    const { entretenimiento, personaje } = req.body;
    entretenimiento.toLowerCase();
    personaje.toLowerCase();

    try {

        const existAssoiation = await PeliculaPersonaje.findOne({
            where: {
                PersonajeNombre: personaje,
                entretenimientoTitulo: entretenimiento
            }
        })

        if (existAssoiation) {
            return res.json({
                msg: `Ya se encuentra relacionado el entretenimiento ${entretenimiento} con el personaje ${personaje}`
            })
        }

        const existEntertainment = await Entretenimiento.findByPk(entretenimiento);
        const existCharcater = await Personaje.findByPk(personaje);

        if (!existCharcater || !existEntertainment) {
            return res.status(400).json({
                msg: `Personaje ${personaje} o entretenimiento ${entretenimiento} no existe`
            })
        }

        const relationship = await PeliculaPersonaje.create({
            PersonajeNombre: personaje,
            entretenimientoTitulo: entretenimiento
        })

        res.status(200).json({
            relationship
        })
    } catch (error) {
        res.status(400).json({
            error
        })
    }

}

