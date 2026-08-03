import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Player from './components/Player';
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
      {/* Dynamic Background */}
      <div className="fixed inset-0 w-full h-full z-[-1] overflow-hidden bg-[#050505]">
        {STUDIO_IMAGES.map((img, i) => (
          <div 
            key={i}
            className="absolute inset-0 w-full h-full transition-opacity duration-3000 ease-in-out"
            style={{ 
              opacity: i === bgIndex ? 0.4 : 0,
              backgroundImage: `url(${img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ))}
        {/* Soft radial overlay for Premium feel */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#050505]/70 to-[#050505]"></div>
      </div>

      <Navbar />
      
      <main className="flex-grow pt-28 pb-32 flex items-center justify-center z-10 w-full">
        <div className="w-full h-full flex flex-col justify-center">
          <Outlet />
        </div>
      </main>
      
      <Player />
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


