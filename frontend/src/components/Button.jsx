import React from 'react';
import Icons from './Icons';

/**
 * Componente Button - Botão com variantes primary e secondary
 * 
 * @param {Object} props
 * @param {string} props.textButton - Texto do botão
 * @param {boolean} props.showIconRight - Mostra ícone de seta à direita (padrão: true para primary, false para secondary)
 * @param {boolean} props.showIconLeft - Mostra ícone à esquerda usando Icons (padrão: true)
 * @param {"default" | "hover"} props.state - Estado do botão (padrão: "default")
 * @param {"primary" | "secondary"} props.variant - Variante do botão: primary ou secondary (padrão: "primary")
 * @param {"amber" | "brown"} props.style - Estilo do botão: amber ou brown (padrão: "brown", apenas para primary)
 * @param {string} props.iconType - Tipo de ícone para Icons quando showIconLeft=true: "img" | "specific-icon" | "icon"
 * @param {string} props.specificIcon - Nome do ícone SVG quando iconType="specific-icon"
 * @param {string} props.icon - Classe do FontAwesome quando iconType="icon"
 * @param {string} props.img - URL da imagem quando iconType="img"
 * @param {string} props.iconColor - Cor do ícone FontAwesome quando iconType="icon"
 * @param {string} props.iconSize - Tamanho do ícone FontAwesome quando iconType="icon"
 * @param {string} props.className - Classes adicionais do Tailwind
 * @param {Function} props.onClick - Função de callback ao clicar
 */
const Button = ({ 
  textButton = "Text",
  showIconRight,
  showIconLeft = true,
  state = "default",
  variant = "primary",
  style = "brown",
  iconType = "specific-icon",
  specificIcon = "carteira",
  icon,
  img,
  iconColor,
  iconSize,
  className = '',
  onClick
}) => {
  // Determina showIconRight padrão baseado na variante
  const defaultShowIconRight = showIconRight !== undefined ? showIconRight : (variant === 'primary');

  // PRIMARY VARIANT
  if (variant === 'primary') {
    // Cores baseadas no estilo e estado
    const getBgColor = () => {
      if (style === 'amber') {
        return state === 'hover' ? 'bg-amber-700' : 'bg-amber-600';
      } else {
        return state === 'hover' ? 'bg-brown-900' : 'bg-brown-800';
      }
    };

    // Cor do texto baseada no estilo
    const textColor = style === 'amber' ? 'text-brown-900' : 'text-white';

    // Cor do ícone de seta baseada no estilo
    const arrowColor = style === 'amber' ? 'text-brown-900' : 'text-white';

    // Cor padrão do ícone FontAwesome baseada no estilo (se não fornecida)
    const defaultIconColor = iconColor || (style === 'amber' ? 'text-brown-900' : 'text-white');

    const bgColor = getBgColor();
    const hoverColor = style === 'amber' ? 'hover:bg-amber-800' : 'hover:bg-brown-900';

    return (
      <button
        onClick={onClick}
        className={`${bgColor} ${hoverColor} flex items-center justify-center gap-12 h-[64px] px-24 py-0 rounded-16 shadow-[0px_0px_10px_0px_rgba(255,255,255,0.2)] transition-colors ${className}`}
      >
        {/* Ícone à esquerda usando componente Icons */}
        {showIconLeft && (
          <Icons
            type={iconType}
            specificIcon={specificIcon}
            icon={icon}
            img={img}
            iconColor={defaultIconColor}
            iconSize={iconSize}
            className="shrink-0"
          />
        )}

        {/* Texto do botão */}
        <p className={`text-body-lg-medium ${textColor} whitespace-nowrap shrink-0`}>
          {textButton}
        </p>

        {/* Ícone de seta à direita */}
        {defaultShowIconRight && (
          <i className={`fas fa-chevron-right ${arrowColor} shrink-0 text-[16px]`} />
        )}
      </button>
    );
  }

  // SECONDARY VARIANT
  // Cores: amber-50 (default) / amber-100 (hover)
  const bgColor = state === 'hover' ? 'bg-amber-100' : 'bg-amber-50';
  const hoverColor = 'hover:bg-amber-100';
  const textColor = 'text-brown-900';
  
  // Padding left: pl-12 quando não tem ícone, pl-0 quando tem ícone
  const leftPadding = showIconLeft ? 'pl-0' : 'pl-12';

  return (
    <button
      onClick={onClick}
      className={`${bgColor} ${hoverColor} flex items-center justify-center gap-4 h-[64px] ${leftPadding} pr-12 py-0 rounded-16 transition-colors ${className}`}
    >
      {/* Ícone à esquerda usando componente Icons */}
      {showIconLeft && (
        <Icons
          type={iconType}
          specificIcon={specificIcon}
          icon={icon}
          img={img}
          iconColor={iconColor || 'text-brown-900'}
          iconSize={iconSize}
          className="shrink-0"
        />
      )}

      {/* Texto do botão */}
      <p className={`text-body-lg-medium ${textColor} whitespace-nowrap shrink-0`}>
        {textButton}
      </p>
    </button>
  );
};

export default Button;

