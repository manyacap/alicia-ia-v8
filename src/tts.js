// ✅ src/tts.js
export async function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'es-ES';
  utterance.rate = 1;
  utterance.pitch = 1;

  const voices = window.speechSynthesis.getVoices();
  const esVoice = voices.find(v => v.lang === 'es-ES');
  if (esVoice) utterance.voice = esVoice;

  return new Promise((resolve) => {
    utterance.onend = resolve;
    window.speechSynthesis.speak(utterance);
  });
}