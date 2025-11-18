import React, { useEffect, useState } from 'react';
import useMediaQuery from '../hooks/useMediaQuery';
import accessibilityIcon from '../assets/images/acessibility-icon.svg';
import AccessibilityOptionsPanel from './AccessibilityOptionsPanel';
import { LEVEL_ITEMS, TOGGLE_ITEMS } from '../constants/accessibility';
import { disableVlibras, enableVlibras } from '../utils/vlibras';
import { disableSiteReader, enableSiteReader } from '../utils/siteReader';
import { applyFontScale, resetFontScale } from '../utils/fontScaler';
import { applyTypeface, resetTypeface } from '../utils/typefaceManager';
import { applyContrast, resetContrast } from '../utils/contrastManager';

const buildInitialToggleState = () =>
  TOGGLE_ITEMS.reduce(
    (acc, item) => ({
      ...acc,
      [item.key]: false,
    }),
    {}
  );

const buildInitialLevelState = () =>
  LEVEL_ITEMS.reduce(
    (acc, item) => ({
      ...acc,
      [item.key]: 0,
    }),
    {}
  );

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
  const [toggleStates, setToggleStates] = useState(buildInitialToggleState);
  const [levelStates, setLevelStates] = useState(buildInitialLevelState);

  const positionClasses = isDesktop
    ? 'top-[53%] right-[10px]'
    : 'top-[53%] right-[10px]';

  const handleButtonClick = () => {
    setIsOpen((prev) => !prev);
    onClick?.();
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleToggleChange = (key, value) => {
    setToggleStates((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleLevelChange = (key, value) => {
    setLevelStates((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    if (toggleStates.vlibras) {
      enableVlibras();
    } else {
      disableVlibras();
    }
  }, [toggleStates.vlibras]);

  useEffect(() => {
    if (toggleStates.reader) {
      enableSiteReader();
    } else {
      disableSiteReader();
    }
  }, [toggleStates.reader]);

  useEffect(() => {
    applyFontScale(levelStates.font ?? 0);
  }, [levelStates.font]);

  useEffect(() => {
    applyTypeface(levelStates.typeface ?? 0);
  }, [levelStates.typeface]);

  useEffect(() => {
    applyContrast(levelStates.contrast ?? 0);
  }, [levelStates.contrast]);

  useEffect(
    () => () => {
      disableVlibras();
      disableSiteReader();
      resetFontScale();
      resetTypeface();
      resetContrast();
    },
    []
  );

  return (
    <>
      {isOpen && (
        <AccessibilityOptionsPanel
          isDesktop={isDesktop}
          onClose={handleClose}
          toggleStates={toggleStates}
          onToggleChange={handleToggleChange}
          levelStates={levelStates}
          onLevelChange={handleLevelChange}
        />
      )}
      <button
        type="button"
        aria-label="Ativar opções de acessibilidade"
        onClick={handleButtonClick}
        className={`fixed z-50 flex items-center justify-center rounded-8 shadow-[0_12px_24px_rgba(0,0,0,0.15)] bg-blue-700 text-white size-40 hover:bg-blue-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 transition-colors ${positionClasses} ${className}`}
      >
        <span className="sr-only">Acessibilidade</span>
        <img src={accessibilityIcon} alt="Ícone do botão de acessibilidade" aria-hidden="true" className="h-40 w-40" />
      </button>
    </>
  );
};

export default FloatingAccessibilityButton;