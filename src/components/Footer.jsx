const Footer = () => {
  return (
    <footer className="bg-[var(--color-primary)] border-t border-[var(--color-surface)] py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <img src="/logo.png" alt="Logo" className="h-12 w-auto mx-auto mb-4 opacity-70" />
        <p className="text-[var(--color-text-secondary)] text-sm mb-2">
          © {new Date().getFullYear()} Juan Escobar Multimedia. Todos los derechos reservados.
        </p>
        <p className="text-[var(--color-text-secondary)] text-xs">
          Diseño y Desarrollo por <span className="text-[var(--color-accent)] font-semibold">RHO Producciones</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
