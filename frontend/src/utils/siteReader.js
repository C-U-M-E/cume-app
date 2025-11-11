const CHUNK_CHAR_LIMIT = 400;

const isBrowser = () => typeof window !== 'undefined' && typeof document !== 'undefined';

const READABLE_ELEMENTS = [
  '[data-site-reader-text]',
  'article',
  'main',
  'section',
  'header',
  'footer',
  'nav',
  'p',
  'li',
  'blockquote',
  'figcaption',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'a[href]',
  'button',
  '[role="button"]',
  'label',
];

const READABLE_SELECTOR = READABLE_ELEMENTS.join(', ');
const ACTIVE_CLASS = 'site-reader-highlight';
const SPEAK_DELAY_MS = 200;

const INTERACTIVE_ELEMENTS = ['a[href]', 'button', '[role="button"]', 'input', 'textarea', 'select'];
const INTERACTIVE_SELECTOR = INTERACTIVE_ELEMENTS.join(', ');
const INTERACTIVE_ACTION_THRESHOLD = 1500;

let readerEnabled = false;
let voicesPromise = null;
let cachedVoice = null;
let clickListenerAttached = false;
let highlightStyleInjected = false;
let activeElement = null;
let speakTimeoutId = null;
let lastInteractiveTarget = null;
let lastInteractiveTimestamp = 0;
let speakToken = 0;

const isInteractiveElement = (element) => {
  if (!element) return false;
  return Boolean(element.closest(INTERACTIVE_SELECTOR));
};

const shouldAllowInteractiveAction = (element) => {
  if (!element) return false;
  if (element !== lastInteractiveTarget) {
    lastInteractiveTarget = element;
    lastInteractiveTimestamp = Date.now();
    return false;
  }

  const elapsed = Date.now() - lastInteractiveTimestamp;
  lastInteractiveTarget = element;
  lastInteractiveTimestamp = Date.now();

  return elapsed <= INTERACTIVE_ACTION_THRESHOLD;
};

const isSpeechSupported = () => {
  if (!isBrowser()) return false;
  return 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
};

const waitForVoices = () => {
  if (!isBrowser() || !isSpeechSupported()) {
    return Promise.resolve([]);
  }

  if (voicesPromise) {
    return voicesPromise;
  }

  const synth = window.speechSynthesis;
  const existingVoices = synth.getVoices();

  if (existingVoices.length > 0) {
    voicesPromise = Promise.resolve(existingVoices);
    return voicesPromise;
  }

  voicesPromise = new Promise((resolve) => {
    const handleVoicesChanged = () => {
      synth.removeEventListener('voiceschanged', handleVoicesChanged);
      resolve(synth.getVoices());
    };

    synth.addEventListener('voiceschanged', handleVoicesChanged);

    // Fallback timeout caso o evento não dispare (implementações antigas)
    setTimeout(() => {
      synth.removeEventListener('voiceschanged', handleVoicesChanged);
      resolve(synth.getVoices());
    }, 2000);
  });

  return voicesPromise;
};

const pickVoice = (voices = []) => {
  if (!Array.isArray(voices) || voices.length === 0) {
    return null;
  }

  const preferredLocales = ['pt-BR', 'pt_PT', 'pt-PT', 'pt'];

  for (const locale of preferredLocales) {
    const voice = voices.find((item) => item.lang?.toLowerCase() === locale.toLowerCase());
    if (voice) return voice;
  }

  // Se não encontrar em Português, usa a primeira voz disponível
  return voices[0];
};

const ensureHighlightStyles = () => {
  if (!isBrowser() || highlightStyleInjected) return;

  const style = document.createElement('style');
  style.id = 'site-reader-highlight-style';
  style.textContent = `
.${ACTIVE_CLASS} {
  text-decoration: underline;
  text-decoration-thickness: 0.15em;
  text-decoration-color: currentColor;
}
`;

  document.head.appendChild(style);
  highlightStyleInjected = true;
};

const clearActiveHighlight = () => {
  if (activeElement) {
    activeElement.classList.remove(ACTIVE_CLASS);
    activeElement = null;
  }
};

const highlightElement = (element) => {
  if (!element) return;
  if (element === activeElement) return;
  clearActiveHighlight();
  element.classList.add(ACTIVE_CLASS);
  activeElement = element;
};

const splitTextIntoChunks = (text) => {
  if (!text) return [];

  if (text.length <= CHUNK_CHAR_LIMIT) {
    return [text];
  }

  const sentences = text.split(/(?<=[.!?])\s+/);
  const chunks = [];
  let currentChunk = '';

  sentences.forEach((sentence) => {
    if ((currentChunk + sentence).length <= CHUNK_CHAR_LIMIT) {
      currentChunk += `${sentence} `;
    } else {
      if (currentChunk.trim()) {
        chunks.push(currentChunk.trim());
      }
      currentChunk = `${sentence} `;
    }
  });

  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
};

