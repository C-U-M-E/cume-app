import { Router } from "express";
import { UserController } from "./controllers/UserController";

const routes = Router();
const userController = new UserController();

routes.post("/users", (req, res) => userController.create(req, res));
routes.get("/users", (req, res) => userController.list(req, res));

export default routes;