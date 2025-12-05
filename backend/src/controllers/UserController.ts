import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import bcrypt from "bcryptjs";

const userRepository = AppDataSource.getRepository(User);

export class UserController {
    
    async create(req: Request, res: Response) {
        try {
            const { name, email, password, birthDate, rg, cpf, userType } = req.body;

            const userExists = await userRepository.findOne({
                where: [{ email }, { cpf }]
            });

            if (userExists) {
                return res.status(400).json({ error: "Usuário já existe." });
            }

            const passwordHash = await bcrypt.hash(password, 8);

            const newUser = userRepository.create({
                name,
                email,
                password: passwordHash,
                birthDate,
                rg,
                cpf,
                userType: userType || "standard",
                registrationStatus: "pending" as any, 
                associateStatus: null
            });

            await userRepository.save(newUser);

            const { password: _, ...userReturn } = newUser;

            return res.status(201).json(userReturn);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro interno." });
        }
    }

    async list(req: Request, res: Response) {
        const users = await userRepository.find();
        return res.json(users);
    }
}