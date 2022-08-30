// const { validationResult } = require('express-validator');
import { validationResult } from "express-validator";
import { Request, Response } from "express";

export const validarCampos = (req:Request, res:Response, next:any)=>{
	//* VALIDO SI HAY ERRORES A LA HORA DE RECIBIR LOS DATOS
	const errors = validationResult(req);

	if(!errors.isEmpty()){
		return res.status(400).json(errors);
	}
	next();
};

// module.exports = {
// 	validarCampos
// };