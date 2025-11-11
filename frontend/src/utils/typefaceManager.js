const isBrowser = () => typeof window !== 'undefined' && typeof document !== 'undefined';

const TYPEFACE_CONFIG = [
  {
    family: "'Poppins', system-ui, sans-serif",
    loader: null,
  },
  {
    family: "'Merriweather', Georgia, 'Times New Roman', serif",
    loader: () =>
      loadStylesheet({
        id: 'a11y-typeface-reading',
        href: 'https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap',
      }),
  },
  {
    family: "'OpenDyslexic', 'Atkinson Hyperlegible', 'Comic Sans MS', sans-serif",
    loader: null,
  },
];

const loaderPromises = new Map();
let appliedLevel = 0;

function loadStylesheet({ id, href }) {
  if (!isBrowser()) return Promise.resolve();

  if (!id || !href) return Promise.resolve();

  if (loaderPromises.has(id)) {
    return loaderPromises.get(id);
  }

  const existing = document.getElementById(id);
  if (existing) {
    const promise = Promise.resolve(existing);
    loaderPromises.set(id, promise);
    return promise;
  }

  const promise = new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.id = id;
    link.href = href;

    link.onload = () => resolve(link);
    link.onerror = (event) => {
      loaderPromises.delete(id);
      // eslint-disable-next-line no-console
      console.error(`[Accessibility] Falha ao carregar stylesheet ${href}`, event);
      reject(new Error(`Não foi possível carregar a folha de estilo ${href}`));
    };

    document.head.appendChild(link);
  });

  loaderPromises.set(id, promise);
  return promise;
}

const clampLevel = (level) => {
  if (Number.isNaN(Number(level))) return 0;
  return Math.min(Math.max(Number(level), 0), TYPEFACE_CONFIG.length - 1);
};

const setTypefaceVariable = (family) => {
  if (!isBrowser()) return;
  document.documentElement.style.setProperty('--a11y-font-family', family);
};

export const applyTypeface = async (level = 0) => {
  if (!isBrowser()) return;

  const normalizedLevel = clampLevel(level);
  if (normalizedLevel === appliedLevel) {
    return;
  }

  const config = TYPEFACE_CONFIG[normalizedLevel] ?? TYPEFACE_CONFIG[0];

  try {
    if (typeof config.loader === 'function') {
      await config.loader();
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[Accessibility] Não foi possível carregar a fonte personalizada:', error);
    // Em caso de erro, permanecemos com a família anterior.
    return;
  }

  setTypefaceVariable(config.family);
  appliedLevel = normalizedLevel;
};

export const resetTypeface = () => {
  if (!isBrowser()) return;
  appliedLevel = 0;
  setTypefaceVariable(TYPEFACE_CONFIG[0].family);
};


