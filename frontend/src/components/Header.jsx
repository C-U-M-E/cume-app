import React from 'react';
import { useLocation } from 'react-router-dom';
import useMediaQuery from '../hooks/useMediaQuery';

/**
 * Componente Header - Cabeçalho da aplicação com diferentes estados
 * 
 * @param {Object} props
 * @param {"forHomepage" | "forPages" | "forPages2"} props.style - Estilo do header (padrão: "forHomepage")
 * @param {string} props.pageTitle - Título da página (usado em forPages e forPages2)
 * @param {Function} props.onHamburgerClick - Callback ao clicar no botão hambúrguer
 * @param {Function} props.onBackClick - Callback ao clicar no botão de voltar (forPages2)
 * @param {Function} props.onAccessibilityClick - Callback ao clicar no botão de acessibilidade
 * @param {string} props.className - Classes adicionais do Tailwind
 */
const Header = ({
  style,
  pageTitle,
  onHamburgerClick,
  onBackClick,
  onAccessibilityClick,
  className = ''
}) => {
  const location = useLocation();
  const isDesktop = useMediaQuery(1024);
  
  // Determina o estilo automaticamente se não fornecido
  const headerStyle = style || (location.pathname === '/' ? 'forHomepage' : 'forPages');

  // Botão Hambúrguer
  const ButtonHamburger = () => (
    <button
      onClick={onHamburgerClick}
      className="bg-brown-50 flex items-center justify-center rounded-16 shrink-0 size-56 hover:bg-brown-100 transition-colors"
    >
      <i className="fas fa-bars text-brown-900 text-[20px]" />
    </button>
  );

  // Botão de Acessibilidade
  const ButtonAccessibility = () => (
    <button
      onClick={onAccessibilityClick}
      className="bg-brown-50 flex items-center justify-center rounded-16 shrink-0 size-56 hover:bg-brown-100 transition-colors"
    >
      <i className="fas fa-universal-access text-brown-900 text-[24px]" />
    </button>
  );

  // Botão Chevron Close (para voltar)
  const ButtonChevronClose = () => (
    <button
      onClick={onBackClick}
      className="bg-transparent flex items-center justify-center rounded-8 shrink-0 size-40 hover:bg-amber-50 transition-colors"
    >
      <i className="fas fa-chevron-left text-brown-900 text-[16px]" />
    </button>
  );

  // forPages2 - Subpágina com botão de voltar
  if (headerStyle === 'forPages2') {
    return (
      <div className={`bg-white flex gap-8 items-center justify-end pt-48 pb-40 px-32 w-full ${className}`}>
        <ButtonChevronClose />
        <div className="flex flex-col grow justify-center min-w-0">
          <p className="text-title-h3 text-brown-900 leading-[1.4]">
            {pageTitle || 'Termo de responsabilidade'}
          </p>
        </div>
      </div>
    );
  }

  // forPages - Página com título
  if (headerStyle === 'forPages') {
    return (
      <div className={`bg-white flex gap-10 items-center justify-end pt-48 pb-40 px-32 w-full ${className}`}>
        <div className="flex flex-col grow justify-center min-w-0">
          <p className={`${isDesktop ? 'text-title-h1' : 'text-title-h3'} text-brown-900 leading-[1.4]`}>
            {pageTitle || 'Página'}
          </p>
        </div>
        {!isDesktop && (
          <div className="flex gap-12 items-center shrink-0">
            <ButtonAccessibility />
            <ButtonHamburger />
          </div>
        )}
      </div>
    );
  }

  // forHomepage - Página inicial (padronizado como forPages)
  return (
    <div className={`bg-white flex gap-10 items-center justify-end pt-48 px-32 w-full ${className}`}>
      <div className="flex flex-col grow justify-center min-w-0">
        <p className={`${isDesktop ? 'text-title-h1' : 'text-title-h3'} text-brown-900 leading-[1.4]`}>
          Página inicial
        </p>
      </div>
      {!isDesktop && (
        <div className="flex gap-12 items-center shrink-0">
          <ButtonAccessibility />
          <ButtonHamburger />
        </div>
      )}
    </div>
  );
};

export default Header;

