import express, { Application } from "express";
import cors from "cors";
import multer from 'multer'
// const upload = multer({ dest: 'uploads/' })

// import fileUpload from "express-fileupload";


import userRoutes from "../routes/usuarios.routes";
import charactersRoutes from "../routes/characters.routes";
import moviesRoutes from "../routes/movies.routes";
import genderRoutes from "../routes/gender.routes";
import uploadsRoutes from "../routes/uploadImage.routes";

const { sequelize } = require('../db/connection')
require('../db/asociaciones')

class Server {

    //* TIPADO DE EXPRESS
    private app: Application;
    private PORT: number | string;
    private rutas;

    constructor() {
        this.app = express();
        this.PORT = process.env.PORT || 3000;
        this.rutas = {
            register: '/auth',
            login: '/auth/login',
            personajes: '/characters',
            peliculas: '/movies',
            genero: '/genders',
            images:'/uploads'
        }
        // this.diskStorage();
        this.dbConnection()
        this.middlewares();
        this.routes();

    }

    async dbConnection() {
        try {
            // await db.authenticate();
            await sequelize.sync({ force: false });
            console.log('Database Online');
        } catch (e) {
            console.log(e);;
        }
    }

    middlewares() {
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.static('public'));
        // this.app.use(fileUpload({
        //     useTempFiles: true,
        //     tempFileDir: '/tmp/'
        // }));

    }

    routes() {
        this.app.use(this.rutas.register, userRoutes)
        this.app.use(this.rutas.personajes, charactersRoutes)
        this.app.use(this.rutas.peliculas, moviesRoutes)
        this.app.use(this.rutas.genero, genderRoutes)
        this.app.use(this.rutas.images, uploadsRoutes)
    }

    listen() {
        this.app.listen(this.PORT, () => {
            console.log(`Server running on port ${this.PORT}!!!`);
        })
    }

    // diskStorage(){
    //     const storage = multer.diskStorage({
    //         destination: function (req, file, cb) {
    //           cb(null, 'uploads/')
    //         },
    //         filename: function (req, file, cb) {
                
    //           cb(null, `${Date.now()}-${file.originalname}`)
    //         }
    //       })
          
    //       const upload = multer({ storage: storage })
    // }

    
}


export default Server;