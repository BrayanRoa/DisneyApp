import { Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { Usuarios } from '../db/models/usuarios.models';

//* ESTA INTERFACE ME AYUDA PARA PODER DESESTRUCTURAR EL PAYLOAD, DE OTRA MANERA NO PODRIA PORQUE TS ME DA ERROR POR LOS TIPOS
interface JwtPayload {
	id: string
}

export const validarJWT = async(req:Request, res:Response, next:any)=>{
	
    const token = req.header('x-token');
	if(!token){
		return res.status(401).json({
			msg:'No hay token en la petición'
		});
	}

    try {
		
		//* OBTENGO EL DOC DEL USUARIO 
        const {id} = jwt.verify(token, process.env.SECRET_KEY || '') as JwtPayload;

		//* LO BUSCO EN LA BASE DE DATOS
		const usuario = await Usuarios.findByPk(id);

		if(!usuario){
			return res.status(500).json({
				msg:'Token no valido - Usuario no registrado en BD'
			});
		}

        //* verificar si el usuario que desea hacer la accion aun sigue activo
		if(!usuario?.activo){
			return res.status(401).json({
				msg:'Token no valido - usuario inactivo para realizar esta acción'
			});
		}

        req.usuario = usuario;
		req.uid = id.toString();
		next();
    } catch (error) {
        res.status(401).json({
			msg:'Token no valido',
			error
		});
    }
}



