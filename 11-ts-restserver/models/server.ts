import express, { Application } from "express";
import cors from "cors";
import userRouter from '../routes/usuario'
import db from "../db/connection";

class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/usuarios'
    }


    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';

        this.dbConnection();
        this.middlewares();
        this.routes();


    }
    async dbConnection() {
        try {
            await db.authenticate();
            console.log('database online');
        } catch (error) {
            throw new Error('error')
        }
    }

    middlewares() {
        // CORS 
        this.app.use(cors());
        // Lectura del body
        this.app.use(express.json());
        // definir carpeta publica 
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use(this.apiPaths.usuarios, userRouter)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto http://localhost:' + this.port);
        })
    }
}

export default Server;