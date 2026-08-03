import { useAudio } from '../context/AudioContext';
import { Play, Square, Volume2, VolumeX } from 'lucide-react';
import { useState } from 'react';

const Player = () => {
  const { isPlaying, togglePlay, volume, setVolume, streamData } = useAudio();
  const [showVolume, setShowVolume] = useState(false);

  return (
    <div className="fixed bottom-6 w-full flex justify-center px-4 z-50 pointer-events-none">
      <div className="bg-[#111111]/90 backdrop-blur-xl border border-white/10 rounded-full py-2 px-4 shadow-[0_15px_40px_rgba(0,0,0,0.9)] flex items-center gap-4 min-w-[300px] pointer-events-auto">
        
        {/* Left Side: Play Button */}
        <div className="flex-shrink-0">
          <button 
            onClick={togglePlay}
            disabled={!streamData.activo}
            className={`h-10 w-10 md:h-12 md:w-12 rounded-full flex items-center justify-center transition-transform hover:scale-110 shadow-lg ${
              !streamData.activo 
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                : 'bg-white text-black hover:bg-[var(--color-accent)] hover:text-white glow'
            }`}
          >
            {isPlaying ? <Square className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current ml-1" />}
          </button>
        </div>

        {/* Center: Info */}
        <div className="flex-1 min-w-0 pr-4">
          <div className="flex flex-col justify-center">
            <p className="text-[10px] text-[var(--color-accent)] font-bold tracking-wider uppercase mb-[1px] flex items-center gap-1.5 opacity-90">
              <span className={`w-1.5 h-1.5 rounded-full ${streamData.activo ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
              {streamData.activo ? 'Live' : 'Offline'}
            </p>
            <h3 className="font-heading font-medium text-white text-sm md:text-base truncate leading-none">
              {streamData.nombre || "Transmisión en espera..."}
            </h3>
          </div>
        </div>

        {/* Volume */}
        <div className="flex-1 flex justify-end items-center relative">
          <div className={`transition-all duration-300 overflow-hidden flex items-center bg-[#222] rounded-full px-2 py-1 ${showVolume ? 'w-24 opacity-100 mr-2' : 'w-0 opacity-0'}`}>
            <input 
              type="range" 
              min="0" max="1" step="0.01" 
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-full h-1 bg-black rounded-lg appearance-none cursor-pointer accent-[var(--color-accent)]"
            />
          </div>
          <button 
            onClick={() => setShowVolume(!showVolume)}
            className={`p-2.5 rounded-full transition-colors ${showVolume ? 'bg-white/10 text-white' : 'text-[#888] hover:text-white'}`}
          >
            {volume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </button>
        </div>

      </div>
    </div>
  );
};

export default Player;
