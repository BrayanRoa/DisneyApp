"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const usuarios_routes_1 = __importDefault(require("../routes/usuarios.routes"));
const characters_routes_1 = __importDefault(require("../routes/characters.routes"));
const movies_routes_1 = __importDefault(require("../routes/movies.routes"));
const gender_routes_1 = __importDefault(require("../routes/gender.routes"));
const uploadImage_routes_1 = __importDefault(require("../routes/uploadImage.routes"));
const { sequelize } = require('../db/connection');
require('../db/asociaciones');
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.PORT = process.env.PORT || 3000;
        this.rutas = {
            register: '/auth',
            login: '/auth/login',
            personajes: '/characters',
            peliculas: '/movies',
            genero: '/genders',
            images: '/uploads'
        };
        this.dbConnection();
        this.middlewares();
        this.routes();
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // await db.authenticate();
                yield sequelize.sync({ force: false });
                console.log('Database Online');
            }
            catch (e) {
                console.log(e);
                ;
            }
        });
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.static('public'));
    }
    routes() {
        this.app.use(this.rutas.register, usuarios_routes_1.default);
        this.app.use(this.rutas.personajes, characters_routes_1.default);
        this.app.use(this.rutas.peliculas, movies_routes_1.default);
        this.app.use(this.rutas.genero, gender_routes_1.default);
        this.app.use(this.rutas.images, uploadImage_routes_1.default);
    }
    listen() {
        this.app.listen(this.PORT, () => {
            console.log(`Server running on port ${this.PORT}!!!`);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map