import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            const user = await userRepository.findOne({
                where: { email }
            });

            if (!user) {
                return res.status(401).json({ error: "Email ou senha incorretos." });
            }

            const isValidPassword = await bcrypt.compare(password, user.password);

            if (!isValidPassword) {
                return res.status(401).json({ error: "Email ou senha incorretos." });
            }

            const secret = process.env.JWT_SECRET || "default_secret";
            
            const token = jwt.sign(
                { id: user.id, userType: user.userType }, 
                secret,
                { expiresIn: "1d" } 
            );

            const { password: _, ...userLogin } = user;

            return res.json({
                user: userLogin,
                token: token
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro interno ao realizar login." });
        }
    }

    async list(req: Request, res: Response) {
        const users = await userRepository.find();
        return res.json(users);
    }
}