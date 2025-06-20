export class HealthMonitor {
  constructor() {
    this.errors = [];
  }

  async checkSTT() {
    const testInput = "prueba";
    try {
      const result = await speechToText(testInput);
      return result.length > 0;
    } catch {
      this.errors.push("STT_TIMEOUT");
      return false;
    }
  }

  async checkTTS() {
    try {
      const audio = await textToSpeech("Test de voz");
      return audio?.duration > 0;
    } catch {
      this.errors.push("TTS_FAIL");
      return false;
    }
  }

  hasCriticalErrors() {
    return this.errors.length > 0;
  }
}
