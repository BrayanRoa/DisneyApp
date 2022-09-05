"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_controller_1 = require("../controllers/auth.controller");
const validar_campos_1 = require("../middlewares/validar_campos");
const router = (0, express_1.Router)();
router.get('/usuarios', auth_controller_1.getUsuarios);
router.get('/usuarios/:id', auth_controller_1.getUsuario);
router.post('/register', [
    (0, express_validator_1.check)('documento', 'El documento es obligatorio y debe tener minimo 8 caracteres o maximo 10').isLength({ min: 8, max: 10 }),
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('apellido', 'El apellido es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('telefono', 'El telefono es obligatorio y debe tener 10 digitos').isLength({ min: 10, max: 10 }),
    (0, express_validator_1.check)('correo', 'El correo es obligatorio').isEmail(),
    (0, express_validator_1.check)('id_tipo_documento', 'El tipo de documento es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('password', 'El password debe ser de minimo 6 caracteres').isLength({ min: 6 }),
    validar_campos_1.validarCampos
], auth_controller_1.register);
router.post('/login', [
    (0, express_validator_1.check)('documento', 'Es necesario el número de documento'),
    (0, express_validator_1.check)('password', 'la contraseña es obligatoria').not().isEmpty(),
    validar_campos_1.validarCampos
], auth_controller_1.login);
exports.default = router;
//# sourceMappingURL=usuarios.routes.js.map