const buildUtterances = (voice, text) => {
  const chunks = splitTextIntoChunks(text);

  return chunks.map((chunk) => {
    const utterance = new SpeechSynthesisUtterance(chunk);
    if (voice) {
      utterance.voice = voice;
    }
    utterance.lang = voice?.lang || 'pt-BR';
    utterance.rate = 1;
    utterance.pitch = 1;
    return utterance;
  });
};

const clearSpeakTimeout = () => {
  if (speakTimeoutId) {
    clearTimeout(speakTimeoutId);
    speakTimeoutId = null;
  }
};

const speakText = async (text, token, { onComplete } = {}) => {
  if (!text) return;

  const voices = await waitForVoices();
  cachedVoice = cachedVoice || pickVoice(voices);

  const utterances = buildUtterances(cachedVoice, text);

  if (utterances.length === 0) {
    return;
  }

  await new Promise((resolve) => {
    utterances.forEach((utterance, index) => {
      utterance.onerror = (event) => {
        const ignoredErrors = ['interrupted', 'canceled'];
        if (!ignoredErrors.includes(event.error) && token === speakToken) {
          // eslint-disable-next-line no-console
          console.error('Erro ao reproduzir leitura:', event.error);
          onComplete?.();
        }
        resolve();
      };

      utterance.onend = () => {
        if (index === utterances.length - 1 && token === speakToken) {
          onComplete?.();
        }
        resolve();
      };

      window.speechSynthesis.speak(utterance);
    });
  });
};

const cancelSpeech = () => {
  if (!isBrowser() || !isSpeechSupported()) return;
  try {
    window.speechSynthesis.cancel();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Falha ao cancelar a leitura:', error);
  }
};

const scheduleSpeak = (text, element) => {
  clearSpeakTimeout();

  if (!text) {
    return;
  }

  const token = ++speakToken;

  speakTimeoutId = setTimeout(async () => {
    speakTimeoutId = null;
    cancelSpeech();
    try {
      await speakText(text, token, {
        onComplete: () => {
          if (element === activeElement) {
            clearActiveHighlight();
          }
        },
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Erro ao iniciar leitura do conteúdo selecionado:', error);
      if (element === activeElement) {
        clearActiveHighlight();
      }
    }
  }, SPEAK_DELAY_MS);
};

const handleReadableClick = (event) => {
  if (!readerEnabled) return;
  const target = event.target?.closest(READABLE_SELECTOR);
  if (!target) return;

  const text = target.innerText?.trim();
  if (!text) {
    return;
  }

  const interactive = event.target.closest(INTERACTIVE_SELECTOR);
  if (interactive) {
    if (shouldAllowInteractiveAction(interactive)) {
      clearActiveHighlight();
      cancelSpeech();
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    if (typeof event.stopImmediatePropagation === 'function') {
      event.stopImmediatePropagation();
    }
  }

  highlightElement(target);
  scheduleSpeak(text, target);
};

const handleInteractiveClick = (event) => {
  if (!readerEnabled) return;
  const target = event.target?.closest(INTERACTIVE_SELECTOR);
  if (!target) return;

  if (shouldAllowInteractiveAction(target)) {
    return;
  }

  const text = target.innerText?.trim();
  if (!text) {
    return;
  }

  highlightElement(target);
  scheduleSpeak(text, target);
};

const ensureClickListener = () => {
  if (!isBrowser() || clickListenerAttached) return;
  document.addEventListener('click', handleReadableClick, true);
  clickListenerAttached = true;
};

const removeClickListener = () => {
  if (!isBrowser() || !clickListenerAttached) return;
  document.removeEventListener('click', handleReadableClick, true);
  clickListenerAttached = false;
};

export const enableSiteReader = async () => {
  if (!isBrowser()) return;

  if (!isSpeechSupported()) {
    // eslint-disable-next-line no-console
    console.warn('Web Speech API não é suportada neste navegador. Leitor de site indisponível.');
    return;
  }

  if (readerEnabled) {
    return;
  }

  readerEnabled = true;
  ensureHighlightStyles();
  ensureClickListener();
  cancelSpeech();

  try {
    await speakText('Clique em um conteúdo para ouvir a leitura. Em botões ou links, clique novamente para ativar a ação.', ++speakToken);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Erro ao reproduzir instrução inicial do leitor:', error);
  }
};

export const disableSiteReader = () => {
  if (!isBrowser()) return;
  readerEnabled = false;
  clearSpeakTimeout();
  cancelSpeech();
  clearActiveHighlight();
  removeClickListener();
  lastInteractiveTarget = null;
  lastInteractiveTimestamp = 0;
  speakToken += 1;
};

export const isSiteReaderEnabled = () => readerEnabled;


