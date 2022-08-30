import { Request, Response } from "express";
import { Personaje } from '../db/models/personaje';

export const getCharacters = async (req:Request, res:Response)=>{

    const characters = await Personaje.findAll({
        attributes:['nombre', 'imagen']
    });

    if(!characters){
        return res.status(400).json({
            msg:'No hay personajes aún'
        })
    }

    res.status(200).json({
        characters
    })
}

export const postCharacter = async (req:Request, res:Response)=>{
    
    const {nombre, imagen, edad, peso, historia} = req.body;

    try {

        //* VALIDO SI ESE PERSONAJE YA EXISTE EN BD
        const existe = await Personaje.findByPk(nombre);
        if(existe){
            return res.status(400).json({
                msg:`El personaje ${nombre} ya esta registrado`
            })
        }

        nombre.toLowerCase();
        const personaje = await Personaje.create({
            nombre, imagen, edad, peso, historia
        });

        res.json({
            personaje
        })
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg:error
        })
    }
}


export const putCharacter = async (req:Request, res:Response)=>{

    const {nombre} = req.params;
    const {imagen, peso, historia, edad} = req.body;

    const existe = await Personaje.findByPk(nombre.toLowerCase());
    if(!existe){
        return res.status(400).json({
            msg:`El personaje ${nombre} no existe`
        })
    }

    const personaje = await Personaje.update(
        {imagen, peso, historia, edad},
        {where:{nombre}}
    );

    res.status(200).json({
        personaje
    })
}

export const deleteCharacter = async (req:Request, res:Response)=>{
    const {nombre} = req.params;

    const existe = await Personaje.findByPk(nombre.toLowerCase());

    if(!existe){
        return res.status(400).json({
            msg:`El personaje ${nombre} no existe`
        })
    }

    const personaje = await Personaje.update(
        {activo:0},
        {where:{nombre}}
    );

    res.status(200).json({
        personaje
    })
}

// module.exports = { getCharacters }