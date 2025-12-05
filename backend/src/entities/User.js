const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "User",
    tableName: "users",
    columns: {
        id: {
            primary: true,
            type: "uuid",
            generated: "uuid",
            name: "id"
        },
        name: {
            type: "varchar",
            length: 150
        },
        email: {
            type: "varchar",
            unique: true
        },
        password: { 
            type: "varchar"
        },
        birthDate: { 
            type: "date",
            name: "birth_date"
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

        userType: { 
            type: "enum",
            enum: ["standard", "admin"], 
            default: "standard",
            name: "user_type"
        },

        registrationStatus: { 
            type: "enum",
            enum: ["pending", "active", "blocked"], 
            default: "pending",
            name: "registration_status"
        },

        associateStatus: { 
            type: "varchar", 
            nullable: true,
            name: "associate_status" 
        },

        // --- Audit ---
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