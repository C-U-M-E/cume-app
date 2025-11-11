const SCRIPT_ID = 'vlibras-plugin-script';
const SCRIPT_SRC = 'https://vlibras.gov.br/app/vlibras-plugin.js';
const APP_URL = 'https://vlibras.gov.br/app';
const CONTAINER_SELECTOR = '[data-vlibras-root="true"]';

let scriptPromise = null;
let widgetInstance = null;
let widgetReadyPromise = null;
let loadEventDispatched = false;

const isBrowser = () => typeof window !== 'undefined' && typeof document !== 'undefined';

const triggerWindowLoadEvent = () => {
  if (!isBrowser() || loadEventDispatched) return;

  const dispatch = () => {
    if (loadEventDispatched) return;
    loadEventDispatched = true;
    const loadEvent = new Event('load');
    window.dispatchEvent(loadEvent);
  };

  if (document.readyState === 'complete') {
    dispatch();
  } else {
    window.addEventListener('load', dispatch, { once: true });
  }
};

const ensureContainerExists = () => {
  if (!isBrowser()) return null;

  const existing = document.querySelector(CONTAINER_SELECTOR);
  if (existing) {
    existing.style.display = '';
    return existing;
  }

  const container = document.createElement('div');
  container.setAttribute('vw', '');
  container.className = 'enabled';
  container.dataset.vlibrasRoot = 'true';

  const accessButton = document.createElement('div');
  accessButton.setAttribute('vw-access-button', '');
  accessButton.className = 'active';

  const pluginWrapper = document.createElement('div');
  pluginWrapper.setAttribute('vw-plugin-wrapper', '');

  const topWrapper = document.createElement('div');
  topWrapper.className = 'vw-plugin-top-wrapper';

  pluginWrapper.appendChild(topWrapper);
  container.appendChild(accessButton);
  container.appendChild(pluginWrapper);

  document.body.appendChild(container);
  return container;
};

const loadScript = () => {
  if (!isBrowser()) return Promise.reject(new Error('VLibras só pode ser carregado no navegador.'));

  if (scriptPromise) {
    return scriptPromise;
  }

  const existingScript = document.getElementById(SCRIPT_ID);
  if (existingScript && existingScript.dataset.loaded === 'true') {
    scriptPromise = Promise.resolve(existingScript);
    return scriptPromise;
  }

  scriptPromise = new Promise((resolve, reject) => {
    const script = existingScript || document.createElement('script');
    script.id = SCRIPT_ID;
    script.src = SCRIPT_SRC;
    script.async = true;

    const handleLoad = () => {
      script.dataset.loaded = 'true';
      resolve(script);
    };

    const handleError = () => {
      scriptPromise = null;
      reject(new Error('Não foi possível carregar o script do VLibras.'));
    };

    script.addEventListener('load', handleLoad, { once: true });
    script.addEventListener('error', handleError, { once: true });

    if (!existingScript) {
      const targetParent = document.body || document.head;
      if (!targetParent) {
        reject(new Error('Documento ainda não possui <body> disponível para carregar o VLibras.'));
        return;
      }

      targetParent.appendChild(script);
    }
  });

  return scriptPromise;
};

const instantiateWidget = async () => {
  if (widgetInstance || widgetReadyPromise) {
    return widgetReadyPromise;
  }

  widgetReadyPromise = loadScript()
    .then(() => {
      if (typeof window.VLibras?.Widget !== 'function') {
        throw new Error('A biblioteca do VLibras foi carregada, mas a classe Widget não está disponível.');
      }

      widgetInstance = new window.VLibras.Widget(APP_URL);
      // eslint-disable-next-line no-console
      console.debug('[VLibras] Widget instanciado', widgetInstance);
      window.__vlibrasInstance = widgetInstance;
      triggerWindowLoadEvent();
      return widgetInstance;
    })
    .catch((error) => {
      widgetReadyPromise = null;
      throw error;
    });

  return widgetReadyPromise;
};

export const enableVlibras = async () => {
  if (!isBrowser()) return;

  ensureContainerExists();

  try {
    await instantiateWidget();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Erro ao ativar o VLibras:', error);
  }
};

export const disableVlibras = () => {
  if (!isBrowser()) return;

  const container = document.querySelector(CONTAINER_SELECTOR);
  if (container) {
    container.style.display = 'none';
  }

  // Mantemos a instância ativa para permitir reativação do botão oficial.
};

