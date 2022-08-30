"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//* IMPORTACIONES EXTERNAS
const dotenv_1 = __importDefault(require("dotenv"));
//* IMPORTACIONES LOCALES
const server_1 = __importDefault(require("./models/server"));
//* CONFIGURAR VARIABLES DE ENTORNO
dotenv_1.default.config();
const server = new server_1.default();
server.listen();
//# sourceMappingURL=app.js.map