import { Request, Response } from "express";
import { Genero } from '../db/models/genero';


export const getGenders = async(req:Request, res:Response)=>{
    // const {nombre} = req.body;

    const genders = await Genero.findAll();

    if (!genders) {
        return res.status(400).json({
            msg: 'No hay generos aún'
        })
    }

    res.status(200).json({
        msg:genders
    })
}


export const postGender = async(req:Request, res:Response)=>{
    const {nombre, imagen } = req.body;

    const exist = await Genero.findByPk(nombre);
    if(exist){
        return res.status(400).json({
            msg:`Ya existe el genero ${nombre}`
        })
    }

    await Genero.create({nombre, imagen});

    res.status(200).json({
        msg:`Genero ${nombre} creado con exito`
    })
}
