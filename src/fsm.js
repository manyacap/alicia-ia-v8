// ✅ src/fsm.js
let currentState = 'idle';

const validTransitions = {
  idle: ['listening'],
  listening: ['processing', 'idle'],
  processing: ['speaking', 'idle'],
  speaking: ['idle']
};

export function getState() {
  return currentState;
}

export function transition(to) {
  const valid = validTransitions[currentState];
  if (valid && valid.includes(to)) {
    console.log(`🔁 FSM: ${currentState} → ${to}`);
    currentState = to;
  } else {
    console.warn(`❌ Transición inválida: ${currentState} → ${to}`);
  }
}
