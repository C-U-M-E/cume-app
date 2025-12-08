import React, { useState, useEffect } from 'react';import MiniCard from '../../components/MiniCard';
import avatarCume from '../../assets/images/foto_perfil_cume.png';
function MiniCardPage() {

  const [cardData, setCardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const formatDate = (isoString) => {
    if (!isoString) return '--/--/----';
    return new Date(isoString).toLocaleDateString('pt-BR');
  };

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const token = localStorage.getItem('cume_token');
        
        if (!token) {
          throw new Error("Usuário não autenticado");
        }

        const response = await fetch('/api/membership-card', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();

        if (response.ok) {
          setCardData(data);
        } else {
          setError(data.error || 'Erro ao carregar carteirinha');
        }
      } catch (err) {
        console.error(err);
        setError('Erro de conexão ou autenticação.');
      } finally {
        setLoading(false);
      }
    };

    fetchCard();
  }, []);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-500">Carregando carteirinha...</p>
      </div>
    );
  }

  if (error || !cardData) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-4 px-24">
        <p className="text-danger font-bold text-center">{error || "Carteirinha indisponível"}</p>
        <p className="text-gray-500 text-center text-sm">Verifique se você completou o cadastro e o upload de documentos.</p>
      </div>
    );
  }

  const { card, canClimb, eligibilityStatus } = cardData;

  const avatarUrl = avatarCume;

  const cardType = canClimb ? "active" : "nao-emitida";

  const rgValue = card.documentLabel === 'RG' ? card.documentMasked : '';
  const cpfValue = card.documentLabel === 'CPF' ? card.documentMasked : '';
  return (
    <div className="h-full bg-white flex flex-col px-24 py-0">
      {/* MiniCard em tamanho large */}
      <div className="flex flex-col gap-48 items-center w-full">
        <MiniCard
          type={cardType} 
          size="large"
          name={card.fullName}
          avatar={avatarUrl}
          birthDate={formatDate(card.birthDate)}
          rg={rgValue}   
          cpf={cpfValue} 
          issueDate={formatDate(card.issueDate)}
          expiryDate={formatDate(card.expirationDate)}
        />
      </div>
    </div>
  );
}

export default MiniCardPage;