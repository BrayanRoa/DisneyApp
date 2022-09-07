"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validarJWT_1 = require("../middlewares/validarJWT");
const validar_campos_1 = require("../middlewares/validar_campos");
const movies_controller_1 = require("../controllers/movies.controller");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
router.get('/', [
    validarJWT_1.validarJWT,
    validar_campos_1.validarCampos
], movies_controller_1.getMovies);
router.get('/details', [
    validarJWT_1.validarJWT,
    validar_campos_1.validarCampos
], movies_controller_1.getDetailsMovies);
router.post('/', [
    (0, express_validator_1.check)('titulo', 'El titulo del entretenimiento es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('fecha_creacion', 'La fecha es obligatoria').not().isEmpty(),
    (0, express_validator_1.check)('calificacion', 'La calificación es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('tipo', 'El tipo pelicula/serie es obligatoria').not().isEmpty(),
    validarJWT_1.validarJWT,
    validar_campos_1.validarCampos
], movies_controller_1.postMovie);
router.put('/:nombre', [
    (0, express_validator_1.check)('fecha_creacion', 'La fecha es obligatoria').not().isEmpty(),
    (0, express_validator_1.check)('calificacion', 'La calificación es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('tipo', 'El tipo pelicula/serie es obligatoria').not().isEmpty(),
    validarJWT_1.validarJWT,
    validar_campos_1.validarCampos
], movies_controller_1.putMovie);
router.delete('/:nombre', [
    validarJWT_1.validarJWT,
    validar_campos_1.validarCampos
], movies_controller_1.deleteMovie);
exports.default = router;
//# sourceMappingURL=movies.routes.js.map