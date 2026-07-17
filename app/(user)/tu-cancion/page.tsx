'use client';

import dynamic from 'next/dynamic';

const TuCancionClient = dynamic(
  () => import('./TucancionClient'),
  { 
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#2ee6d6] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#9e95b0] text-sm">Cargando...</p>
        </div>
      </div>
    )
  }
);

export default function Page() {
  return <TuCancionClient />;
}