import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { authMiddleware } from "./middlewares/authMiddleware";

const routes = Router();
const userController = new UserController();

/**
 * @swagger
 * tags:
 * - name: Auth
 * description: Autenticação de usuários
 * - name: Users
 * description: Gerenciamento de usuários
 */

/**
 * @swagger
 * /users:
 * post:
 * summary: Cria um novo usuário
 * tags: [Users]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/User'
 * responses:
 * 201:
 * description: Usuário criado com sucesso
 * 400:
 * description: Dados inválidos ou usuário já existe
 */
routes.post("/users", (req, res) => userController.create(req, res));

/**
 * @swagger
 * /login:
 * post:
 * summary: Realiza login e retorna o token JWT
 * tags: [Auth]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/LoginInput'
 * responses:
 * 200:
 * description: Login realizado com sucesso
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/LoginResponse'
 * 401:
 * description: Credenciais inválidas
 */
routes.post("/login", (req, res) => userController.login(req, res));

/**
 * @swagger
 * /users:
 * get:
 * summary: Lista todos os usuários (Protegido)
 * tags: [Users]
 * security:
 * - bearerAuth: []
 * responses:
 * 200:
 * description: Lista de usuários
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * $ref: '#/components/schemas/User'
 * 401:
 * description: Token não fornecido ou inválido
 */
routes.get("/users", authMiddleware, (req, res) => userController.list(req, res));

export default routes;