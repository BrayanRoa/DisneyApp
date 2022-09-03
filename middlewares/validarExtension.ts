import { Request, Response } from "express";

const extensionesValidas = ['png', 'jpeg', 'jpg', 'gif']

export const validarExtension = (req: Request, res: Response, next: any) => {
	//* VALIDO SI HAY ERRORES A LA HORA DE RECIBIR LOS DATOS
    const extension = req.file?.mimetype.split('/') || '';

    if(!extensionesValidas.includes(extension[1])){
        
        return res.status(400).json({
            error:`La extension ${extension[1]} no es valida, las extensiones validas son: ${extensionesValidas}`
        })
    }
	next();
};
