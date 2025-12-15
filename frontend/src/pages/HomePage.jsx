import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import MiniCard from '../components/MiniCard';
import Comment from '../components/Comment';
import Wave from '../components/Wave';
import defaultAvatar from '../assets/images/foto_perfil_cume.png';

function HomePage() {
  const navigate = useNavigate();
  const [cardData, setCardData] = useState(null);

  // Função para formatar data (ISO -> DD/MM/AAAA)
  const formatDate = (isoString) => {
    if (!isoString) return '--/--/----';
    return new Date(isoString).toLocaleDateString('pt-BR');
  };

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const token = localStorage.getItem('cume_token');
        if (!token) return;

        const response = await fetch('/api/membership-card', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setCardData(data);
        }
      } catch (error) {
        console.error("Erro ao carregar dados da Home:", error);
      }
    };

    fetchCard();
  }, []);

  // Prepara os dados para o render
  // Se ainda não carregou (cardData é null), usamos valores vazios para não quebrar a tela
  const card = cardData?.card || {};
  const canClimb = cardData?.canClimb || false;

  // Lógica de visualização
  const cardType = canClimb ? "active" : "nao-emitida";
  
  const avatarUrl = card.photoUrl 
    ? `http://localhost:3000/uploads/${card.photoUrl}` 
    : defaultAvatar; // Deixa vazio para mostrar o ícone padrão se não tiver foto

  // Lógica para RG e CPF mascarados
  const rgValue = card.documentLabel === 'RG' ? card.documentMasked : '';
  const cpfValue = card.documentLabel === 'CPF' ? card.documentMasked : '';
  return (
    <div className="h-full bg-amber-50 flex flex-col">
      {/* Content Section */}
      <div className="flex flex-col grow items-center w-full z-[1]">
        {/* Top Section: MiniCard + Buttons */}
        <div className="bg-white flex flex-col items-center justify-center w-full z-[3]">
          <div className="bg-white flex flex-col gap-32 items-center justify-center max-w-[800px] px-24 pb-32 w-full">
            {/* MiniCard */}
            <MiniCard
              type={cardType}
              size="small"
              name={card.fullName || "Carregando..."}
              avatar={avatarUrl}
              birthDate={formatDate(card.birthDate)}
              rg={rgValue}
              cpf={cpfValue}
              issueDate={formatDate(card.issueDate)}
              expiryDate={formatDate(card.expirationDate)}
              onButtonClick={() => navigate('/documents/minicardpage')}
            />

            {/* Bottom Buttons */}
            <div className="flex gap-16 items-start w-full">
              {/* Button Escalar */}
              <Button
                textButton="Escalar"
                variant="secondary"
                showIconLeft={true}
                showIconRight={false}
                iconType="specific-icon"
                specificIcon="escalar"
                onClick={() => navigate('/climb')}
                className="grow"
              />

              {/* Button Documentos */}
              <Button
                textButton="Documentos"
                variant="secondary"
                showIconLeft={true}
                showIconRight={false}
                iconType="specific-icon"
                specificIcon="carteira"
                onClick={() => navigate('/documents')}
                className="grow"
              />
            </div>
          </div>
        </div>

        {/* Wave Decorativo */}
        <Wave />

        {/* Bottom Section: Últimos avisos */}
        <div className="bg-amber-50 flex flex-col gap-32 items-start pb-80 pt-16 px-32 w-full z-[1]">
          {/* Título */}
          <p className="text-body-lg-medium text-brown-900 whitespace-nowrap">
            Últimos avisos
          </p>

          {/* Comentários */}
          <div className="flex flex-col gap-24 items-start w-full">
            <Comment
              text="Quem precisa de carona para a UFSCAR no horário da aula, me chama no WhatsApp!"
              name="Ana Paula"
              data="19/09/2025"
              hour="15:06"
              avatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
            />

            <Comment
              text="Gente, hoje não vamos ter aula por conta da chuva. Passamos nossa aula para semana que vem. Abraços!"
              name="Eduardo da Silva"
              data="10/07/2025"
              hour="12:34"
              avatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
            />

            <Comment
              text="Amanhã vamos focar em técnicas de segurança. Aguardem as aulas!"
              name="Lucas Moreira"
              data="14/05/2025"
              hour="13:06"
              avatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
            />

            <Comment
              text="Quem precisa de carona para a UFSCAR no horário da aula, me chama no WhatsApp!"
              name="Ana Paula"
              data="19/09/2025"
              hour="15:06"
              avatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
            />

            <Comment
              text="Gente, hoje não vamos ter aula por conta da chuva. Passamos nossa aula para semana que vem. Abraços!"
              name="Eduardo da Silva"
              data="10/07/2025"
              hour="12:34"
              avatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
            />

            <Comment
              text="Amanhã vamos focar em técnicas de segurança. Aguardem as aulas!"
              name="Lucas Moreira"
              data="14/05/2025"
              hour="13:06"
              avatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
            />
          </div>
        </div>
      </div>

    </div>
  )
}

export default HomePage

