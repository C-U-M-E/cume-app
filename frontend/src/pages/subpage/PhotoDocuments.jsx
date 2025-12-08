import React, { useRef, useState } from 'react';
import Button from '../../components/Button';
import emptyStateDocs from '../../assets/images/empty-state-docs.svg';

function PhotoDocuments() {
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  // Função chamada quando o usuário escolhe o arquivo
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    await uploadIdentityDoc(file);
  };

  // Lógica de Upload para o Endpoint de Identidade
  const uploadIdentityDoc = async (file) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('cume_token');
      const formData = new FormData();
      formData.append('file', file); // O backend espera o campo 'file'

      const response = await fetch('/api/users/identity-doc', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          // Content-Type é automático para multipart
        },
        body: formData,
      });

      if (response.ok) {
        alert("Documento de identidade enviado com sucesso!");
      } else {
        const data = await response.json();
        alert(data.error || "Erro ao enviar documento.");
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
        accept="image/*,application/pdf"
        className="hidden" 
        style={{ display: 'none' }}
      />
      
      {/* Scrollable Content Area */}
      <div className="flex-1 flex flex-col gap-32 items-center justify-center max-w-[480px] w-full overflow-y-auto pt-0 pb-32">
        {/* Empty State Illustration */}
        <div className="h-[331px] relative shrink-0 w-[275px]">
          <img 
            src={emptyStateDocs} 
            alt="Imagem vetorial de um documento com fotos"
            className="block max-w-none size-full"
          />
        </div>

        {/* Text Content */}
        <div className="flex flex-col gap-12 items-start text-center w-full">
          <p className="text-body-lg-medium text-brown-900 leading-[1.5] w-full">
            Documentos com fotos são necessários para poder escalar
          </p>
          <p className="text-body-md-regular text-gray-600 leading-[1.5] w-full">
            Experimente enviar seu RG ou CPF
          </p>
        </div>
      </div>

      {/* Fixed Button at Bottom */}
      <div className="w-full max-w-[480px] pb-24 shrink-0">
        <Button
          variant="primary"
          style="amber"
          textButton={loading ? "Enviando..." : "Enviar documento com fotos"}
          showIconLeft={false}
          showIconRight={false}
          onClick={() => fileInputRef.current.click()} // Abre a seleção de arquivo
          className="w-full"
          disabled={loading}
        />
        </div>
    </div>
  );
}

export default PhotoDocuments;
