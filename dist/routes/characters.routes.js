"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const characters_controller_1 = require("../controllers/characters.controller");
const validar_campos_1 = require("../middlewares/validar_campos");
const validarJWT_1 = require("../middlewares/validarJWT");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
router.get('/', [
    validarJWT_1.validarJWT,
    validar_campos_1.validarCampos
], characters_controller_1.getCharacters);
router.post('/', [
    (0, express_validator_1.check)('nombre', 'El nombre del personaje es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('imagen', 'La url de la imagen es obligatoria').not().isEmpty(),
    (0, express_validator_1.check)('edad', 'La edad es obligatoria').not().isEmpty(),
    (0, express_validator_1.check)('peso', 'El peso es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('historia', 'La historia es obligatoria').not().isEmpty(),
    validarJWT_1.validarJWT,
    validar_campos_1.validarCampos
], characters_controller_1.postCharacter);
router.put('/:nombre', [
    validarJWT_1.validarJWT,
    validar_campos_1.validarCampos
], characters_controller_1.putCharacter);
router.delete('/:nombre', characters_controller_1.deleteCharacter);
exports.default = router;
//# sourceMappingURL=characters.routes.js.map