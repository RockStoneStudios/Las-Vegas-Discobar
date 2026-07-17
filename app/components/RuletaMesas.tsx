'use client';

import { useState, useRef, useEffect } from 'react';

const COLORES_RULETA = ['#ff3ea5', '#1c1030'];

function polarACartesiano(cx: number, cy: number, r: number, anguloGrados: number) {
  const rad = ((anguloGrados - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function describirPorcion(cx: number, cy: number, r: number, anguloInicio: number, anguloFin: number) {
  const inicio = polarACartesiano(cx, cy, r, anguloFin);
  const fin = polarACartesiano(cx, cy, r, anguloInicio);
  const arcoLargo = anguloFin - anguloInicio <= 180 ? '0' : '1';
  return `M ${cx} ${cy} L ${inicio.x} ${inicio.y} A ${r} ${r} 0 ${arcoLargo} 0 ${fin.x} ${fin.y} Z`;
}

interface RuletaMesasProps {
  numMesas: number;
  onResultado?: (mesaGanadora: number) => void;
}

type ModoVisual = 'ruleta' | 'mosaico';

export default function RuletaMesas({ numMesas, onResultado }: RuletaMesasProps) {
  const [modo, setModo] = useState<ModoVisual>('ruleta');
  
  // Lista de mesas única para el modo mosaico [1, 2, ..., numMesas]
  const listaMesasMosaico = Array.from({ length: numMesas }, (_, i) => i + 1);

  // Lista duplicada para la distribución simétrica visual de la ruleta
  const segmentosRuleta = Array.from({ length: numMesas * 2 }, (_, i) => (i % numMesas) + 1);
  const totalSegmentos = segmentosRuleta.length;
  const anguloSegmento = 360 / totalSegmentos;

  const [rotacion, setRotacion] = useState(0);
  const [girando, setGirando] = useState(false);
  const [ganadora, setGanadora] = useState<number | null>(null);
  const [duracionActual, setDuracionActual] = useState(5); // en segundos
  
  // Estados para la animación de cuadros encendidos
  const [indiceMosaicoActivo, setIndiceMosaicoActivo] = useState<number | null>(null);

  const rotacionAcumulada = useRef(0);
  const intervaloMosaicoRef = useRef<NodeJS.Timeout | null>(null);

  const cx = 250, cy = 250;
  const r = 240; 
  const radioTexto = r * 0.82; 

  // Limpiar temporizadores si se desmonta el componente
  useEffect(() => {
    return () => {
      if (intervaloMosaicoRef.current) clearInterval(intervaloMosaicoRef.current);
    };
  }, []);

  // Genera un número aleatorio entre min y max (inclusive)
  function obtenerAleatorio(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  function iniciarSorteo() {
    if (girando) return;
    setGirando(true);
    setGanadora(null);
    setIndiceMosaicoActivo(null);

    // 1. Determinar duración aleatoria del sorteo (entre 6 y 11 segundos)
    const segundosAleatorios = obtenerAleatorio(6, 11);
    setDuracionActual(segundosAleatorios);
    const milisegundosSorteo = segundosAleatorios * 1000;

    if (modo === 'ruleta') {
      // 2. Elegimos índice ganador aleatorio de la ruleta
      const indiceGanador = Math.floor(Math.random() * totalSegmentos);
      const anguloCentroSegmento = (indiceGanador * anguloSegmento) + (anguloSegmento / 2);
      
      // 3. Cantidad aleatoria de vueltas completas (entre 6 y 12 vueltas) para despistar del todo
      const vueltasExtra = Math.floor(obtenerAleatorio(6, 12));
      const anguloObjetivo = (360 * vueltasExtra) - anguloCentroSegmento;

      const anguloActualMod = ((rotacionAcumulada.current % 360) + 360) % 360;
      let diferencia = anguloObjetivo - anguloActualMod;
      if (diferencia <= 0) diferencia += 360;

      const nuevaRotacion = rotacionAcumulada.current + vueltasExtra * 360 + diferencia;
      rotacionAcumulada.current = nuevaRotacion;
      setRotacion(nuevaRotacion);

      setTimeout(() => {
        const mesaGanadora = segmentosRuleta[indiceGanador];
        setGirando(false);
        setGanadora(mesaGanadora);
        if (onResultado) onResultado(mesaGanadora);
      }, milisegundosSorteo);

    } else {
      // MODO MOSAICO (Cuadrados que se prenden en desorden absoluto)
      const indiceFinalMosaico = Math.floor(Math.random() * numMesas);
      let tiempoPaso = 60; // Velocidad inicial rápida (milisegundos)
      let tiempoAcumulado = 0;
      let ultimoIndiceActivo = -1;

      const animarMosaico = () => {
        // Seleccionamos un índice aleatorio que sea diferente al anterior para que se note el cambio
        let siguienteIndice;
        do {
          siguienteIndice = Math.floor(Math.random() * numMesas);
        } while (siguienteIndice === ultimoIndiceActivo && numMesas > 1);

        ultimoIndiceActivo = siguienteIndice;
        setIndiceMosaicoActivo(siguienteIndice);
        tiempoAcumulado += tiempoPaso;

        // Efecto de frenado progresivo de los cuadros encendidos
        const progreso = tiempoAcumulado / milisegundosSorteo;
        if (progreso > 0.6 && progreso <= 0.85) {
          tiempoPaso += 40; // Se va ralentizando al final
        } else if (progreso > 0.85) {
          tiempoPaso += 110;
        }

        if (tiempoAcumulado < milisegundosSorteo) {
          intervaloMosaicoRef.current = setTimeout(animarMosaico, tiempoPaso);
        } else {
          // Se detiene exactamente en la mesa ganadora definitiva
          setIndiceMosaicoActivo(indiceFinalMosaico);
          const mesaGanadora = listaMesasMosaico[indiceFinalMosaico];
          setGirando(false);
          setGanadora(mesaGanadora);
          if (onResultado) onResultado(mesaGanadora);
        }
      };

      intervaloMosaicoRef.current = setTimeout(animarMosaico, tiempoPaso);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', width: '100%' }}>
      
      {/* Selector de Modo visual */}
      <div 
        style={{ 
          display: 'flex', 
          background: '#0d0720', 
          borderRadius: '30px', 
          padding: '4px',
          border: '1.5px solid #331b58',
          boxShadow: '0 0 15px rgba(155, 93, 229, 0.15)'
        }}
      >
        <button
          disabled={girando}
          onClick={() => { setModo('ruleta'); setGanadora(null); setIndiceMosaicoActivo(null); }}
          style={{
            padding: '0.6rem 1.6rem',
            borderRadius: '25px',
            border: 'none',
            fontSize: '0.9rem',
            fontWeight: 700,
            cursor: girando ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            background: modo === 'ruleta' ? 'linear-gradient(135deg, #ff3ea5, #9b5de5)' : 'transparent',
            color: '#fff',
            textShadow: modo === 'ruleta' ? '0 0 8px rgba(255,255,255,0.5)' : 'none',
          }}
        >
          Ruleta
        </button>
        <button
          disabled={girando}
          onClick={() => { setModo('mosaico'); setGanadora(null); setIndiceMosaicoActivo(null); }}
          style={{
            padding: '0.6rem 1.6rem',
            borderRadius: '25px',
            border: 'none',
            fontSize: '0.9rem',
            fontWeight: 700,
            cursor: girando ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            background: modo === 'mosaico' ? 'linear-gradient(135deg, #ff3ea5, #9b5de5)' : 'transparent',
            color: '#fff',
            textShadow: modo === 'mosaico' ? '0 0 8px rgba(255,255,255,0.5)' : 'none',
          }}
        >
          Mosaico
        </button>
      </div>

      {/* Contenedor Fijo para Ruleta o Mosaico */}
      <div 
        style={{ 
          position: 'relative', 
          width: '100%', 
          maxWidth: '450px', 
          aspectRatio: '1 / 1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {modo === 'ruleta' ? (
          <>
            {/* Indicador de aguja superior */}
            <div
              style={{
                position: 'absolute', 
                top: '-12px', 
                left: '50%', 
                transform: 'translateX(-50%)',
                width: 0, 
                height: 0, 
                borderLeft: '14px solid transparent',
                borderRight: '14px solid transparent', 
                borderTop: '26px solid var(--neon-cyan)',
                zIndex: 10, 
                filter: 'drop-shadow(0 0 8px rgba(46,230,214,0.9))',
              }}
            />
            
            <svg
              width="100%" 
              height="100%" 
              viewBox="0 0 500 500"
              style={{
                transform: `rotate(${rotacion}deg)`,
                transition: girando ? `transform ${duracionActual}s cubic-bezier(0.1, 0.8, 0.1, 1)` : 'none',
                filter: 'drop-shadow(0 0 20px rgba(255,62,165,0.4))',
                willChange: 'transform',
              }}
            >
              <defs>
                <radialGradient id="hub" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#2ee6d6" />
                  <stop offset="100%" stopColor="#ff3ea5" />
                </radialGradient>
              </defs>
              
              {segmentosRuleta.map((mesa, i) => {
                const anguloInicio = i * anguloSegmento;
                const anguloFin = anguloInicio + anguloSegmento;
                const anguloMedio = anguloInicio + anguloSegmento / 2;
                const posTexto = polarACartesiano(cx, cy, radioTexto, anguloMedio);

                return (
                  <g key={i}>
                    <path
                      d={describirPorcion(cx, cy, r, anguloInicio, anguloFin)}
                      fill={COLORES_RULETA[i % 2]} 
                      stroke="#0a0612" 
                      strokeWidth="1.2"
                    />
                    <text
                      x={posTexto.x} 
                      y={posTexto.y} 
                      fill="#fff" 
                      fontSize="12.5" 
                      fontWeight="900" 
                      textAnchor="middle" 
                      dominantBaseline="middle"
                      transform={`rotate(${anguloMedio}, ${posTexto.x}, ${posTexto.y})`}
                      style={{
                        fontFamily: 'system-ui, sans-serif',
                        letterSpacing: '-0.05em'
                      }}
                    >
                      {mesa}
                    </text>
                  </g>
                );
              })}
              <circle cx={cx} cy={cy} r="28" fill="url(#hub)" />
            </svg>
          </>
        ) : (
          /* MODO MOSAICO: Cuadrícula con parpadeo caótico desordenado */
          <div 
            style={{ 
              width: '100%', 
              height: '100%', 
              display: 'grid', 
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '10px',
              padding: '10px',
              boxSizing: 'border-box'
            }}
          >
            {listaMesasMosaico.map((mesa, index) => {
              const activo = index === indiceMosaicoActivo;
              const esElGanador = ganadora === mesa;
              
              return (
                <div
                  key={mesa}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '12px',
                    fontSize: '1.4rem',
                    fontWeight: '900',
                    fontFamily: 'system-ui, sans-serif',
                    color: '#fff',
                    background: activo 
                      ? 'linear-gradient(135deg, #2ee6d6, #9b5de5)' 
                      : '#1c1030',
                    border: activo 
                      ? '2px solid #fff' 
                      : '2px solid #3c1e6d',
                    boxShadow: activo 
                      ? '0 0 25px #2ee6d6, inset 0 0 10px rgba(255,255,255,0.4)' 
                      : 'none',
                    transform: activo ? 'scale(1.06)' : 'scale(1)',
                    transition: 'all 0.08s ease',
                    userSelect: 'none',
                    opacity: !girando && ganadora && !esElGanador ? 0.35 : 1,
                  }}
                >
                  {mesa}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Botón de Sorteo */}
      <button
        onClick={iniciarSorteo}
        disabled={girando}
        className={girando ? '' : 'glow-btn'}
        style={{
          padding: '0.9rem 2.5rem', 
          fontSize: '1.1rem', 
          fontWeight: 800,
          background: girando ? '#2a1a40' : 'linear-gradient(135deg, #ff3ea5, #9b5de5)',
          color: '#fff', 
          border: 'none', 
          borderRadius: '999px',
          cursor: girando ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s ease',
        }}
      >
        {girando ? 'SORTEANDO...' : 'INICIAR SORTEO'}
      </button>

      {/* Alerta de Ganador */}
      <div style={{ minHeight: '2.5rem', display: 'flex', alignItems: 'center' }}>
        {ganadora && (
          <div 
            style={{ 
              fontSize: '1.35rem', 
              color: 'var(--neon-cyan)', 
              fontWeight: 800, 
              textShadow: '0 0 15px rgba(46,230,214,0.6)',
              animation: 'pulse 1.5s infinite'
            }}
          >
            🔥 ¡Mesa {ganadora} gana el juego libre! 🔥
          </div>
        )}
      </div>
    </div>
  );
}