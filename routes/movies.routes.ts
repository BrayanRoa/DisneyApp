import { Router } from 'express'
import { validarJWT } from '../middlewares/validarJWT';
import { validarCampos } from '../middlewares/validar_campos';
import { getMovies, postMovie, getDetailsMovies, putMovie, deleteMovie } from '../controllers/movies.controller';
import { check } from 'express-validator';

const router = Router();


router.get('/', [
    validarJWT,
    validarCampos
], getMovies)

router.get('/details', [
    validarJWT,
    validarCampos
], getDetailsMovies)

router.post('/', [
    check('titulo', 'El titulo del entretenimiento es obligatorio').not().isEmpty(),
    check('fecha_creacion', 'La fecha es obligatoria').not().isEmpty(),
    check('calificacion', 'La calificación es obligatorio').not().isEmpty(),
    check('tipo', 'El tipo pelicula/serie es obligatoria').not().isEmpty(),
    validarJWT,
    validarCampos
], postMovie)


router.put('/:nombre', [
    check('fecha_creacion', 'La fecha es obligatoria').not().isEmpty(),
    check('calificacion', 'La calificación es obligatorio').not().isEmpty(),
    check('tipo', 'El tipo pelicula/serie es obligatoria').not().isEmpty(),
    validarJWT,
    validarCampos
], putMovie)

router.delete('/:nombre', [
    validarJWT,
    validarCampos
], deleteMovie)



export default router;