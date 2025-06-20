// ✅ src/ui/App.jsx
import React, { useState, useEffect } from 'react';
import { initSTT } from '../stt.js';
import { speak } from '../tts.js';
import { analizarTexto } from '../nlp.js';

export default function App() {
  const [escuchando, setEscuchando] = useState(false);
  const [transcripcion, setTranscripcion] = useState('');
  const [respuesta, setRespuesta] = useState('');

  useEffect(() => {
    const reconocimiento = initSTT(
      async (texto) => {
        console.log('🧠 Resultado STT:', texto);
        setTranscripcion(texto);

        const nlp = analizarTexto(texto);
        console.log('🧠 NLP:', nlp);

        if (nlp.intent === 'order_item' && nlp.items.length > 0) {
          const msg = `Perfecto. Agrego ${nlp.items.join(' y ')}`;
          setRespuesta(msg);
          console.log('🔊 Hablando:', msg);
          await speak(msg);
          console.log('✅ Voz finalizada');
        } else {
          const fallback = 'Lo siento, no entendí tu pedido.';
          setRespuesta(fallback);
          console.log('🔊 Hablando:', fallback);
          await speak(fallback);
          console.log('✅ Voz finalizada');
        }

        setEscuchando(false);
      },
      () => setEscuchando(false),
      (error) => {
        console.error('❌ Error STT:', error);
        setEscuchando(false);
      }
    );

    if (escuchando && reconocimiento) {
      reconocimiento.start();
    }

    return () => {
      if (reconocimiento) reconocimiento.stop();
    };
  }, [escuchando]);

  const iniciarEscucha = () => {
    setTranscripcion('');
    setRespuesta('');
    setEscuchando(true);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>🎙️ Alicia IA</h1>
      <button onClick={iniciarEscucha} disabled={escuchando}>
        {escuchando ? 'Escuchando...' : 'Hablar'}
      </button>
      <p><strong>🗣️ Lo que dijiste:</strong> {transcripcion}</p>
      <p><strong>🤖 Respuesta:</strong> {respuesta}</p>
    </div>
  );
}
