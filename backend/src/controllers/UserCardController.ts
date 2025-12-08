import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { User, RegistrationStatus } from "../entities/User";
import { getMaskedDocument } from "../utils/documentMask";

const userRepository = AppDataSource.getRepository(User);

function addMonths(date: Date, months: number): Date {
  const d = new Date(date.getTime());
  d.setMonth(d.getMonth() + months);
  return d;
}

/**
 * A carteirinha é derivada dos dados do usuário (tabela users).
 * Não há tabela própria para a carteirinha.
 */
export class UserCardController {
  /**
   * GET /membership-card
   * Visualizar carteirinha do usuário logado.
   * Requer JWT (authMiddleware).
   */
  async getMyCard(req: Request, res: Response) {
    try {
      const userId = (req as any).userId as string | undefined;

      if (!userId) {
        return res.status(401).json({ error: "Usuário não autenticado." });
      }

      const user = await userRepository.findOne({ where: { id: userId } });

      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado." });
      }

      // Emissão = data de criação do usuário
      const issueDate = user.createdAt;
      const expirationDate = addMonths(issueDate, 6);
      const today = new Date();
      const isExpired = expirationDate < today;

      let canClimb = false;
      let eligibilityStatus: "Apto a escalar" | "Pendente/Inválido";

      if (user.registrationStatus === RegistrationStatus.ACTIVE && !isExpired) {
        canClimb = true;
        eligibilityStatus = "Apto a escalar";
      } else {
        canClimb = false;
        eligibilityStatus = "Pendente/Inválido";
      }

      const maskedDoc = getMaskedDocument(user);

      return res.json({
        canClimb,
        eligibilityStatus, // "Apto a escalar" ou "Pendente/Inválido"
        // dados para a carteirinha completa
        card: {
          fullName: user.name,
          birthDate: user.birthDate,
          photoUrl: (user as any).photoUrl ?? null, // se o campo existir
          documentLabel: maskedDoc?.label ?? null,
          documentMasked: maskedDoc?.value ?? null,
          issueDate,
          expirationDate,
        },
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Erro ao buscar informações da carteirinha." });
    }
  }
}
