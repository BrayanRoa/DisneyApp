import { Router } from "express";
import { validarCampos } from '../middlewares/validar_campos';
import { validarJWT } from '../middlewares/validarJWT';

import { check } from 'express-validator';
import { getGenders, postGender, prueba } from '../controllers/gender.controller';


const router = Router();

router.get('/', [
    validarJWT,
    validarCampos
], getGenders)

router.post('/', [
    check('nombre', 'El nombre del genero es obligatorio').not().isEmpty(),
    check('imagen').not().isEmpty(),
    validarJWT,
    validarCampos
], postGender)

router.post('/prueba', prueba)

export default router;