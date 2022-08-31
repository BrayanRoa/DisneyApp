import { Router } from "express";
import { deleteCharacter, getCharacter, getCharacters, getDetailsCharacters, postCharacter, putCharacter } from '../controllers/characters.controller';
import { validarCampos } from '../middlewares/validar_campos';
import { validarJWT } from '../middlewares/validarJWT';
import Usuarios from "../models/usuario";
import { check } from 'express-validator';
const router = Router();

//* MUY IMPORTANTE ESTA INTERFACE PORQUE ME PERMITE EXTENDERLA AGREGANDO MAS PROPIEDADES EN ESTE CASO A LA REQUEST 
declare global {
    namespace Express {
      interface Request {
        usuario: Usuarios,
        uid:string,
      }
    }
}

router.get('/', [
    validarJWT,
    validarCampos
], getCharacters);

router.get('/:nombre', [
  validarJWT,
  validarCampos
], getCharacter);

router.get('/details',[
  validarJWT,
  validarCampos
], getDetailsCharacters)

router.post('/',[
    check('nombre', 'El nombre del personaje es obligatorio').not().isEmpty(),
    check('imagen', 'La url de la imagen es obligatoria').not().isEmpty(),
    check('edad', 'La edad es obligatoria').not().isEmpty(),
    check('peso', 'El peso es obligatorio').not().isEmpty(),
    check('historia', 'La historia es obligatoria').not().isEmpty(),
    // check('entretenimientoTitulo', 'Debe agregarle la pelicula o la seria').not().isEmpty(),
    validarJWT,
    validarCampos
], postCharacter)

router.put('/:nombre',[
    validarJWT,
    validarCampos
], putCharacter)

router.delete('/:nombre',[
  validarJWT,
  validarCampos
], deleteCharacter)

export default router;