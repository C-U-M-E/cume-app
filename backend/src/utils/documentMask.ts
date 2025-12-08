import { User } from "../entities/User";

type MaskedDocument = {
  label: string;
  value: string;
};

/**
 * Usa preferencialmente o CPF; se não houver, usa RG.
 * Exemplos:
 *  - CPF bruto 44012345678 → CPF: 44*.***.***-78
 *  - RG bruto 23876590    → RG: 23*****90
 */
export function getMaskedDocument(user: User): MaskedDocument | null {
  if (user.cpf) {
    const digits = user.cpf.replace(/\D/g, "");
    if (digits.length === 11) {
      const masked = `${digits.slice(0, 2)}*.***.***-${digits.slice(9)}`;
      return { label: "CPF", value: masked };
    }
  }

  if (user.rg) {
    const digits = user.rg.replace(/\D/g, "");
    if (digits.length >= 4) {
      const masked = `${digits.slice(0, 2)}*****${digits.slice(-2)}`;
      return { label: "RG", value: masked };
    }
  }

  return null;
}
