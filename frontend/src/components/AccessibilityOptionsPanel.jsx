import React, { useEffect, useRef } from 'react';
import { LEVEL_ITEMS, TOGGLE_ITEMS } from '../constants/accessibility';

const ToggleOptionButton = ({ label, icon, active, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex w-full items-center justify-between rounded-12 px-16 py-12 text-body-md-medium transition-colors ${
      active ? 'bg-blue-800 text-white' : 'bg-blue-700 text-white hover:bg-blue-800'
    }`}
  >
    <span className="flex items-center gap-12">
      <i className={`fas ${icon} text-[18px]`} aria-hidden="true" />
      {label}
    </span>
    <span
      className={`relative inline-flex h-[24px] w-[44px] items-center rounded-full transition-colors ${
        active ? 'bg-amber-500' : 'bg-gray-600/40'
      }`}
    >
      <span
        className={`absolute left-[2px] size-[20px] rounded-full bg-white shadow-[0_2px_4px_rgba(0,0,0,0.15)] transition-transform ${
          active ? 'translate-x-[20px]' : 'translate-x-0'
        }`}
      />
    </span>
  </button>
);

const LevelOptionButton = ({ label, icon, level, maxLevel, description, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="flex w-full flex-col gap-12 rounded-12 bg-blue-700 px-16 py-12 text-left text-white transition-colors hover:bg-blue-800"
  >
    <div className="flex items-center gap-12">
      <i className={`fas ${icon} text-[18px]`} aria-hidden="true" />
      <span className="text-body-md-medium">{label}</span>
    </div>
    <div className="flex items-center gap-8">
      {Array.from({ length: maxLevel }).map((_, index) => (
        <span
          key={index}
          className={`h-8 flex-1 rounded-full transition-colors ${
            index <= level ? 'bg-white' : 'bg-blue-500'
          }`}
        />
      ))}
    </div>
    <span className="text-body-sm-regular text-white/80">
      Nível {level + 1}: {description}
    </span>
  </button>
);

const AccessibilityOptionsPanel = ({
  isDesktop = true,
  onClose,
  toggleStates,
  onToggleChange,
  levelStates,
  onLevelChange,
}) => {
  const panelRef = useRef(null);

  const positionClasses = isDesktop
    ? 'right-56 top-1/2 -translate-y-1/2'
    : 'right-56 top-1/2 -translate-y-1/2';

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        onClose?.();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleToggle = (key) => {
    const nextValue = !toggleStates?.[key];
    onToggleChange?.(key, nextValue);
  };

  const handleLevelChange = (key) => {
    const item = LEVEL_ITEMS.find((config) => config.key === key);
    const maxLevel = item ? item.descriptions.length : 1;

    const currentLevel = levelStates?.[key] ?? 0;
    const nextLevel = currentLevel + 1 >= maxLevel ? 0 : currentLevel + 1;
    onLevelChange?.(key, nextLevel);
  };

  return (
    <div
      ref={panelRef}
      className={`fixed z-50 flex w-[300px] flex-col gap-24 rounded-16 bg-white p-16 shadow-[0_20px_40px_rgba(0,0,0,0.15)] ${positionClasses}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-title-h3 text-brown-900">Acessibilidade</h2>
          <p className="text-body-md-regular text-brown-700">Personalize sua experiência na aplicação</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex size-32 items-center justify-center rounded-full bg-blue-50 text-blue-700 transition-colors hover:bg-blue-100"
          aria-label="Fechar painel de acessibilidade"
        >
          <i className="fas fa-times text-[16px]" aria-hidden="true" />
        </button>
      </div>

      <div className="flex flex-col gap-12">
        <h3 className="text-body-sm-medium text-brown-700 uppercase tracking-wide">Navegação</h3>
        {TOGGLE_ITEMS.map(({ key, label, icon }) => (
          <ToggleOptionButton
            key={key}
            label={label}
            icon={icon}
            active={!!toggleStates?.[key]}
            onClick={() => handleToggle(key)}
          />
        ))}
      </div>

      <div className="flex flex-col gap-12">
        <h3 className="text-body-sm-medium text-brown-700 uppercase tracking-wide">Conteúdo</h3>
        {LEVEL_ITEMS.map(({ key, label, icon, descriptions }) => (
          <LevelOptionButton
            key={key}
            label={label}
            icon={icon}
            level={levelStates?.[key] ?? 0}
            maxLevel={descriptions.length}
            description={descriptions[levelStates?.[key] ?? 0]}
            onClick={() => handleLevelChange(key)}
          />
        ))}
      </div>
    </div>
  );
};

export default AccessibilityOptionsPanel;