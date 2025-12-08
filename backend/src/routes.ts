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
 * /users/identity-doc:
 * post:
 * summary: Upload do documento de identidade (RG/CNH)
 * tags: [Users]
 * security:
 * - bearerAuth: []
 * requestBody:
 * content:
 * multipart/form-data:
 * schema:
 * type: object
 * properties:
 * file:
 * type: string
 * format: binary
 * description: Imagem do RG ou CNH
 * responses:
 * 200:
 * description: Documento salvo com sucesso
 * 400:
 * description: Arquivo inválido ou ausente
 * 401:
 * description: Não autorizado
 */
routes.post(
    "/users/identity-doc", 
    authMiddleware, 
    upload.single('file'), 
    (req, res) => docController.uploadIdentity(req, res)
);

/**
 * @swagger
 * /users/profile-photo:
 * post:
 * summary: Upload da foto de perfil (Avatar)
 * tags: [Users]
 * security:
 * - bearerAuth: []
 * requestBody:
 * content:
 * multipart/form-data:
 * schema:
 * type: object
 * properties:
 * file:
 * type: string
 * format: binary
 * description: Foto de perfil (3x4)
 * responses:
 * 200:
 * description: Foto salva com sucesso
 * 400:
 * description: Arquivo inválido ou ausente
 * 401:
 * description: Não autorizado
 */
routes.post(
    "/users/profile-photo", 
    authMiddleware, 
    upload.single('file'), 
    (req, res) => docController.uploadProfilePhoto(req, res)
);

/**
 * @swagger
 * /documents/sign-term:
 * post:
 * summary: Assinar termo de responsabilidade (Envia PDF e Ativa Usuário)
 * tags: [Documents]
 * security:
 * - bearerAuth: []
 * requestBody:
 * content:
 * multipart/form-data:
 * schema:
 * type: object
 * properties:
 * file:
 * type: string
 * format: binary
 * description: PDF do termo assinado
 * responses:
 * 201:
 * description: Termo assinado e usuário ativado
 * 400:
 * description: Documentos pendentes (Foto/RG) ou arquivo ausente
 * 401:
 * description: Não autorizado
 */
routes.post(
    "/documents/sign-term", 
    authMiddleware, 
    upload.single('file'), 
    (req, res) => docController.signTerm(req, res)
);

export default routes;