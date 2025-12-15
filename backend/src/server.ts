import "reflect-metadata";
import express from "express";
import cors from "cors";
import path from "path";
import { AppDataSource } from "./config/data-source";
import routes from "./routes";

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json"; 
import { startCronJobs } from "./services/CronService";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.resolve(__dirname, "..", "..", "uploads")));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(routes);

AppDataSource.initialize().then(() => {
    startCronJobs();
    
    app.listen(3000, () => {
        console.log("Server started on port 3000");
        console.log("Swagger available at http://localhost:3000/api-docs");
    });
}).catch(error => console.log(error));