import { Link, useLocation } from 'react-router-dom';
import { Home, Newspaper, Info, Radio } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { name: 'Inicio', path: '/', icon: <Home className="w-6 h-6 mb-1" /> },
    { name: 'Novedades', path: '/novedades', icon: <Newspaper className="w-6 h-6 mb-1" /> },
    { name: 'Red', path: '/sobrenosotros', icon: <Info className="w-6 h-6 mb-1" /> }
  ];

  return (
    <div className="fixed top-6 left-0 w-full z-50 flex justify-center px-4">
      <nav className="bg-blue-950/80 backdrop-blur-xl border border-blue-500/20 rounded-full px-6 py-2 shadow-[0_10px_30px_rgba(0,0,50,0.8)] flex items-center justify-evenly w-full max-w-lg">
        
        {/* Tabs */}
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.name}
              to={link.path}
              className={`relative flex flex-col items-center justify-center px-6 py-2 rounded-2xl transition-all duration-300 ${
                isActive 
                  ? 'text-white scale-105' 
                  : 'text-blue-400/60 hover:text-white hover:bg-blue-500/10'
              }`}
            >
              {link.icon}
              <span className="text-[10px] font-semibold tracking-wider font-heading uppercase mt-1">{link.name}</span>
              {/* Active Indicator Line */}
              {isActive && (
                <span className="absolute -bottom-2 w-8 h-[3px] rounded-full bg-[var(--color-accent)] shadow-[0_0_10px_var(--color-accent)] transition-all"></span>
              )}
            </Link>
          )
        })}

      </nav>
    </div>
  );
};

export default Navbar;
