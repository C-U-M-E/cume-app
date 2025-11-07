import React from 'react';

/**
 * Componente Comment - Exibe um comentário com avatar, nome, data/hora e texto
 * 
 * @param {Object} props
 * @param {string} props.text - Texto do comentário
 * @param {string} props.name - Nome do usuário
 * @param {string} props.data - Data do comentário (formato: DD/MM/YYYY)
 * @param {string} props.hour - Hora do comentário (formato: HH:MM)
 * @param {string} props.avatar - URL da imagem do avatar
 * @param {string} props.className - Classes adicionais do Tailwind
 */
const Comment = ({
  text = "text",
  name = "name",
  data = "data",
  hour = "hour",
  avatar,
  className = ''
}) => {
  return (
    <div className={`bg-white border border-brown-50 rounded-12 p-24 flex flex-col gap-24 items-start w-full ${className}`}>
      {/* Header: Avatar + Nome + Data/Hora */}
      <div className="flex gap-12 items-center w-full">
        {/* Avatar */}
        <div className="relative shrink-0 size-48 rounded-full overflow-hidden">
          {avatar ? (
            <img 
              alt={name} 
              className="block w-full h-full object-cover" 
              src={avatar}
            />
          ) : (
            <div className="w-full h-full bg-amber-300 rounded-full flex items-center justify-center">
              <i className="fas fa-user text-brown-900 text-[24px]" />
            </div>
          )}
        </div>
        
        {/* Nome e Data/Hora */}
        <div className="flex flex-col gap-4 grow items-start min-w-0">
          {/* Nome */}
          <p className="text-body-md-medium text-brown-900 leading-[1.5] w-full">
            {name}
          </p>
          
          {/* Data e Hora */}
          <div className="flex gap-8 items-center w-full">
            <p className="text-body-md-regular text-gray-700 leading-[1.5] whitespace-nowrap">
              {data}
            </p>
            <div className="bg-gray-700 rounded-full size-4 shrink-0" />
            <p className="text-body-md-regular text-gray-700 leading-[1.5] whitespace-nowrap">
              {hour}
            </p>
          </div>
        </div>
      </div>
      
      {/* Texto do comentário */}
      <p className="text-body-lg-regular text-brown-900 leading-[1.5] w-full">
        {text}
      </p>
    </div>
  );
};

export default Comment;

