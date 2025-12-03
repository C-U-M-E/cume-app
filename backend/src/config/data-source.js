require("dotenv").config(); 
const { DataSource } = require("typeorm");

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.TYPEORM_HOST,
    port: parseInt(process.env.TYPEORM_PORT || "5432"),
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    synchronize: false, 
    logging: true,
    entities: ["src/entities/**/*.js"],   
    migrations: ["src/migrations/**/*.js"], 
    subscribers: [],
});

module.exports = { AppDataSource };