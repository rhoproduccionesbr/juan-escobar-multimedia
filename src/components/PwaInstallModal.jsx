import { useState, useEffect } from 'react';
import { Download, X, Share, Check } from 'lucide-react';

export default function PwaInstallModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isIos, setIsIos] = useState(false);
  const [showIosGuide, setShowIosGuide] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    // Check if already running in standalone (PWA mode)
    const isStandalone = 
      window.matchMedia('(display-mode: standalone)').matches || 
      window.navigator.standalone === true;

    if (isStandalone) {
      return;
    }

    const hasDismissed = localStorage.getItem('jem_pwa_prompt_dismissed');
    const hasInstalled = localStorage.getItem('jem_pwa_installed');

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIos(isIosDevice);

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);

      if (!hasDismissed && !hasInstalled) {
        setIsOpen(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Show prompt on first launch if not dismissed
    if (!hasDismissed && !hasInstalled) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500);
      return () => clearTimeout(timer);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        localStorage.setItem('jem_pwa_installed', 'true');
        setInstalled(true);
        setTimeout(() => setIsOpen(false), 1500);
      }
      setDeferredPrompt(null);
    } else if (isIos) {
      setShowIosGuide(true);
    } else {
      alert('Para instalar la aplicación, utiliza el menú de tu navegador y selecciona "Agregar a la pantalla de inicio" o "Instalar aplicación".');
      handleDismiss();
    }
  };

  const handleDismiss = () => {
    localStorage.setItem('jem_pwa_prompt_dismissed', 'true');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-all duration-300">
      <div className="relative w-full max-w-md bg-[#12121e] border border-amber-500/20 rounded-3xl p-6 shadow-2xl text-white overflow-hidden transform transition-all">
        {/* Glow background effects */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-amber-500/20 to-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-gradient-to-tr from-blue-600/20 to-amber-500/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="flex flex-col items-center text-center space-y-4 pt-2">
          {/* 1:1 App Icon */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500 to-purple-600 rounded-2xl blur-md opacity-60 group-hover:opacity-100 transition duration-500"></div>
            <img
              src="/app-icon.png"
              alt="Juan Escobar Multimedia Icono"
              className="relative w-24 h-24 rounded-2xl object-cover shadow-xl border border-white/10"
            />
          </div>

          <div className="space-y-1">
            <h3 className="text-xl font-bold tracking-tight bg-gradient-to-r from-amber-400 via-orange-400 to-purple-400 bg-clip-text text-transparent">
              Juan Escobar Multimedia
            </h3>
            <p className="text-sm font-medium text-amber-400/90">Radio Online con Propósitos</p>
          </div>

          {/* Friendly prompt message */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-gray-200 leading-relaxed shadow-inner">
            <p className="font-semibold text-white text-base mb-1">
              ¿Deseas instalar la aplicación en tu dispositivo?
            </p>
            <p className="text-xs text-gray-300">
              Agrega la aplicación a tu pantalla de inicio para un acceso rápido con un solo toque, escuchar la radio en segundo plano y disfrutar de la mejor experiencia.
            </p>
          </div>

          {showIosGuide && (
            <div className="w-full bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 text-left text-xs text-amber-200 space-y-2">
              <div className="flex items-center space-x-2 font-semibold text-amber-300">
                <Share className="w-4 h-4" />
                <span>Instrucciones para iOS (Safari):</span>
              </div>
              <ol className="list-decimal list-inside space-y-1 text-gray-300">
                <li>Toca el botón <strong>Compartir</strong> en la barra del navegador.</li>
                <li>Selecciona <strong>"Agregar a inicio"</strong>.</li>
                <li>Confirma tocando <strong>"Agregar"</strong>.</li>
              </ol>
            </div>
          )}

          {installed ? (
            <div className="flex items-center space-x-2 text-emerald-400 font-medium py-2">
              <Check className="w-5 h-5" />
              <span>¡Aplicación instalada con éxito!</span>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3 w-full pt-2">
              <button
                onClick={handleInstallClick}
                className="flex-1 flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black font-bold shadow-lg shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Download className="w-5 h-5" />
                <span>Instalar App</span>
              </button>
              <button
                onClick={handleDismiss}
                className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-gray-300 font-medium transition-colors"
              >
                Ahora no
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
