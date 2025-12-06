import swaggerJsdoc from "swagger-jsdoc";
import path from "path";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CUME API",
      version: "1.0.0",
      description: "Documentação da API do sistema CUME",
      contact: {
        name: "Equipe CUME"
      }
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor Local"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      },
      schemas: {
        User: {
          type: "object",
          required: ["name", "email", "password", "cpf"],
          properties: {
            id: { type: "string", format: "uuid" },
            name: { type: "string" },
            email: { type: "string", format: "email" },
            password: { type: "string", format: "password" },
            birthDate: { type: "string", format: "date" },
            rg: { type: "string" },
            cpf: { type: "string" },
            userType: { 
              type: "string", 
              enum: ["standard", "admin"],
              default: "standard" 
            }
          }
        },
        LoginInput: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", format: "email", example: "felipe@cume.com" },
            password: { type: "string", format: "password", example: "123456" }
          }
        },
        LoginResponse: {
          type: "object",
          properties: {
            user: { $ref: "#/components/schemas/User" },
            token: { type: "string", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }
          }
        }
      }
    }
  },
  apis: [path.join(__dirname, "../routes.ts")], 
};

const specs = swaggerJsdoc(options);

export default specs;