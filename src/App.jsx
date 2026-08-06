import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import PwaInstallModal from './components/PwaInstallModal';
import Home from './pages/Home';
import Novedades from './pages/Novedades';
import SobreNosotros from './pages/SobreNosotros';
import Login from './pages/admin/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
import { AudioProvider } from './context/AudioContext';

import { useState, useEffect } from 'react';

const STUDIO_IMAGES = [
  '/bg_studio.png' // Cinematic Studio Image
];

function Layout() {
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % STUDIO_IMAGES.length);
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen text-[var(--color-text-primary)] relative">
      {/* Dynamic Background — Azul profundo */}
      <div className="fixed inset-0 w-full h-full z-[-1] overflow-hidden bg-[#020817]">
        {STUDIO_IMAGES.map((img, i) => (
          <div 
            key={i}
            className="absolute inset-0 w-full h-full transition-opacity duration-3000 ease-in-out"
            style={{ 
              opacity: i === bgIndex ? 0.25 : 0,
              backgroundImage: `url(${img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ))}
        {/* Blue nebula overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(37,99,235,0.12)_0%,_transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(29,78,216,0.08)_0%,_transparent_60%)]"></div>
        {/* Soft vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#020817]/60 to-[#020817]"></div>
      </div>

      {/* Contenido principal — padding inferior para la barra de navegación */}
      <main className="flex-grow pt-6 pb-36 flex items-center justify-center z-10 w-full">
        <div className="w-full h-full flex flex-col justify-center">
          <Outlet />
        </div>
      </main>

      {/* Barra de navegación inferior con play integrado */}
      <Navbar />
      <PwaInstallModal />
    </div>
  );
}

function App() {
  return (
    <AudioProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="novedades" element={<Novedades />} />
            <Route path="sobrenosotros" element={<SobreNosotros />} />
          </Route>
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </AudioProvider>
  );
}

export default App;


