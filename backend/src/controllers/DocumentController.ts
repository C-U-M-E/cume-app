import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { User, RegistrationStatus } from "../entities/User";
import { TermOfResponsibility } from "../entities/TermOfResponsibility";
import { TermSignature } from "../entities/TermSignature";

export class DocumentController {
    
    // 1. Upload da Identidade (RG/CNH) -> Salva em users table
    async uploadIdentity(req: Request, res: Response) {
        try {
            const userId = (req as any).userId;
            const file = req.file; // single file upload

            if (!file) {
                return res.status(400).json({ error: "Arquivo de identidade obrigatório." });
            }

            const userRepo = AppDataSource.getRepository(User);
            const user = await userRepo.findOneBy({ id: userId });
            
            if (!user) return res.status(404).json({ error: "Usuário não encontrado." });

            // Atualiza apenas o campo de identidade
            user.identityDocumentUrl = file.filename;
            await userRepo.save(user);

            return res.status(200).json({ message: "Documento de identidade salvo com sucesso!" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro interno ao salvar identidade." });
        }
    }

    // 2. Upload da Foto de Perfil -> Salva em users table
    async uploadProfilePhoto(req: Request, res: Response) {
        try {
            const userId = (req as any).userId;
            const file = req.file; // single file upload

            if (!file) {
                return res.status(400).json({ error: "Foto de perfil obrigatória." });
            }

            const userRepo = AppDataSource.getRepository(User);
            const user = await userRepo.findOneBy({ id: userId });
            
            if (!user) return res.status(404).json({ error: "Usuário não encontrado." });

            // Atualiza apenas a foto de perfil
            user.profilePhotoUrl = file.filename;
            await userRepo.save(user);

            return res.status(200).json({ message: "Foto de perfil salva com sucesso!" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro interno ao salvar foto de perfil." });
        }
    }

    // 3. Assinar Termo (Envia o PDF assinado) -> Valida tudo e Ativa o Usuário
    async signTerm(req: Request, res: Response) {
        try {
            const userId = (req as any).userId;
            const file = req.file; // O PDF do termo assinado

            if (!file) {
                return res.status(400).json({ error: "O arquivo do termo assinado é obrigatório." });
            }

            const userRepo = AppDataSource.getRepository(User);
            const termRepo = AppDataSource.getRepository(TermOfResponsibility);
            const signatureRepo = AppDataSource.getRepository(TermSignature);

            const user = await userRepo.findOneBy({ id: userId });
            if (!user) return res.status(404).json({ error: "Usuário não encontrado." });

            // VALIDAÇÃO DE NEGÓCIO:
            // Só permite assinar o termo se já tiver enviado os documentos pessoais
            if (!user.identityDocumentUrl) {
                return res.status(400).json({ 
                    error: "Você precisa enviar seu Documento de Identidade antes de assinar o termo." 
                });
            }

            // Busca o termo ativo mais recente
            const activeTerm = await termRepo.find({
                order: { createdAt: "DESC" },
                take: 1
            });

            if (activeTerm.length === 0) {
                return res.status(400).json({ error: "Nenhum termo de responsabilidade ativo encontrado." });
            }

            // Calcula validade (6 meses)
            const today = new Date();
            const expirationDate = new Date(today);
            expirationDate.setMonth(expirationDate.getMonth() + 6);

            // Cria a assinatura vinculando ao termo atual e salvando o PDF
            const newSignature = signatureRepo.create({
                user: user,
                term: activeTerm[0],
                signatureDate: today,
                expirationDate: expirationDate,
                termDocumentUrl: file.filename
            });

            await signatureRepo.save(newSignature);

            // Ativa o usuário
            user.registrationStatus = RegistrationStatus.ACTIVE;
            await userRepo.save(user);

            return res.status(201).json({ 
                message: "Termo assinado e cadastro ativado com sucesso!",
                expirationDate: expirationDate,
                status: "Active"
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro interno ao assinar termo." });
        }
    }
}