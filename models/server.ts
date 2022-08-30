import express, {Application} from "express";
import cors from "cors";

import userRoutes from "../routes/usuarios.routes";
import characters from "../routes/characters.routes";

const { sequelize } = require('../db/connection')
require('../db/asociaciones')

class Server{

    //* TIPADO DE EXPRESS
    private app   : Application;
    private PORT  : number | string;
    private rutas;

    constructor(){
        this.app = express();
        this.PORT = process.env.PORT || 3000;
        this.rutas = {
            register:'/auth',
            login:'/auth/login',
            personajes:'/characters'
        }
        this.dbConnection()
        this.middlewares();
        this.routes();
    }

    async dbConnection(){
        try {
            // await db.authenticate();
            await sequelize.sync({force:false});
            console.log('Database Online');
        } catch (e) {
            console.log(e);;
        }
    }

    middlewares(){
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.rutas.register, userRoutes)
        this.app.use(this.rutas.personajes, characters)
    }

    listen(){
        this.app.listen(this.PORT, ()=>{
            console.log(`Server running on port ${this.PORT}!!!`);
        })
    }
}

export default Server;