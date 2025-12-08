import multer from "multer";
import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { authMiddleware } from "./middlewares/authMiddleware";
import { UserCardController } from "./controllers/UserCardController";
import { DocumentController } from "./controllers/DocumentController";
import { multerConfig } from "./config/multer";

const routes = Router();
const userController = new UserController();
const userCardController = new UserCardController(); 
const upload = multer(multerConfig);
const docController = new DocumentController();

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

/**
 * @swagger
 * /membership-card:
 * get:
 * summary: Visualizar carteirinha do usuário logado
 * tags: [Users]
 * security:
 * - bearerAuth: []
 * responses:
 * 200:
 * description: Dados da carteirinha
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/UserCard'
 * 401:
 * description: Não autorizado
 * 404:
 * description: Usuário não encontrado
 */
routes.get("/membership-card", authMiddleware, (req, res) => userCardController.getMyCard(req, res));

/**
 * @swagger
 * /documents/upload:
 * post:
 * summary: Upload documents for term signature
 * tags: [Documents]
 * security:
 * - bearerAuth: []
 * requestBody:
 * content:
 * multipart/form-data:
 * schema:
 * type: object
 * properties:
 * document:
 * type: string
 * format: binary
 * photo:
 * type: string
 * format: binary
 * responses:
 * 201:
 * description: Upload successful
 * 400:
 * description: Missing files
 */
routes.post(
    "/documents/upload", 
    authMiddleware, 
    upload.fields([
        { name: 'document', maxCount: 1 },
        { name: 'photo', maxCount: 1 },
        { name: 'identity_document', maxCount: 1 }
    ]), 
    (req, res) => docController.uploadDocuments(req, res)
);
export default routes;