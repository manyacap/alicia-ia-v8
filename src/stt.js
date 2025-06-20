// ✅ src/stt.js
export function initSTT(onResult, onEnd, onError) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    console.warn('[STT] API no soportada');
    return null;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = 'es-ES';
  recognition.interimResults = false;
  recognition.continuous = false;

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    onResult(transcript);
  };

  recognition.onerror = (event) => {
    console.error('[STT Error]', event.error);
    onError(event.error);
  };

  recognition.onend = () => onEnd();

  return recognition;
}