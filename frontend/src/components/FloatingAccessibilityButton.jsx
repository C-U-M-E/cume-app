import React, { useState } from 'react';
import useMediaQuery from '../hooks/useMediaQuery';
import accessibilityIcon from '../assets/images/acessibility-icon.svg';
import AccessibilityOptionsPanel from './AccessibilityOptionsPanel';

/**
 * Botão flutuante de acessibilidade fixado à direita da tela
 *
 * @param {Object} props
 * @param {Function} props.onClick - Callback ao clicar no botão
 * @param {string} [props.className] - Classes adicionais Tailwind
 */

const FloatingAccessibilityButton = ({ onClick, className = '' }) => {
  const isDesktop = useMediaQuery(1024);
  const [isOpen, setIsOpen] = useState(false);

  const positionClasses = isDesktop
    ? 'top-1/2 -translate-y-1/2 right-16'
    : 'bottom-80 right-4';

  const handleButtonClick = () => {
    setIsOpen((prev) => !prev);
    onClick?.();
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <AccessibilityOptionsPanel
          isDesktop={isDesktop}
          onClose={handleClose}
        />
      )}
      <button
        type="button"
        aria-label="Ativar opções de acessibilidade"
        onClick={handleButtonClick}
        className={`fixed z-50 flex items-center justify-center rounded-8 shadow-[0_12px_24px_rgba(0,0,0,0.15)] bg-blue-700 text-white size-40 hover:bg-blue-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 transition-colors ${positionClasses} ${className}`}
      >
        <span className="sr-only">Acessibilidade</span>
        <img src={accessibilityIcon} alt="" aria-hidden="true" className="h-40 w-40" />
      </button>
    </>
  );
};

export default FloatingAccessibilityButton;