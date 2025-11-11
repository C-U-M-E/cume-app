const FONT_FACTORS = [1, 1.25, 1.5, 1.75, 2];

const isBrowser = () => typeof window !== 'undefined' && typeof document !== 'undefined';

let appliedLevel = 0;

const clampLevel = (level) => {
  if (Number.isNaN(Number(level))) return 0;
  return Math.min(Math.max(Number(level), 0), FONT_FACTORS.length - 1);
};

export const applyFontScale = (level = 0) => {
  if (!isBrowser()) return;

  const normalizedLevel = clampLevel(level);

  if (normalizedLevel === appliedLevel) {
    return;
  }

  const factor = FONT_FACTORS[normalizedLevel] ?? 1;

  document.documentElement.style.setProperty('--a11y-font-scale', String(factor));
  appliedLevel = normalizedLevel;
};

export const resetFontScale = () => {
  if (!isBrowser()) return;
  appliedLevel = 0;
  document.documentElement.style.removeProperty('--a11y-font-scale');
};


