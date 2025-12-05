const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "User",
    tableName: "usuarios",
    columns: {
        id: {
            primary: true,
            type: "uuid",
            generated: "uuid",
            name: "id_usuario"
        },
        nome: {
            type: "varchar",
            length: 150
        },
        email: {
            type: "varchar",
            unique: true
        },
        senha: {
            type: "varchar"
        },
        dataNascimento: {
            type: "date",
            name: "data_nascimento"
        },
        rg: {
            type: "varchar",
            length: 20,
            nullable: true
        },
        cpf: {
            type: "varchar",
            length: 14,
            unique: true
        },

        tipoUsuario: {
            type: "enum",
            enum: ["padrao", "admin"], 
            default: "padrao",
            name: "tipo_usuario"
        },

        statusCadastro: {
            type: "enum",
            enum: ["pendente", "ativo", "bloqueado"],
            default: "pendente",
            name: "status_cadastro"
        },

        statusAssociado: {
            type: "varchar", 
            nullable: true,
            name: "status_cadastro_associado" 
        },

        // --- Audit (TODO: criar um esquema de auditoria) ---
        createdAt: {
            createDate: true,
            name: "created_at"
        },
        updatedAt: {
            updateDate: true,
            name: "updated_at"
        }
    }
});