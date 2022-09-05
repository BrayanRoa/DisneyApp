"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//* IMPORTACIONES EXTERNAS
const express_1 = require("express");
const express_validator_1 = require("express-validator");
//* IMPORTACIONES INTERNAS
const characters_controller_1 = require("../controllers/characters.controller");
const validar_campos_1 = require("../middlewares/validar_campos");
const validarJWT_1 = require("../middlewares/validarJWT");
const router = (0, express_1.Router)();
router.get('/', [
    validarJWT_1.validarJWT,
    validar_campos_1.validarCampos
], characters_controller_1.getCharacters);
router.get('/:nombre', [
    validarJWT_1.validarJWT,
    validar_campos_1.validarCampos
], characters_controller_1.getCharacter);
router.get('/details', [
    validarJWT_1.validarJWT,
    validar_campos_1.validarCampos
], characters_controller_1.getDetailsCharacters);
router.post('/', [
    (0, express_validator_1.check)('nombre', 'El nombre del personaje es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('imagen', 'La url de la imagen es obligatoria').not().isEmpty(),
    (0, express_validator_1.check)('edad', 'La edad es obligatoria').not().isEmpty(),
    (0, express_validator_1.check)('peso', 'El peso es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('historia', 'La historia es obligatoria').not().isEmpty(),
    // check('entretenimientoTitulo', 'Debe agregarle la pelicula o la seria').not().isEmpty(),
    validarJWT_1.validarJWT,
    validar_campos_1.validarCampos
], characters_controller_1.postCharacter);
router.put('/:nombre', [
    validarJWT_1.validarJWT,
    validar_campos_1.validarCampos
], characters_controller_1.putCharacter);
router.delete('/:nombre', [
    validarJWT_1.validarJWT,
    validar_campos_1.validarCampos
], characters_controller_1.deleteCharacter);
router.post('/association', [
    (0, express_validator_1.check)('entretenimiento', 'El campo entretenimiento es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('personaje', 'El personaje es obligatorio').not().isEmpty(),
    validarJWT_1.validarJWT,
    validar_campos_1.validarCampos
], characters_controller_1.association);
exports.default = router;
//# sourceMappingURL=characters.routes.js.map