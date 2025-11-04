import React from 'react';
import Icons from './Icons';

/**
 * Componente ButtonOptions - Botão de opções com ícone, título e descrição
 * 
 * @param {Object} props
 * @param {string} props.title - Título do botão
 * @param {string} props.description - Descrição do botão (opcional)
 * @param {boolean} props.showDescription - Se deve mostrar a descrição (padrão: true)
 * @param {"hover" | "default"} props.state - Estado do botão (padrão: "default")
 * @param {string} props.img - URL da imagem para o ícone (usado no componente Icons quando type="img")
 * @param {string} props.iconType - Tipo de ícone: "img" | "specific-icon" | "icon" (padrão: "img" se img fornecida)
 * @param {string} props.specificIcon - Nome do ícone SVG quando iconType="specific-icon" (home, carteira, carteirinha-black, carteirinha-white, escalar)
 * @param {string} props.icon - Classe do FontAwesome quando iconType="icon" (ex: "fas fa-home")
 * @param {string} props.iconColor - Cor do ícone FontAwesome quando iconType="icon" (ex: "text-amber-500", "text-brown-700")
 * @param {string} props.iconSize - Tamanho do ícone FontAwesome quando iconType="icon" (ex: "24px", "16px")
 * @param {string} props.className - Classes adicionais do Tailwind
 * @param {Function} props.onClick - Função de callback ao clicar
 */
const ButtonOptions = ({ 
  title = "Title",
  description = "description - date",
  showDescription = true,
  state = "default",
  img,
  iconType,
  specificIcon,
  icon,
  iconColor,
  iconSize,
  className = '',
  onClick
}) => {
  // Cores de fundo baseadas no estado
  const bgColor = state === 'hover' ? 'bg-amber-100' : 'bg-amber-50';

  // Determina o tipo de ícone automaticamente se não fornecido
  const finalIconType = iconType || (img ? 'img' : null);

  // Gap dinâmico: gap-16 para img, gap-12 para outros tipos
  const gapClass = finalIconType === 'img' ? 'gap-16' : 'gap-12';

  return (
    <button
      onClick={onClick}
      className={`${bgColor} hover:bg-amber-100 flex items-center ${gapClass} px-16 py-12 rounded-16 w-full transition-colors ${className}`}
    >
      {/* Ícone usando o componente Icons */}
      {finalIconType && (
        <Icons 
          type={finalIconType}
          img={img}
          specificIcon={specificIcon}
          icon={icon}
          iconColor={iconColor}
          iconSize={iconSize}
          className="shrink-0"
        />
      )}

      {/* Conteúdo: título e descrição */}
      <div className="flex flex-col gap-4 grow items-start min-w-0 text-left">
        <p className="text-body-lg-medium text-brown-900 w-full text-left">
          {title}
        </p>
        {showDescription && description && (
          <p className="text-body-md-regular text-gray-700 w-full text-left">
            {description}
          </p>
        )}
      </div>

      {/* Ícone de chevron */}
      <i className="fas fa-chevron-right text-gray-900 shrink-0 text-[16px]" />
    </button>
  );
};

export default ButtonOptions;

