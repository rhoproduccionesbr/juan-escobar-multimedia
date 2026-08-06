import { useAudio } from '../context/AudioContext';
import { useState, useEffect } from 'react';

// Icono Facebook con color oficial
const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

// Icono WhatsApp con color oficial
const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

// Icono Messenger con color oficial
const MessengerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.652V24l4.088-2.242c1.092.3 2.246.464 3.443.464 6.627 0 12-4.975 12-11.111S18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8.1l3.131 3.26L19.752 8.1l-6.561 6.863z"/>
  </svg>
);

const Home = () => {
  const { isPlaying, streamData } = useAudio();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const userLocale = typeof navigator !== 'undefined' && navigator.language ? navigator.language : 'es-ES';
  const timeStr = time.toLocaleTimeString(userLocale, { hour: '2-digit', minute: '2-digit' });
  const rawDateStr = time.toLocaleDateString(userLocale, { weekday: 'long', day: 'numeric', month: 'long' });
  const dateStr = rawDateStr.charAt(0).toUpperCase() + rawDateStr.slice(1);

  // ── Links de Redes Sociales ──
  const FACEBOOK_URL   = 'https://www.facebook.com/share/1E5iTpyYpm/';
  const WHATSAPP_URL   = 'https://wa.me/595982213681';
  const MESSENGER_URL  = 'https://m.me/juan.escobar.653248';

  const socialLinks = [
    {
      id: 'btn-facebook',
      label: 'Facebook',
      href: FACEBOOK_URL,
      icon: <FacebookIcon />,
      color: '#1877F2',
      bg: 'rgba(24,119,242,0.12)',
      border: 'rgba(24,119,242,0.35)',
      shadow: 'rgba(24,119,242,0.5)',
    },
    {
      id: 'btn-whatsapp',
      label: 'WhatsApp',
      href: WHATSAPP_URL,
      icon: <WhatsAppIcon />,
      color: '#25D366',
      bg: 'rgba(37,211,102,0.12)',
      border: 'rgba(37,211,102,0.35)',
      shadow: 'rgba(37,211,102,0.5)',
    },
    {
      id: 'btn-messenger',
      label: 'Messenger',
      href: MESSENGER_URL,
      icon: <MessengerIcon />,
      color: '#0099FF',
      bg: 'rgba(0,153,255,0.12)',
      border: 'rgba(0,153,255,0.35)',
      shadow: 'rgba(0,153,255,0.5)',
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center p-4 w-full h-full max-w-2xl mx-auto mt-2 md:mt-4">
      
      {/* Glassmorphism Container */}
      <div className="w-full relative rounded-[2.5rem] overflow-hidden border border-blue-500/20 bg-blue-950/20 backdrop-blur-md shadow-2xl hover:border-blue-400/40 hover:shadow-[0_0_30px_rgba(37,99,235,0.3)] transition-all duration-500 flex flex-col items-center justify-center pt-6 pb-8 px-6">
        
        {/* Glow azul de fondo */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/15 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-800/10 rounded-full blur-[80px] pointer-events-none translate-y-1/2 -translate-x-1/3"></div>

        {/* Header: Reloj + Estado EN VIVO */}
        <div className="w-full flex items-start justify-between z-10 mb-4">
          <div>
            <p className="text-3xl md:text-4xl font-light tracking-wide text-white drop-shadow-md">{timeStr}</p>
            <p className="text-[9px] md:text-[10px] font-medium text-blue-300 uppercase tracking-widest mt-1 ml-1">{dateStr}</p>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-blue-500/20 shadow-md">
              <span className={`w-2 h-2 rounded-full ${streamData.activo ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
              <span className="text-[9px] md:text-[10px] uppercase font-bold tracking-widest text-blue-200">
                {streamData.activo ? 'EN VIVO' : 'OFFLINE'}
              </span>
            </div>
          </div>
        </div>

        {/* Logo circular con glow */}
        <div className="relative w-52 md:w-64 aspect-square mb-2 flex items-center justify-center group">
          <div className="absolute inset-0 bg-blue-500/15 blur-3xl rounded-full pointer-events-none"></div>
          <div
            className="absolute inset-8 rounded-full bg-blue-600/20 animate-ping opacity-50 pointer-events-none"
            style={{ animationDuration: '3s' }}
          ></div>
          <img
            src="/logo_radio.jpg"
            alt="Radio Juan Escobar Multimedia"
            className={`w-full h-full object-cover rounded-full relative z-10 transition-all duration-[2000ms] border-2 border-blue-500/40 ${
              isPlaying
                ? 'scale-105 shadow-[0_0_50px_rgba(37,99,235,0.7)] border-blue-400/80'
                : 'shadow-[0_0_25px_rgba(37,99,235,0.4)]'
            }`}
          />
        </div>

        {/* Título */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-black italic tracking-wide uppercase flex gap-2 md:gap-3 drop-shadow-xl text-center mt-2">
          <span className="text-white">JUAN</span>
          <span className="text-[var(--color-accent)]">ESCOBAR</span>
        </h1>

        {/* Subtítulo MULTIMEDIA */}
        <div className="flex flex-col items-center mt-2 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-10 md:w-16 h-[1.5px] bg-blue-400 rounded-full opacity-60"></div>
            <h2 className="text-xs md:text-sm font-bold tracking-[0.5em] text-blue-200 uppercase -mr-[0.5em] opacity-90 drop-shadow-md">
              MULTIMEDIA
            </h2>
            <div className="w-10 md:w-16 h-[1.5px] bg-blue-400 rounded-full opacity-60"></div>
          </div>
          <p className="max-w-[280px] md:max-w-[400px] text-[11px] md:text-xs text-blue-300 font-light italic mt-3 mb-0 opacity-90 leading-relaxed text-center tracking-wider drop-shadow-md">
            "La voz de las ideas nuevas, conocimientos reales y el panorama nacional. Transmitiendo con propósitos las 24 horas."
          </p>
        </div>

        {/* ── Botones de Redes Sociales ── */}
        <div className="flex items-center justify-center gap-4 z-10 w-full">
          {socialLinks.map((s) => (
            <a
              key={s.id}
              id={s.id}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              title={s.label}
              className="group flex flex-col items-center gap-1.5 transition-transform duration-200 hover:scale-110 active:scale-95"
            >
              {/* Botón circular */}
              <span
                className="flex items-center justify-center w-14 h-14 rounded-full transition-all duration-300"
                style={{
                  color: s.color,
                  background: s.bg,
                  border: `1.5px solid ${s.border}`,
                  boxShadow: `0 0 0 0 ${s.shadow}`,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = `0 0 18px 4px ${s.shadow}`;
                  e.currentTarget.style.background = s.bg.replace('0.12', '0.22');
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = `0 0 0 0 ${s.shadow}`;
                  e.currentTarget.style.background = s.bg;
                }}
              >
                {s.icon}
              </span>
              {/* Label */}
              <span
                className="text-[9px] font-bold uppercase tracking-widest"
                style={{ color: s.color, opacity: 0.85 }}
              >
                {s.label}
              </span>
            </a>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Home;
