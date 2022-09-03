import { Router } from 'express'
import { getImage, uploadImage, uploadImageCloudinary } from '../controllers/uploadImage.controller';
import { upload } from '../helpers/savedImage';
import { validarExtension } from '../middlewares/validarExtension';
import { validarJWT } from '../middlewares/validarJWT';
import { validarCampos } from '../middlewares/validar_campos';

const router = Router();

// router.post('/:coleccion/:nombre');

router.post('/:coleccion/:nombre', [
    upload.single('file'),
    validarExtension,
    validarJWT,
    validarCampos
], uploadImageCloudinary)
// ], uploadImage)

router.get('/:coleccion/:nombre',[
    validarJWT,
    validarCampos
], getImage)

export default router;