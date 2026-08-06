import { Radio } from 'lucide-react';

const Novedades = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center pb-24">
      
      {/* Holographic Radar Element — Azul */}
      <div className="relative flex items-center justify-center w-64 h-64 mb-10 group">
         {/* Ping animation backdrop rings */}
         <div className="absolute inset-4 rounded-full border-2 border-blue-500/20 animate-ping" style={{ animationDuration: '3s' }}></div>
         <div className="absolute inset-8 rounded-full border-2 border-blue-600/10 animate-ping" style={{ animationDuration: '4s' }}></div>
         
         {/* Sweeping spinning radar */}
         <div className="absolute inset-0 border border-blue-500/20 rounded-full border-t-blue-400/80 animate-[spin_4s_linear_infinite] shadow-[inset_0_10px_20px_rgba(37,99,235,0.1)]"></div>
         <div className="absolute inset-6 border border-blue-500/10 rounded-full border-b-blue-500/50 animate-[spin_6s_linear_infinite_reverse]"></div>
         
         {/* Core Icon */}
         <div className="relative z-10 w-24 h-24 rounded-full bg-blue-950/60 backdrop-blur-md border border-blue-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.5)] group-hover:scale-110 transition-transform duration-700">
           <Radio className="h-10 w-10 text-[var(--color-accent)] animate-pulse" />
         </div>
      </div>

      <div className="relative">
         <div className="absolute -inset-10 bg-blue-600/10 blur-[100px] pointer-events-none"></div>
         <h1 className="text-4xl md:text-5xl font-black italic text-white uppercase tracking-widest drop-shadow-[0_0_15px_rgba(59,130,246,0.5)] mb-3">
           PRÓXIMAMENTE
         </h1>
         <h2 className="text-[var(--color-accent)] tracking-[0.5em] text-xs md:text-sm font-bold uppercase">
           NUEVAS SECCIONES &amp; PODCAST
         </h2>
      </div>

      {/* Sync bar */}
      <div className="mt-16 w-full max-w-xs flex items-center gap-2 px-6 py-2 rounded-full border border-blue-500/20 bg-blue-950/30 backdrop-blur-sm">
         <div className="h-1.5 flex-1 bg-blue-900/40 rounded-full overflow-hidden">
            <div className="h-full bg-[var(--color-accent)] animate-[pulse_2s_ease-in-out_infinite] w-full origin-left" style={{ transform: 'scaleX(0.7)' }}></div>
         </div>
         <span className="text-[9px] uppercase tracking-widest text-blue-400/70 font-bold ml-2">Sincronizando...</span>
      </div>

    </div>
  );
};

export default Novedades;
