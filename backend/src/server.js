require("reflect-metadata");
const express = require("express");
const cors = require("cors");
const { AppDataSource } = require("./config/data-source"); 

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Backend CUME rodando com Migrations!" });
});

AppDataSource.initialize()
    .then(() => {
        app.listen(3000, () => {
            console.log("Servidor rodando na porta 3000");
        });
    })
    .catch((error) => console.log("Erro ao conectar no banco:", error));