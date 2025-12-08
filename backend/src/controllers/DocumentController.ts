import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { User, RegistrationStatus } from "../entities/User";
import { TermOfResponsibility } from "../entities/TermOfResponsibility";
import { TermSignature } from "../entities/TermSignature";

export class DocumentController {
    
    async uploadDocuments(req: Request, res: Response) {
        try {
            const userId = (req as any).userId; 
            
            const files = req.files as { [fieldname: string]: Express.Multer.File[] };

            // 1. Verificação atualizada: agora exige 3 arquivos
            if (!files['document'] || !files['photo'] || !files['identity_document']) {
                return res.status(400).json({ 
                    error: "Required files missing. Please upload: document (term), photo (profile) and identity_document (ID Card)." 
                });
            }

            const userRepo = AppDataSource.getRepository(User);
            const termRepo = AppDataSource.getRepository(TermOfResponsibility);
            const signatureRepo = AppDataSource.getRepository(TermSignature);

            const user = await userRepo.findOneBy({ id: userId });
            if (!user) return res.status(404).json({ error: "User not found." });

            const activeTerm = await termRepo.find({
                order: { createdAt: "DESC" },
                take: 1
            });

            if (activeTerm.length === 0) {
                return res.status(400).json({ error: "No active Term of Responsibility found." });
            }

            const today = new Date();
            const expirationDate = new Date(today);
            expirationDate.setMonth(expirationDate.getMonth() + 6);

            // 2. Salvar com o novo campo
            const newSignature = signatureRepo.create({
                user: user,
                term: activeTerm[0],
                signatureDate: today,
                expirationDate: expirationDate,
                documentUrl: files['document'][0].filename,
                photoUrl: files['photo'][0].filename,
                identityDocumentUrl: files['identity_document'][0].filename 
            });

            await signatureRepo.save(newSignature);

            user.registrationStatus = RegistrationStatus.ACTIVE; 
            await userRepo.save(user);

            return res.status(201).json({ 
                message: "All documents uploaded and Term signed successfully!",
                expirationDate: expirationDate,
                status: "Active"
            });

        } catch (error) {
            console.error("Upload Error:", error);
            return res.status(500).json({ error: "Internal server error during upload." });
        }
    }
}