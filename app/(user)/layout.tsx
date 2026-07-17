import '@/app/globals.css';
import Navbar from '@/app/components/Navbar';

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen text-white overflow-x-hidden font-sans bg-[#080415] [background-image:radial-gradient(circle_at_50%_-20%,_#2b0b4d_0%,_#080415_80%)] flex flex-col">
      
      {/* EFECTO DE LUZ DE NEÓN DE FONDO */}
      <div className="absolute top-[10%] right-[-10%] w-75 h-75 bg-linear-to-r from-[#005]/20 to-transparent rounded-full blur-[50px] pointer-events-none z-0" />

      <Navbar />

      {/* 🔥 CONTENIDO CON PADDING APLICADO CORRECTAMENTE */}
      <main className="flex-1 z-10 relative w-full">
        {/* EL PADDING VA AQUÍ, DENTRO DEL MAIN */}
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-4 sm:py-6 md:py-10 pb-28 md:pb-10">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </div>
      </main>

    </div>
  );
}
