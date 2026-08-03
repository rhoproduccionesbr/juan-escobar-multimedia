import { useAudio } from '../context/AudioContext';
import { Play, Square } from 'lucide-react';
import { useState, useEffect } from 'react';

const Home = () => {
  const { isPlaying, togglePlay, streamData } = useAudio();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const userLocale = typeof navigator !== 'undefined' && navigator.language ? navigator.language : 'es-ES';
  const timeStr = time.toLocaleTimeString(userLocale, { hour: '2-digit', minute: '2-digit' });
  const rawDateStr = time.toLocaleDateString(userLocale, { weekday: 'long', day: 'numeric', month: 'long' });
  const dateStr = rawDateStr.charAt(0).toUpperCase() + rawDateStr.slice(1);

  return (
    <div className="flex flex-col items-center justify-center p-4 w-full h-full max-w-2xl mx-auto mt-2 md:mt-4">
      
      {/* Landscape Glassmorphism Container */}
      <div className="w-full relative rounded-[2.5rem] overflow-hidden border border-white/10 bg-black/10 backdrop-blur-md shadow-2xl hover:border-[var(--color-accent)]/30 hover:shadow-[0_0_20px_rgba(250,118,36,0.2)] transition-all duration-500 flex flex-col items-center justify-center pt-6 pb-6 md:pb-8 px-6">
        
        {/* Glow behind panel */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[var(--color-accent)]/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>

        {/* Top Header: Clock & Branding inside the box */}
        <div className="w-full flex items-start justify-between z-10 mb-4">
          <div>
            <p className="text-3xl md:text-4xl font-light tracking-wide text-white drop-shadow-md">{timeStr}</p>
            <p className="text-[9px] md:text-[10px] font-medium text-gray-400 uppercase tracking-widest mt-1 ml-1">{dateStr}</p>
          </div>

          <div className="flex flex-col items-end">
             <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5 shadow-md">
                <span className={`w-2 h-2 rounded-full ${streamData.activo ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
                <span className="text-[9px] md:text-[10px] uppercase font-bold tracking-widest text-[#AAA]">
                  {streamData.activo ? 'EN VIVO' : 'OFFLINE'}
                </span>
             </div>
          </div>
        </div>

        {/* Main Logo Graphic. Color icon + Pulse effect behind */}
        <div className="relative w-40 md:w-56 aspect-square mb-1 md:mb-2 flex items-center justify-center group">
           <div className="absolute inset-0 bg-[var(--color-accent)]/10 blur-3xl rounded-full pointer-events-none"></div>
           <div className="absolute inset-6 rounded-full bg-[var(--color-accent)]/20 animate-ping opacity-60 pointer-events-none" style={{ animationDuration: '3s' }}></div>
           <img 
              src="/jem_icono_color.png" 
              alt="Juan Escobar Mic" 
              className={`w-full h-full object-contain relative z-10 transition-transform duration-[2000ms] ${isPlaying ? 'scale-105 drop-shadow-[0_0_35px_var(--color-accent)]' : 'drop-shadow-2xl'}`} 
           />
        </div>

        {/* Title: Bicolor JUAN ESCOBAR (Naranja / Azul Profundo) */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-black italic tracking-wide uppercase flex gap-2 md:gap-3 drop-shadow-xl text-center">
          <span className="text-[var(--color-accent)]">JUAN</span> 
          <span className="text-[#3b82f6]">ESCOBAR</span>
        </h1>

        {/* Subtitle: — MULTIMEDIA — */}
        <div className="flex flex-col items-center mt-2">
           <div className="flex items-center gap-4">
             <div className="w-10 md:w-16 h-[1.5px] bg-white rounded-full opacity-60"></div>
             <h2 className="text-xs md:text-sm font-bold tracking-[0.5em] text-white uppercase -mr-[0.5em] opacity-90 drop-shadow-md">
               MULTIMEDIA
             </h2>
             <div className="w-10 md:w-16 h-[1.5px] bg-white rounded-full opacity-60"></div>
           </div>
           
           {/* Additional Information / Elegant Description */}
           <p className="max-w-[280px] md:max-w-[400px] text-[11px] md:text-xs text-gray-400 font-light italic mt-3 mb-1 opacity-90 leading-relaxed text-center tracking-wider drop-shadow-md">
             "La voz de las ideas nuevas, conocimientos reales y el panorama nacional. Transmitiendo con propósitos las 24 horas."
           </p>
        </div>

        {/* Play Button - Dynamic orange connected to accent */}
        <div className="mt-6 md:mt-8 relative group z-20">
          {isPlaying && (
             <div className="absolute inset-0 rounded-full bg-[var(--color-accent)] animate-ping opacity-40 scale-125"></div>
          )}
          
          <button 
            onClick={togglePlay}
            disabled={!streamData.activo}
            className={`relative z-10 h-14 w-14 md:h-16 md:w-16 rounded-full flex items-center justify-center transition-transform hover:scale-110 shadow-[0_0_20px_var(--color-accent)] ${
              !streamData.activo
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                : 'bg-[var(--color-accent)] text-white hover:shadow-[0_0_40px_var(--color-accent)]'
            }`}
          >
            {isPlaying ? <Square className="h-5 w-5 md:h-6 md:w-6 fill-current" /> : <Play className="h-5 w-5 md:h-6 md:w-6 fill-current ml-1" />}
          </button>
        </div>

      </div>
    </div>
  );
};

export default Home;
