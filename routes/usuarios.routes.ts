import { Router } from "express";
import { check } from "express-validator";
import { login, register, getUsuarios, getUsuario } from '../controllers/auth.controller';
import { validarCampos } from '../middlewares/validar_campos';

const router = Router();

router.get('/usuarios', getUsuarios);

router.get('/usuarios/:id', getUsuario);

router.post('/register',[
    check('documento', 'El documento es obligatorio y debe tener minimo 8 caracteres o maximo 10').isLength({min:8, max:10}),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    check('telefono', 'El telefono es obligatorio y debe tener 10 digitos').isLength({min:10, max:10}),
    check('correo', 'El correo es obligatorio').isEmail(),
    // check('tipoDocumentoid', 'El tipo de documento es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser de minimo 6 caracteres').isLength({min:6}),
    validarCampos
], register);

router.post('/login',[
    check('documento', 'Es necesario el número de documento'),
    check('password', 'la contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);


export default router;
