import { describe, test, expect, beforeEach } from 'vitest';
import { fsm } from '../../src/fsm'; // ajustá si tu FSM exporta distinto

describe('FSM Transitions', () => {
  beforeEach(() => {
    fsm.reset(); // si tenés método para reiniciar estado
  });

  test('De IDLE a LISTENING al iniciar voz', () => {
    fsm.send('START_LISTENING');
    expect(fsm.state.value).toBe('LISTENING');
  });

  test('De LISTENING a PROCESSING al recibir audio', () => {
    fsm.send('START_LISTENING');
    fsm.send('AUDIO_RECEIVED');
    expect(fsm.state.value).toBe('PROCESSING');
  });

  test('Vuelve a IDLE tras TTS completado', () => {
    fsm.send('START_LISTENING');
    fsm.send('AUDIO_RECEIVED');
    fsm.send('TTS_DONE');
    expect(fsm.state.value).toBe('IDLE');
  });
});