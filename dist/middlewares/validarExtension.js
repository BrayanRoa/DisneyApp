"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarExtension = void 0;
const extensionesValidas = ['png', 'jpeg', 'jpg', 'gif'];
const validarExtension = (req, res, next) => {
    var _a;
    //* VALIDO SI HAY ERRORES A LA HORA DE RECIBIR LOS DATOS
    const extension = ((_a = req.file) === null || _a === void 0 ? void 0 : _a.mimetype.split('/')) || '';
    if (!extensionesValidas.includes(extension[1])) {
        return res.status(400).json({
            error: `La extension ${extension[1]} no es valida, las extensiones validas son: ${extensionesValidas}`
        });
    }
    next();
};
exports.validarExtension = validarExtension;
//# sourceMappingURL=validarExtension.js.map