import "reflect-metadata";
import express from "express";
import cors from "cors";
import { AppDataSource } from "./config/data-source";
import routes from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

AppDataSource.initialize().then(() => {
    app.listen(3000, () => {
        console.log("Server started on port 3000");
    });
}).catch(error => console.log(error));