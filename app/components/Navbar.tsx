'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const [menuAbierto, setMenuAbierto] = useState(false);

  // Cerrar el menú hamburguesa automáticamente al cambiar de ruta
  useEffect(() => {
    setMenuAbierto(false);
  }, [pathname]);

  const esActiva = (ruta: string) => pathname === ruta;

  const enlaces = [
    { name: 'Inicio', path: '/' },
    { name: 'Nosotros', path: '/nosotros' },
    { name: 'Tu Canción', path: '/tu-cancion' },
    { name: 'Juegos', path: '/juegos' },
  ];

  return (
    <>
      {/* --- CABECERA (HEADER DESKTOP & MÓVIL) --- */}
      <header className="sticky top-0 z-90 w-full bg-[#080415]/85 backdrop-blur-md border-b border-[#9b5de5]/15">
        <div 
          className="max-w-7xl mx-auto flex items-center justify-between"
          style={{ padding: '2.5rem 3rem' }}
        >
          <h1 className="m-0 text-2xl font-black tracking-wider bg-linear-to-r from-white to-[#ff3ea5] bg-clip-text text-transparent [text-shadow:0_0_15px_rgba(255,62,165,0.4)]">
            LAS VEGAS <span className="text-lg text-[#2ee6d6] [text-fill-color:initial] font-black">DISCOBAR</span>
          </h1>

          {/* 💻 MENÚ DESKTOP */}
          <nav className="hidden md:flex items-center gap-6">
            {enlaces.map((enlace, index) => (
              <div key={enlace.path} className="flex items-center gap-6">
                <Link href={enlace.path} className="no-underline">
                  <span 
                    className={`text-sm font-bold transition-all duration-200 cursor-pointer tracking-wide ${
                      esActiva(enlace.path) 
                        ? 'text-[#ff3ea5] [text-shadow:0_0_8px_#ff3ea5]' 
                        : 'text-[#8c829e] hover:text-white'
                    }`}
                  >
                    {enlace.name}
                  </span>
                </Link>

                {/* Separador vertical neón */}
                {index < enlaces.length - 1 && (
                  <span 
                    className="h-4 w-[1.5px] bg-[#2ee6d6] rounded-full opacity-50"
                    style={{ 
                      boxShadow: '0 0 8px #2ee6d6, 0 0 15px rgba(46, 230, 214, 0.4)' 
                    }}
                  />
                )}
              </div>
            ))}
          </nav>

          {/* BOTÓN HAMBURGUESA (Móvil) */}
          <button
            onClick={() => setMenuAbierto(true)}
            className="block md:hidden bg-transparent border-none text-white text-3xl cursor-pointer outline-none p-1"
          >
            ☰
          </button>
        </div>
      </header>

      {/* --- 📱 MENÚ LATERAL DESPLEGABLE (SIDEBAR HAMBURGUESA) --- */}
      <div
        className={`fixed top-0 right-0 w-70 h-screen bg-[#0d0720]/98 backdrop-blur-xl border-l border-[#9b5de5]/30 z-100 shadow-[-10px_0_30px_rgba(0,0,0,0.5)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col ${
          menuAbierto ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Botón de cierre superior - ahora a la derecha con margen izquierdo */}
        <div className="flex justify-end shrink-0" style={{ padding: '2.5rem 3rem' }}>
          <button
            onClick={() => setMenuAbierto(false)}
            className="bg-transparent border-none text-white text-3xl cursor-pointer outline-none p-1"
          >
            ✕
          </button>
        </div>

        {/* 🚀 ENLACES CON MARGEN IZQUIERDO GRANDE (pl-16) */}
        <div 
          className="flex flex-col flex-1 justify-center gap-12"
          style={{ 
            paddingLeft: '2rem',  // ← MARGEN IZQUIERDO GRANDE (pl-16)
            paddingRight: '2rem',
            paddingBottom: '9rem'
          }}
        >
          {enlaces.map((enlace, index) => (
            <div key={enlace.path} className="w-full">
              <Link href={enlace.path} className="no-underline block">
                <span 
                  className={`text-2xl font-black tracking-wide cursor-pointer transition-all duration-300 block text-left ${
                    esActiva(enlace.path) 
                      ? 'text-[#2ee6d6] [text-shadow:0_0_12px_#2ee6d6,0_0_25px_rgba(46,230,214,0.5)]' 
                      : 'text-white/80 hover:text-[#ff3ea5] [text-shadow:0_0_6px_rgba(255,255,255,0.2)] hover:[text-shadow:0_0_12px_#ff3ea5]'
                  }`}
                >
                  {enlace.name}
                </span>
              </Link>

              {/* Línea divisoria horizontal neón con margen izquierdo */}
              {index < enlaces.length - 1 && (
                <div 
                  className="h-px bg-[#2ee6d6] opacity-35 mt-6"
                  style={{ 
                    width: 'calc(100% - 0rem)',  // Ocupa todo el ancho disponible
                    boxShadow: '0 0 6px #2ee6d6, 0 0 12px rgba(46, 230, 214, 0.3)',
                    marginLeft: '0rem'  // Alineada al margen izquierdo
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* --- BARRA FLOTANTE INFERIOR MÓVIL --- */}
      <nav className="flex md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 w-[90%] max-w-100 bg-[#0d0720]/85 backdrop-blur-md border border-[#9b5de5]/30 rounded-[30px] p-[8px_15px] justify-around items-center shadow-[0_8px_32px_0_rgba(0,0,0,0.5),_0_0_15px_rgba(255,62,165,0.15)] z-[80]">
        {enlaces.map((enlace) => (
          <Link key={enlace.path} href={enlace.path} className="no-underline">
            <div className="flex flex-col items-center gap-0.75 cursor-pointer">
              <span 
                className={`text-[0.8rem] font-bold transition-all duration-200 ${
                  esActiva(enlace.path) 
                    ? 'text-[#ff3ea5] [text-shadow:0_0_8px_#ff3ea5]' 
                    : 'text-[#8c829e]'
                }`}
              >
                {enlace.name}
              </span>
            </div>
          </Link>
        ))}
      </nav>
    </>
  );
}