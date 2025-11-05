import React from 'react';

/**
 * Componente Wave - Onda decorativa para separação visual entre seções
 * 
 * @param {string} props.className - Classes adicionais do Tailwind
 */
const Wave = ({ className = '' }) => {
  return (
    <div className={`flex flex-col gap-10 items-start overflow-hidden pb-24 pt-0 px-0 shrink-0 top-0 w-full z-[2] ${className}`}>
      <div className="h-[17.5px] relative shrink-0 w-full">
        <svg 
          width="100%" 
          height="18" 
          viewBox="0 0 402 18" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          {/* Fundo branco */}
          <path 
            d="M0 0L402 0V18H0V0Z" 
            fill="#FFFDF5"
          />
          {/* Onda superior */}
          <path 
            d="M0 0C0 0 86.5 7.5 201 7.5C315.5 7.5 402 0 402 0V18H0V0Z" 
            fill="#FFF6D9"
          />
        </svg>
      </div>
    </div>
  );
};

export default Wave;

