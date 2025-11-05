import React from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonOptions from '../components/ButtonOptions';
import docsVector from '../assets/images/docs-vector.svg';

function Documents() {
  const navigate = useNavigate();

  return (
    <div className="h-full bg-white flex flex-col gap-40 px-24 py-0 overflow-x-hidden">
      {/* Content */}
      <div className="flex flex-col gap-48 items-start w-full">
        {/* Seção Superior: Sua Carteirinha */}
        <div className="flex flex-col gap-32 items-start w-full">
          {/* Top: Título + Imagem */}
          <div className="flex gap-8 items-center px-8 py-0 w-full">
            {/* Texto */}
            <div className="flex flex-col gap-8 grow items-start">
              <h2 className="text-title-h2 text-brown-900 leading-[1.4]">
                Sua carteirinha!
              </h2>
              <p className="text-body-md-regular text-gray-600 leading-[1.5]">
                Está tudo certo, você pode escalar!
              </p>
            </div>
            
            {/* Imagem Vetorial */}
            <div className="h-[127px] relative shrink-0 w-[130px]">
              <img 
                src={docsVector} 
                alt="Carteirinha" 
                className="block max-w-none size-full"
              />
            </div>
          </div>

          {/* Options: Lista de documentos */}
          <div className="flex flex-col gap-16 items-start w-full">
            {/* Carteirinha */}
            <ButtonOptions
              title="Carteirinha"
              description="Emitida"
              iconType="specific-icon"
              specificIcon="carteira"
              onClick={() => navigate('/documents/minicardpage')}
            />

            {/* Termo de responsabilidade */}
            <ButtonOptions
              title="Termo de responsabilidade"
              description="Assinado"
              iconType="icon"
              icon="fas fa-file"
              iconColor="text-brown-900"
              onClick={() => navigate('/documents/disclaimer')}
            />

            {/* Documento com fotos */}
            <ButtonOptions
              title="Documento com fotos"
              description="Enviado"
              iconType="icon"
              icon="fas fa-images"
              iconColor="text-brown-900"
              onClick={() => navigate('/documents/photo-documents')}
            />
          </div>
        </div>

        {/* Seção Inferior: Quero me tornar membro */}
        <div className="flex flex-col gap-24 items-start w-full pb-40">
          {/* Título */}
          <div className="flex gap-16 items-center px-8 py-0 w-full">
            <div className="flex flex-col gap-8 grow items-start">
              <p className="text-body-lg-medium text-brown-900 leading-[1.5]">
                Quero me tornar membro
              </p>
            </div>
          </div>

          {/* Options: Formulário de associado */}
          <div className="flex flex-col gap-16 items-start w-full">
            <ButtonOptions
              title="Formulário de associado"
              description="Não assinado"
              iconType="icon"
              icon="fas fa-file"
              iconColor="text-brown-900"
              onClick={() => navigate('/documents/member-forms')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Documents;
