'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText, ScrollTrigger } from 'gsap/all';
import Image from 'next/image';
import Link from 'next/link';
import { useMediaQuery } from 'react-responsive';

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function InicioUsuario() {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useGSAP(() => {
    const heroSplit = new SplitText('.hero-title', { type: 'chars, words' });
    const subtitleSplit = new SplitText('.hero-subtitle', { type: 'lines' });

    // Le pintamos el gradiente neón a cada letra individual del título
    heroSplit.chars.forEach((char) => char.classList.add('text-gradient'));

    gsap.from(heroSplit.chars, {
      yPercent: 100,
      duration: 1.6,
      ease: 'expo.out',
      stagger: 0.05,
    });

    gsap.from(subtitleSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.4,
      ease: 'expo.out',
      stagger: 0.08,
      delay: 0.9,
    });

    gsap.from(['.leaf-left', '.leaf-right'], {
      opacity: 0,
      scale: 0.85,
      duration: 1.3,
      ease: 'power2.out',
      stagger: 0.15,
      delay: 0.2,
    });

    gsap.from('.hero-actions', {
      opacity: 0,
      y: 24,
      duration: 1,
      ease: 'power3.out',
      delay: 1.3,
    });

    gsap.from('.hero-drink-main', {
      scale: 0.7,
      opacity: 0,
      rotate: -8,
      duration: 1.1,
      ease: 'back.out(1.4)',
      delay: 0.6,
    });

    // Flotación infinita del trago principal, arranca cuando termina la entrada
    gsap.to('.hero-drink-main', {
      y: -18,
      duration: 3.2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: 1.7,
    });

    // Parallax al hacer scroll: hojas y tragos se mueven en direcciones
    // opuestas para dar sensación de profundidad, como si la cámara se alejara
    gsap
      .timeline({
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
      .to('.leaf-right', { y: isMobile ? 100 : 200 }, 0)
      .to('.leaf-left', { y: isMobile ? -100 : -200 }, 0)
      .to('.drink-left', { y: isMobile ? 80 : 160 }, 0)
      .to('.drink-right', { y: isMobile ? -80 : -160 }, 0);

    /*
     * Cuando tengas un video de fondo (ej. /videos/hero.mp4), descomenta esto
     * para replicar el efecto de "scroll scrubbing" del video de tu ejemplo:
     *
     * const videoEl = document.querySelector('#hero-video') as HTMLVideoElement;
     * const tl = gsap.timeline({
     *   scrollTrigger: {
     *     trigger: 'video',
     *     start: isMobile ? 'top 50%' : 'center 60%',
     *     end: isMobile ? '120% top' : 'bottom top',
     *     scrub: true,
     *     pin: true,
     *   },
     * });
     * videoEl.onloadedmetadata = () => {
     *   tl.to(videoEl, { currentTime: videoEl.duration });
     * };
     */
  }, [isMobile]);

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '6rem 1.5rem 3rem',
        textAlign: 'center',
        gap: '1.5rem',
      }}
    >
      <div className="blob" style={{ width: 420, height: 420, background: '#ff3ea5', top: -120, left: -100 }} />
      <div className="blob" style={{ width: 380, height: 380, background: '#2ee6d6', bottom: -140, right: -80, animationDelay: '3s' }} />

      <Image
        src="/hoja-left.png"
        alt=""
        width={140}
        height={280}
        className="leaf-left"
        style={{ position: 'absolute', left: -20, top: -40, zIndex: 1, objectFit: 'contain', pointerEvents: 'none' }}
      />
      <Image
        src="/hoja-right.png"
        alt=""
        width={140}
        height={280}
        className="leaf-right"
        style={{ position: 'absolute', right: -20, top: -20, zIndex: 1, objectFit: 'contain', pointerEvents: 'none' }}
      />

      
      <Image
        src="/drink2.png"
        alt=""
        width={80}
        height={80}
        className="drink-right"
        style={{ position: 'absolute', right: 10, bottom: '15%', zIndex: 1, objectFit: 'contain' }}
      />

      <span
        style={{
          fontSize: '0.8rem',
          letterSpacing: '0.3em',
          color: 'var(--neon-cyan)',
          textTransform: 'uppercase',
          position: 'relative',
          zIndex: 2,
        }}
      >
        Cada mesa tiene su oportunidad
      </span>

      <h1
        className="hero-title display"
        style={{
          fontSize: 'clamp(2.8rem, 8vw, 5.5rem)',
          fontWeight: 900,
          lineHeight: 1,
          position: 'relative',
          zIndex: 2,
        }}
      >
        LAS VEGAS DISCOBAR
      </h1>

      <p
        className="hero-subtitle"
        style={{ color: 'var(--text-muted)', maxWidth: 420, fontSize: '1.05rem', position: 'relative', zIndex: 2 }}
      >
        Escanea el QR de tu mesa, participa en los concursos de la noche
        <br /> y gana premios en vivo.
      </p>

      <div
        className="hero-drink-main"
        style={{ position: 'relative', zIndex: 2, filter: 'drop-shadow(0 0 30px rgba(255,62,165,0.4))' }}
      >
        <Image src="/drink.png" alt="Cóctel destacado" width={220} height={220} priority style={{ objectFit: 'contain' }} />
      </div>

      <div
        className="hero-actions"
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', maxWidth: 340, position: 'relative', zIndex: 2 }}
      >
        <Link
          href="/juegos"
          className="glow-btn"
          style={{
            padding: '1rem 2rem',
            background: 'linear-gradient(135deg, #ff3ea5, #9b5de5)',
            color: '#fff',
            borderRadius: '16px',
            textDecoration: 'none',
            fontWeight: 700,
            fontSize: '1rem',
          }}
        >
           Entrar a los Juegos
        </Link>
        <Link
          href="/programacion"
          style={{
            padding: '1rem 2rem',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#fff',
            borderRadius: '16px',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '0.95rem',
            backdropFilter: 'blur(10px)',
          }}
        >
           Pedir una Canción
        </Link>
        <Link
          href="/nosotros"
          style={{
            padding: '1rem 2rem',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#fff',
            borderRadius: '16px',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '0.95rem',
            backdropFilter: 'blur(10px)',
          }}
        >
          Sobre Nosotros
        </Link>
      </div>

      <Link
        href="/admin"
        style={{
          marginTop: '1rem',
          fontSize: '0.85rem',
          color: 'var(--text-muted)',
          textDecoration: 'underline',
          position: 'relative',
          zIndex: 2,
          opacity: 0.6,
        }}
      >
        Acceso para Staff / Administración
      </Link>
    </section>
  );
}