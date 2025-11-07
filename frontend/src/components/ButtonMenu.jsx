import React from 'react';
import Icons from './Icons';

/**
 * Componente ButtonMenu - Botão de menu com estados default, hover e active
 * 
 * @param {Object} props
 * @param {string} props.buttonText - Texto do botão
 * @param {"default" | "hover" | "active"} props.state - Estado do botão (padrão: "default")
 * @param {string} props.iconType - Tipo de ícone para Icons: "img" | "specific-icon" | "icon"
 * @param {string} props.specificIcon - Nome do ícone SVG quando iconType="specific-icon"
 * @param {string} props.icon - Classe do FontAwesome quando iconType="icon"
 * @param {string} props.img - URL da imagem quando iconType="img"
 * @param {string} props.iconColor - Cor do ícone FontAwesome quando iconType="icon"
 * @param {string} props.iconSize - Tamanho do ícone FontAwesome quando iconType="icon"
 * @param {string} props.className - Classes adicionais do Tailwind
 * @param {Function} props.onClick - Função de callback ao clicar
 */
const ButtonMenu = ({ 
  buttonText = "Text",
  state = "default",
  iconType = "specific-icon",
  specificIcon = "carteira",
  icon,
  img,
  iconColor,
  iconSize,
  className = '',
  onClick
}) => {
  // Cores de fundo baseadas no estado
  const getBgColor = () => {
    if (state === 'active') {
      return 'bg-amber-100';
    } else if (state === 'hover') {
      return 'bg-amber-50';
    }
    return ''; // default: sem background
  };

  // Cor do texto
  const textColor = 'text-brown-900';

  // Cor padrão do ícone
  const defaultIconColor = iconColor || 'text-brown-900';

  const bgColor = getBgColor();
  const hoverColor = state === 'default' ? 'hover:bg-amber-50' : '';

  return (
    <button
      onClick={onClick}
      className={`${bgColor} ${hoverColor} flex items-center justify-center gap-8 h-[64px] pl-8 pr-24 py-0 rounded-16 transition-colors ${className}`}
    >
      {/* Ícone à esquerda usando componente Icons */}
      <Icons
        type={iconType}
        specificIcon={specificIcon}
        icon={icon}
        img={img}
        iconColor={defaultIconColor}
        iconSize={iconSize}
        className="shrink-0"
      />

      {/* Texto do botão */}
      <p className={`text-body-lg-medium ${textColor} grow text-left`}>
        {buttonText}
      </p>
    </button>
  );
};

export default ButtonMenu;

