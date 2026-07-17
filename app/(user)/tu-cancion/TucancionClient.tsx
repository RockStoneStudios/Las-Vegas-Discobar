'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function TuCancion() {
  const [isMounted, setIsMounted] = useState(false);
  const [songName, setSongName] = useState('');
  const [artistName, setArtistName] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useGSAP(() => {
    if (!isMounted) return;

    const tl = gsap.timeline();
    
    tl.from('.form-container', {
      opacity: 0,
      y: 50,
      duration: 0.9,
      ease: 'power3.out',
    })
    .from('.animate-field', {
      opacity: 0,
      y: 20,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out'
    }, '-=0.4')
    .from('.neon-btn', {
      opacity: 0,
      scale: 0.95,
      duration: 0.5,
      ease: 'power2.out'
    }, '-=0.2');

  }, { scope: '#tu-cancion', dependencies: [isMounted] });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!songName || !artistName) return;

    setStatus('sending');

    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        setSongName('');
        setArtistName('');
        setStatus('idle');
      }, 4000);
    }, 1500);
  };

  if (!isMounted) {
    return <div className="bg-black min-h-screen" />;
  }

  return (
    <section 
      id='tu-cancion' 
      className='relative min-h-screen py-16 sm:py-20 md:py-28 flex items-center justify-center w-full overflow-hidden'
    >
      
      {/* IMAGEN DE FONDO */}
      <div className='absolute inset-0 z-0'>
        <Image
          src="/fondodj.jpg"
          alt="Fondo DJ"
          fill
          className="object-cover"
          priority
        />
        <div className='absolute inset-0 bg-black/70 backdrop-blur-sm' />
      </div>

      {/* Luces de ambiente */}
      <div className='absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#2ee6d6]/5 rounded-full blur-[140px] pointer-events-none z-0' />
      <div className='absolute bottom-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#ff3ea5]/5 rounded-full blur-[140px] pointer-events-none z-0' />

      {/* CONTENIDO */}
      <div className='w-full max-w-lg mx-auto px-6 z-10'>
        
        {/* HEADER */}
        <div className='text-center mb-10 sm:mb-12'>
          <span className='inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 text-[#2ee6d6] px-4 py-1.5 rounded-full text-[0.6rem] sm:text-xs font-bold tracking-widest uppercase mb-6 select-none'>
            ⚡ CONEXIÓN DIRECTA CON EL DJ
          </span>
          <br />
          <h1 className='text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-none mb-4 sm:mb-6 text-white'>
            Pide Tu <span className='text-[#2ee6d6] [text-shadow:0_0_30px_rgba(46,230,214,0.3)]'>Canción</span>
          </h1>
          <br />

          <p className='text-[#c0b8d0] text-[15px] sm:text-base leading-relaxed max-w-md mx-8 text-pretty'>
            A <span className='text-white font-bold tracking-wide uppercase drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]'>Las Vegas Discobar</span> nos encanta complacerte. ¿Te da pereza pararte de la mesa para pedir tu tema favorito? Pídelo desde aquí y pon a vibrar la pista.
          </p>
        </div>
        <br />
        <br />

        {/* FORMULARIO CON EFECTO VIDRIO */}
        <div className='form-container relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] p-6 sm:p-8 md:p-10 shadow-[0_24px_50px_-15px_rgba(0,0,0,0.9)]'>
          
          <div className='absolute -top-px left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-[#2ee6d6]/50 to-transparent rounded-full'></div>
          
          {status === 'success' ? (
            <div className='flex flex-col items-center justify-center py-12 text-center'>
              <div className='w-20 h-20 bg-[#2ee6d6]/20 border-2 border-[#2ee6d6] rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(46,230,214,0.3)]'>
                <span className='text-3xl text-[#2ee6d6]'>🎵</span>
              </div>
              <h3 className='text-xl font-extrabold tracking-wider text-white mb-2 uppercase'>¡Petición Enviada!</h3>
              <p className='text-[#c0b8d0] text-sm max-w-xs'>
                Tu tema ya está en la cabina del DJ. Alístate que ya casi suena.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className='flex flex-col gap-6 sm:gap-8'>
              
              {/* INPUT 1 */}
              <div className='animate-field flex flex-col gap-2'>
                <label htmlFor='songName' className='text-[0.6rem] sm:text-xs font-bold uppercase tracking-wider text-[#2ee6d6] ml-1'>
                  NOMBRE DE LA CANCIÓN
                </label>
                <input
                  type='text'
                  id='songName'
                  required
                  value={songName}
                  onChange={(e) => setSongName(e.target.value)}
                  placeholder='Ej: La Jumpa, Gasolina...'
                  className='w-full px-5 sm:px-6 py-4 sm:py-5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-[#8a8a9a] text-sm sm:text-base font-medium focus:outline-none focus:border-[#2ee6d6] focus:ring-2 focus:ring-[#2ee6d6]/30 transition-all duration-300 backdrop-blur-sm'
                />
              </div>

              {/* INPUT 2 */}
              <div className='animate-field flex flex-col gap-2'>
                <label htmlFor='artistName' className='text-[0.6rem] sm:text-xs font-bold uppercase tracking-wider text-[#ff3ea5] ml-1'>
                  ¿QUIÉN LA CANTA? (AUTOR)
                </label>
                <input
                  type='text'
                  id='artistName'
                  required
                  value={artistName}
                  onChange={(e) => setArtistName(e.target.value)}
                  placeholder='Ej: Arcángel, Bad Bunny...'
                  className='w-full px-5 sm:px-6 py-4 sm:py-5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-[#8a8a9a] text-sm sm:text-base font-medium focus:outline-none focus:border-[#ff3ea5] focus:ring-2 focus:ring-[#ff3ea5]/30 transition-all duration-300 backdrop-blur-sm'
                />
              </div>

              {/* BOTÓN NEÓN */}
              <button
                type='submit'
                disabled={status === 'sending'}
                className='neon-btn w-full mt-2 py-4 sm:py-5 rounded-xl font-extrabold text-black tracking-widest uppercase transition-all duration-300 bg-[#2ee6d6] text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group'
              >
                <span className='absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000'></span>
                <span className='absolute inset-0 -z-10 bg-[#2ee6d6] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500'></span>
                
                <span className='relative flex items-center justify-center gap-2'>
                  {status === 'sending' ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Mandando a la cabina...
                    </>
                  ) : (
                    <>
                      <span>🎵</span>
                      Hacer que suene
                    </>
                  )}
                </span>
              </button>

              <p className='text-center text-[0.55rem] sm:text-xs text-[#8a8a9a] tracking-wide mt-1'>
                Tu petición llegará directamente a la cabina del DJ en tiempo real
              </p>

            </form>
          )}

        </div>

      </div>
    </section>
  );
}