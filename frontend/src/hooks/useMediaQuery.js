import { useState, useEffect } from 'react';

/**
 * Hook para detectar tamanho de tela
 * @param {number} breakpoint - Breakpoint em pixels (padrão: 1024)
 * @returns {boolean} - true se for desktop (>= breakpoint), false se for mobile
 */
function useMediaQuery(breakpoint = 1024) {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= breakpoint);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= breakpoint);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isDesktop;
}

export default useMediaQuery;

