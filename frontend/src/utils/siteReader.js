const CHUNK_CHAR_LIMIT = 400;

const isBrowser = () => typeof window !== 'undefined' && typeof document !== 'undefined';

let readerEnabled = false;
let voicesPromise = null;
let cachedVoice = null;
let selectionListenerAttached = false;
let lastSelectedText = '';
let speakTimeoutId = null;
const SPEAK_DELAY_MS = 200;

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

const getSelectedText = () => {
  if (!isBrowser()) return '';
  const selection = window.getSelection();
  if (!selection) return '';
  return selection.toString().trim();
};

const handleSelectionChange = () => {
  const text = getSelectedText();
  if (text) {
    lastSelectedText = text;
    if (readerEnabled) {
      scheduleSpeak(text);
    }
  }
};

const ensureSelectionListener = () => {
  if (!isBrowser() || selectionListenerAttached) return;
  document.addEventListener('selectionchange', handleSelectionChange);
  selectionListenerAttached = true;
};

const clearSpeakTimeout = () => {
  if (speakTimeoutId) {
    clearTimeout(speakTimeoutId);
    speakTimeoutId = null;
  }
};

const speakText = async (text) => {
  if (!text) return;

  const voices = await waitForVoices();
  cachedVoice = cachedVoice || pickVoice(voices);

  const utterances = buildUtterances(cachedVoice, text);

  if (utterances.length === 0) {
    return;
  }

  utterances.forEach((utterance) => {
    utterance.onerror = (event) => {
      // eslint-disable-next-line no-console
      console.error('Erro ao reproduzir leitura:', event.error);
    };

    window.speechSynthesis.speak(utterance);
  });
};

const scheduleSpeak = (text) => {
  clearSpeakTimeout();

  if (!text) {
    return;
  }

  speakTimeoutId = setTimeout(async () => {
    speakTimeoutId = null;
    cancelSpeech();
    try {
      await speakText(text);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Erro ao iniciar leitura da seleção:', error);
    }
  }, SPEAK_DELAY_MS);
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

const cancelSpeech = () => {
  if (!isBrowser() || !isSpeechSupported()) return;
  try {
    window.speechSynthesis.cancel();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Falha ao cancelar a leitura:', error);
  }
};

export const enableSiteReader = async () => {
  if (!isBrowser()) return;

  if (!isSpeechSupported()) {
    // eslint-disable-next-line no-console
    console.warn('Web Speech API não é suportada neste navegador. Leitor de site indisponível.');
    return;
  }

  ensureSelectionListener();

  if (readerEnabled) {
    return;
  }

  readerEnabled = true;

  cancelSpeech();

  try {
    await speakText('Selecione o texto para ser lido');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Erro ao reproduzir instrução inicial do leitor:', error);
  }

  const currentSelection = getSelectedText();
  if (currentSelection) {
    lastSelectedText = currentSelection;
  }

  if (lastSelectedText) {
    scheduleSpeak(lastSelectedText);
  }
};

export const disableSiteReader = () => {
  if (!isBrowser()) return;
  readerEnabled = false;
  clearSpeakTimeout();
  cancelSpeech();
};

export const isSiteReaderEnabled = () => readerEnabled;


