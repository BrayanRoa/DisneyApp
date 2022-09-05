"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uploadImage_controller_1 = require("../controllers/uploadImage.controller");
const savedImage_1 = require("../helpers/savedImage");
const validarExtension_1 = require("../middlewares/validarExtension");
const validarJWT_1 = require("../middlewares/validarJWT");
const validar_campos_1 = require("../middlewares/validar_campos");
const router = (0, express_1.Router)();
router.post('/:coleccion/:nombre', [
    savedImage_1.upload.single('file'),
    validarExtension_1.validarExtension,
    validarJWT_1.validarJWT,
    validar_campos_1.validarCampos
], uploadImage_controller_1.uploadImageCloudinary);
// ], uploadImage)
router.get('/:coleccion/:nombre', [
    validarJWT_1.validarJWT,
    validar_campos_1.validarCampos
], uploadImage_controller_1.getImage);
exports.default = router;
//# sourceMappingURL=uploadImage.routes.js.map