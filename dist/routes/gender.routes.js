"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validar_campos_1 = require("../middlewares/validar_campos");
const validarJWT_1 = require("../middlewares/validarJWT");
const express_validator_1 = require("express-validator");
const gender_controller_1 = require("../controllers/gender.controller");
const router = (0, express_1.Router)();
router.get('/', [
    validarJWT_1.validarJWT,
    validar_campos_1.validarCampos
], gender_controller_1.getGenders);
router.post('/', [
    (0, express_validator_1.check)('nombre', 'El nombre del genero es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('imagen').not().isEmpty(),
    validarJWT_1.validarJWT,
    validar_campos_1.validarCampos
], gender_controller_1.postGender);
router.post('/prueba', gender_controller_1.prueba);
exports.default = router;
//# sourceMappingURL=gender.routes.js.map