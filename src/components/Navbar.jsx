import { Link, useLocation } from 'react-router-dom';
import { Home, Newspaper, Info, Play, Square, Volume2, VolumeX } from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { useState } from 'react';

const Navbar = () => {
  const location = useLocation();
  const { isPlaying, togglePlay, streamData, volume, setVolume } = useAudio();
  const [showVolume, setShowVolume] = useState(false);

  const navLinks = [
    { name: 'Inicio',     path: '/',              icon: <Home      className="w-5 h-5" /> },
    { name: 'Novedades',  path: '/novedades',     icon: <Newspaper className="w-5 h-5" /> },
    { name: 'Red',        path: '/sobrenosotros', icon: <Info      className="w-5 h-5" /> },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex flex-col">

      {/* ══════════════════════════════════════
          MINI PLAYER — integrado sobre la barra
          ══════════════════════════════════════ */}
      <div className="bg-blue-900/70 backdrop-blur-xl border-t border-x border-blue-500/25 rounded-t-2xl mx-3 shadow-[0_-4px_20px_rgba(0,0,50,0.6)]">
        <div className="flex items-center gap-3 px-4 py-3">

          {/* Indicador vivo + nombre de canción */}
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${streamData.activo ? 'bg-green-400 animate-pulse shadow-[0_0_6px_#4ade80]' : 'bg-red-500'}`}></span>
            <div className="min-w-0">
              <p className="text-[10px] text-blue-300/70 font-bold uppercase tracking-widest leading-none mb-0.5">
                {streamData.activo ? 'En vivo' : 'Offline'}
              </p>
              <p className="text-sm text-white font-semibold truncate leading-tight">
                {streamData.nombre || 'Juan Escobar Multimedia'}
              </p>
            </div>
          </div>

          {/* Control de volumen */}
          <div className="flex items-center gap-2">
            {showVolume && (
              <input
                type="range"
                min="0" max="1" step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-20 h-1 appearance-none rounded-full cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #3b82f6 ${volume * 100}%, #1e3a5f ${volume * 100}%)`
                }}
              />
            )}
            <button
              onClick={() => setShowVolume(!showVolume)}
              className={`p-1.5 rounded-full transition-colors ${showVolume ? 'text-white bg-blue-500/20' : 'text-blue-400/60 hover:text-blue-200'}`}
            >
              {volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>

          {/* Botón Play / Stop */}
          <div className="relative flex-shrink-0">
            {isPlaying && (
              <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-30"></div>
            )}
            <button
              id="btn-play-main"
              onClick={togglePlay}
              disabled={!streamData.activo}
              className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 ${
                !streamData.activo
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : isPlaying
                    ? 'bg-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.7)]'
                    : 'bg-[var(--color-accent)] text-white shadow-[0_0_15px_rgba(37,99,235,0.6)] hover:shadow-[0_0_28px_rgba(37,99,235,0.9)]'
              }`}
            >
              {isPlaying
                ? <Square className="w-5 h-5 fill-current" />
                : <Play   className="w-5 h-5 fill-current ml-0.5" />
              }
            </button>
          </div>

        </div>
      </div>

      {/* ══════════════════════════════════════
          BARRA DE NAVEGACIÓN INFERIOR
          ══════════════════════════════════════ */}
      <nav className="bg-blue-950/95 backdrop-blur-xl border-t border-blue-500/20 shadow-[0_-2px_10px_rgba(0,0,30,0.8)]">
        <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`relative flex flex-col items-center justify-center gap-1 px-6 h-full transition-all duration-200 group ${
                  isActive ? 'text-white' : 'text-blue-400/45 hover:text-blue-200'
                }`}
              >
                {/* Icono */}
                <span className={`transition-all duration-200 ${isActive ? 'scale-110 drop-shadow-[0_0_6px_rgba(59,130,246,0.8)]' : 'group-hover:scale-105'}`}>
                  {link.icon}
                </span>
                {/* Label */}
                <span className="text-[9px] font-bold tracking-wider uppercase">
                  {link.name}
                </span>
                {/* Indicador activo */}
                {isActive && (
                  <span className="absolute bottom-1.5 w-5 h-[2px] rounded-full bg-[var(--color-accent)] shadow-[0_0_6px_var(--color-accent)]"></span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

    </div>
  );
};

export default Navbar;
