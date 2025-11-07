import React from 'react';
import MiniCard from '../../components/MiniCard';

function MiniCardPage() {
  // Mock de dados do usuário - em produção viria de um contexto/auth ou parâmetros da URL
  const user = {
    name: "Gabriel Filho",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    birthDate: "05/01/2003",
    rg: "234567890",
    cpf: "44012345678",
    issueDate: "02/05/2025",
    expiryDate: "02/11/2025"
  };

  return (
    <div className="h-full bg-white flex flex-col px-24 py-0">
      {/* MiniCard em tamanho large */}
      <div className="flex flex-col gap-48 items-center w-full">
        <MiniCard
          type="active"
          size="large"
          name={user.name}
          avatar={user.avatar}
          birthDate={user.birthDate}
          rg={user.rg}
          cpf={user.cpf}
          issueDate={user.issueDate}
          expiryDate={user.expiryDate}
        />
      </div>
    </div>
  );
}

export default MiniCardPage;
