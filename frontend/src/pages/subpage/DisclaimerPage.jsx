import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import emptyStateTerms from '../../assets/images/empty-state-terms.svg';

function DisclaimerPage() {
const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  // Função chamada quando o usuário escolhe o arquivo
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    await signTerm(file);
  };

  // Lógica de Upload para Assinar o Termo
  const signTerm = async (file) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('cume_token');
      const formData = new FormData();
      formData.append('file', file);

      // <--- DIFERENÇA 3: Endpoint de assinar termo
      const response = await fetch('/api/documents/sign-term', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert("Termo assinado com sucesso! Sua carteirinha foi ativada.");
        // <--- DIFERENÇA 4: Redireciona para ver a carteirinha verde
        navigate('/documents/minicardpage');
      } else {
        alert(data.error || "Erro ao assinar termo.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro de conexão.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full bg-white flex flex-col items-center px-24">
      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="application/pdf,image/*" // Aceita PDF também
        className="hidden" 
        style={{ display: 'none' }}
      />
      {/* Scrollable Content Area */}
      <div className="flex-1 flex flex-col gap-32 items-center justify-center max-w-[480px] w-full overflow-y-auto pt-0 pb-32">
        {/* Empty State Illustration */}
        <div className="h-[331px] relative shrink-0 w-[275px]">
          <img 
            src={emptyStateTerms} 
            alt="Imagem vetorial de um termo de responsabilidade"
            className="block max-w-none size-full"
          />
        </div>

        {/* Text Content */}
        <div className="flex flex-col gap-12 items-start text-center w-full">
          <p className="text-body-lg-medium text-brown-900 leading-[1.5] w-full">
            Documento para poder emitir a carteirinha e escalar
          </p>
          <p className="text-body-md-regular text-gray-600 leading-[1.5] w-full">
            Este documento é válido por 6 meses
          </p>
        </div>
      </div>

      {/* Fixed Button at Bottom */}
      <div className="w-full max-w-[480px] pb-24 shrink-0">
        <Button
          variant="primary"
          style="amber"
          textButton={loading ? "Enviando..." : "Assinar termo"}
          showIconLeft={false}
          showIconRight={false}
          onClick={() => fileInputRef.current.click()}
          className="w-full"
          disabled={loading}
        />
      </div>
    </div>
  );
}

export default DisclaimerPage;
