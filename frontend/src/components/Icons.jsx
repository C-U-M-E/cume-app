import React from 'react';
import homeIcon from '../assets/icons/home.svg';
import carteiraIcon from '../assets/icons/carteira.svg';
import carteirinhaBlackIcon from '../assets/icons/carteirinha-black.svg';
import carteirinhaWhiteIcon from '../assets/icons/carteirinha-white.svg';
import escalarIcon from '../assets/icons/escalar.svg';

/**
 * Componente Icons - Renderiza ícones, ícones FontAwesome ou imagens
 * 
 * @param {Object} props
 * @param {string} props.type - Tipo de ícone: "specific-icon" | "icon" | "img"
 * @param {string} props.specificIcon - Nome do ícone SVG quando type="specific-icon" (home, carteira, carteirinha-black, carteirinha-white, escalar)
 * @param {string} props.icon - Classe do FontAwesome quando type="icon" (ex: "fas fa-home")
 * @param {string} props.img - URL ou caminho da imagem quando type="img"
 * @param {string} props.className - Classes adicionais do Tailwind
 * @param {string} props.size - Tamanho do container do ícone (opcional, padrão: 40px para icon/specific-icon, 48px para img)
 * @param {string} props.iconSize - Tamanho do ícone FontAwesome quando type="icon" (opcional, padrão: 22px)
 * @param {string} props.iconColor - Cor do ícone FontAwesome quando type="icon" (opcional, pode usar classes Tailwind como "text-amber-500", "text-brown-700", etc.)
 */
const Icons = ({ 
  type = 'icon',
  specificIcon = 'carteira',
  icon = 'fas fa-home',
  img,
  className = '',
  size,
  iconSize,
  iconColor
}) => {
  // Mapeamento dos ícones SVG disponíveis
  const iconMap = {
    home: homeIcon,
    carteira: carteiraIcon,
    'carteirinha-black': carteirinhaBlackIcon,
    'carteirinha-white': carteirinhaWhiteIcon,
    escalar: escalarIcon,
  };

  // Tamanhos padrão conforme design do Figma
  const defaultSize = type === 'img' ? '48px' : '40px';
  const containerSize = size || defaultSize;
  // Para FontAwesome: 22px (ou customizado), para SVG: auto (se adapta ao container), para img: 48px
  const iconInnerSize = iconSize || (type === 'icon' ? '22px' : type === 'img' ? '48px' : 'auto');
  // Cor padrão para FontAwesome: gray-700, mas pode ser customizada
  const iconColorClass = iconColor || 'text-gray-700';

  // Renderização para tipo "specific-icon" (SVG local)
  if (type === 'specific-icon') {
    const iconSrc = iconMap[specificIcon] || iconMap.carteira;
    
    return (
      <div 
        className={`flex items-center justify-center p-[6px] rounded-full ${className}`}
        style={{ width: containerSize, height: containerSize }}
      >
        <img 
          src={iconSrc} 
          alt={specificIcon}
          className="block max-w-full max-h-full"
          style={{ width: iconInnerSize === 'auto' ? '100%' : iconInnerSize, height: 'auto' }}
        />
      </div>
    );
  }

  // Renderização para tipo "icon" (FontAwesome)
  if (type === 'icon') {
    return (
      <div 
        className={`flex items-center justify-center p-[10px] rounded-full ${className}`}
        style={{ width: containerSize, height: containerSize }}
      >
        <i 
          className={`${icon} ${iconColorClass}`}
          style={{ fontSize: iconInnerSize }}
        />
      </div>
    );
  }

  // Renderização para tipo "img"
  if (type === 'img') {
    if (!img) {
      console.warn('Icons: prop "img" é obrigatória quando type="img"');
      return null;
    }

    return (
      <div 
        className={`rounded-12 overflow-hidden ${className}`}
        style={{ width: containerSize, height: containerSize }}
      >
        <img 
          src={img} 
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return null;
};

export default Icons;

