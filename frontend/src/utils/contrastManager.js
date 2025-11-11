const isBrowser = () => typeof window !== 'undefined' && typeof document !== 'undefined';

let appliedLevel = 0;

const clampLevel = (level) => {
  if (Number.isNaN(Number(level))) return 0;
  return Math.min(Math.max(Number(level), 0), 1);
};

export const applyContrast = (level = 0) => {
  if (!isBrowser()) return;

  const normalizedLevel = clampLevel(level);
  if (normalizedLevel === appliedLevel && document.documentElement.dataset.contrast) {
    return;
  }

  if (normalizedLevel === 0) {
    delete document.documentElement.dataset.contrast;
  } else {
    document.documentElement.dataset.contrast = 'high';
  }

  appliedLevel = normalizedLevel;
};

export const resetContrast = () => {
  if (!isBrowser()) return;
  appliedLevel = 0;
  delete document.documentElement.dataset.contrast;
};


