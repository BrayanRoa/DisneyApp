//* IMPORTACIONES EXTERNAS
import dotenv from "dotenv";

//* IMPORTACIONES LOCALES
import Server from "./models/server";

//* CONFIGURAR VARIABLES DE ENTORNO
dotenv.config();

console.log(process.env.API_KEY_SEND_GRID)

const server = new Server();

server.listen();