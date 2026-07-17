'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText, ScrollTrigger);
}

export default function About() {
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useGSAP(() => {
    if (!isMounted || !titleRef.current) return;

    let titleSplit: SplitText | null = null;

    try {
      titleSplit = new SplitText(titleRef.current, { type: 'words,lines' });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: containerRef.current, start: 'top 75%' }
      });

      tl.from(titleSplit.words, {
        opacity: 0,
        yPercent: 100,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.02
      });
    } catch (e) {}

    return () => ScrollTrigger.getAll().forEach(st => st.kill());
  }, { scope: containerRef, dependencies: [isMounted] });

  return (
    <section 
      ref={containerRef}
      id='about' 
      className='relative py-22 lg:py-32 bg-black text-white overflow-hidden'
    >
      <div>

        {/* HEADER - Título arriba y contenido debajo */}
        <div className='max-w-4xl pt-6 lg:pt-8'>
          <div className='inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-6 py-3 mb-8 text-sm tracking-widest uppercase mt-2'>
            <span className='text-[#2ee6d6]'>✦</span> 
          </div>

     
        <h2
        ref={titleRef}
        className='text-[3.6rem] md:text-[4.5rem] lg:text-[5.2rem] xl:text-[5.8rem] 2xl:text-[6.2rem]
                    font-black tracking-[-0.04em] leading-[0.95] text-balance mt-6  lg:mb-14'
        >
            El epicentro de la fiesta en{' '}
            <span className='text-[#2ee6d6]'>Sopetrán</span>
          </h2>
          <div className='my-5'>
            { ' '}
            <br/>
          </div>

          {/* Descripción y Rating debajo del título */}
          <div className='mt-12 lg:mt-14'>
            <p className='text-lg md:text-xl lg:text-2xl  text-[#a4a0a8]
             leading-[1.9] max-w-4xl'>
              En el corazón del calor de Sopetrán,{' '}
              <span 
  className="font-bold tracking-wider text-[#ffffff] 
             [text-shadow:0_0_8px_#2ee6d6,0_0_20px_#2ee6d6,0_0_35px_#ff3ea5,0_0_60px_#ff3ea5] 
             hover:[text-shadow:0_0_12px_#2ee6d6,0_0_25px_#2ee6d6,0_0_45px_#ff3ea5,0_0_80px_#ff3ea5]"
>
  LAS VEGAS DISCOBAR
</span>{' '} redefine la vida nocturna de Occidente con ambiente tropical, cócteles de autor y la mejor curaduría musical.
            </p>

            <div className='mt-16 lg:mt-20 flex items-center gap-10 mb-5'>
              <div className='flex items-baseline'>
                <span className='text-7xl lg:text-8xl font-black tracking-tighter text-[#ff3ea5]'>4.9</span>
                <span className='text-4xl text-white/40 font-light ml-1'>/5</span>
              </div>
              <div>
                <p className='uppercase font-bold tracking-widest text-sm'>EL SPOT PREFERIDO</p>
                <p className='text-white/60 text-sm'>Por locales y turistas</p>
              </div>
            </div>
          </div>
        </div>
          <br/>
        {/* BENTO GRID */}
        <div className='mt-28 lg:mt-40 grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10'>
          <div className='about-card md:col-span-5 relative rounded-3xl overflow-hidden aspect-4/5 group'>
            <Image src="/abt1.png" alt="" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent' />
            <div className='absolute bottom-8 left-8 right-8 z-10'>
              <span className='text-xs tracking-widest bg-black/60 px-4 py-1 rounded-full text-[#2ee6d6]'>MIXOLOGÍA</span>
              <p className='text-2xl font-bold mt-3'>Cócteles que refrescan tu noche</p>
            </div>
          </div>

          <div className='about-card md:col-span-7 relative rounded-3xl overflow-hidden aspect-video md:aspect-auto group'>
            <Image src="/abt2.png" alt="" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent' />
            <div className='absolute bottom-8 left-8 right-8 z-10'>
              <span className='text-xs tracking-widest bg-black/60 px-4 py-1 rounded-full text-[#ff3ea5]'>TEMPLO DE LA FIESTA</span>
              <p className='text-3xl lg:text-4xl font-black mt-3 leading-tight'>El mejor crossover y urbana de la región</p>
            </div>
          </div>

          <div className='about-card md:col-span-7 relative rounded-3xl overflow-hidden aspect-video md:aspect-auto group'>
            <Image src="/abt3.png" alt="" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent' />
            <div className='absolute bottom-8 left-8 right-8 z-10'>
              <span className='text-xs tracking-widest bg-black/60 px-4 py-1 rounded-full text-[#2ee6d6]'>MOMENTOS ÚNICOS</span>
              <p className='text-3xl lg:text-4xl font-black mt-3 leading-tight'>Donde se crean las mejores historias</p>
            </div>
          </div>

          <div className='about-card md:col-span-5 relative rounded-3xl overflow-hidden aspect-[4/3] group'>
            <Image src="/abt4.png" alt="" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent' />
            <div className='absolute bottom-8 left-8 right-8 z-10'>
              <span className='text-xs tracking-widest bg-black/60 px-4 py-1 rounded-full text-white/70'>LINE UP</span>
              <p className='text-2xl font-bold mt-3'>Visuales y sonido de otro nivel</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}