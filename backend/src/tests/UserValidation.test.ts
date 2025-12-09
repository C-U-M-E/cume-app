import request from "supertest";
import express from "express";
import { AppDataSource } from "../config/data-source";
import routes from "../routes";
import cors from "cors";
import { User } from "../entities/User";

// --- Configuração do App para Teste ---
const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

describe("Casos de Teste - Cadastro de Usuários", () => {
  
  // Conecta ao banco antes de começar os testes
  beforeAll(async () => {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
  });

  // Limpa o banco após os testes para não deixar lixo
  afterAll(async () => {
    const userRepo = AppDataSource.getRepository(User);
    await userRepo.delete({ email: "teste@cume.org" }); // Remove o usuário criado
    await AppDataSource.destroy();
  });

  // =================================================================
  // SEÇÃO 1: Validação do Email (IDs 1, 2 e 3)
  // =================================================================

  // Teste ID 3: Cadastro com email válido e único
  // Teste ID 4: Cadastro válido de "Participante Geral" (Fluxo Completo)
  it("ID 3 e 4: Deve aceitar cadastro com email válido e criar usuário", async () => {
    const response = await request(app).post("/users").send({
      name: "Participante Geral Teste",
      email: "teste@cume.org", // Email Único
      password: "SenhaSegura123",
      cpf: "12345678900",
      birthDate: "1990-01-01"
    });

    // Validações
    expect(response.status).toBe(201); // Sucesso
    expect(response.body).toHaveProperty("id"); // Usuário criado
    expect(response.body.email).toBe("teste@cume.org");
  });

  // Teste ID 1: Cadastro com email existente
  it("ID 1: Não deve aceitar cadastro com email duplicado", async () => {
    // Tenta cadastrar DE NOVO o mesmo email do teste anterior
    const response = await request(app).post("/users").send({
      name: "Usuário Duplicado",
      email: "teste@cume.org", // Email já usado acima
      password: "123",
      cpf: "99988877766",
      birthDate: "1990-01-01"
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error"); // Deve retornar erro
  });

  // Teste ID 2: Cadastro com email com formato inválido
  it("ID 2: Não deve aceitar cadastro com email inválido", async () => {
    const response = await request(app).post("/users").send({
      name: "Email Errado",
      email: "teste@", // Formato inválido
      password: "123",
      cpf: "11122233344",
      birthDate: "1990-01-01"
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toMatch(/inválido/i); // Verifica se a mensagem fala de erro de email
  });

  // =================================================================
  // SEÇÃO 3: Estado inicial do usuário (ID 5)
  // =================================================================

  // Teste ID 5: Cadastro deve gerar status padrão "pending"
  it("ID 5: Novo usuário deve ter status inicial 'Pendente'", async () => {
    // Vamos consultar o usuário criado no primeiro teste (ID 3)
    const userRepo = AppDataSource.getRepository(User);
    const savedUser = await userRepo.findOneBy({ email: "teste@cume.org" });

    // O usuário deve existir
    expect(savedUser).toBeDefined();

    // O status deve ser 'pending' (conforme sua Entidade e Regra de Negócio)
    expect(savedUser?.registrationStatus).toBe("pending"); 
  });

});