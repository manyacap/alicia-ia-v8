// ✅ src/nlp.js
const productos = ['pizza', 'coca', 'cerveza', 'ensalada', 'hamburguesa', 'agua'];

export function analizarTexto(texto) {
  const lower = texto.toLowerCase();

  // 🔍 Intención
  let intent = 'unknown';
  if (/hola|buenas|qué tal/.test(lower)) intent = 'greet';
  else if (/chau|adiós|nos vemos/.test(lower)) intent = 'goodbye';
  else if (/quiero|pedir|dame|me gustaría/.test(lower)) intent = 'order_item';

  // 🍕 Extracción de productos
  const items = productos.filter(p => lower.includes(p));

  return { intent, items };
}
