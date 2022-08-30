//* IMPORTACIONES EXTERNAS
import dotenv from "dotenv";

//* IMPORTACIONES LOCALES
import Server from "./models/server";

//* CONFIGURAR VARIABLES DE ENTORNO
dotenv.config();

const server = new Server();

server.listen();