import { MessageCircle, Globe, Headphones, Lightbulb, TrendingUp, DollarSign, BookOpen, Music } from 'lucide-react';

const FacebookIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const YoutubeIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

const SobreNosotros = () => {
  const tBento = [
    { title: "Grandes Pensadores", icon: <Headphones size={24}/> },
    { title: "Ideas de Negocios", icon: <Lightbulb size={24}/> },
    { title: "Emprendedores", icon: <TrendingUp size={24}/> },
    { title: "Generar Ingresos", icon: <DollarSign size={24}/> },
    { title: "Inglés Americano", icon: <BookOpen size={24}/> },
    { title: "Historia Musical", icon: <Music size={24}/> }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-16 pb-32">
      
      {/* BENTO GRID LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* BENTO ITEM 1: Profile */}
        <div className="col-span-1 md:col-span-1 bg-blue-950/40 backdrop-blur-md rounded-[2.5rem] border border-blue-500/20 p-8 flex flex-col items-center justify-center text-center shadow-[0_10px_30px_rgba(0,0,50,0.5)] group hover:border-blue-400/50 hover:shadow-[0_0_30px_rgba(37,99,235,0.2)] transition-all duration-500">
           
           <div className="relative w-40 h-40 mb-6">
             <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-xl group-hover:scale-125 transition-transform duration-700"></div>
             <img src="/jem_perfil.png" alt="Juan Escobar" className="relative z-10 w-full h-full object-cover rounded-full border-2 border-blue-500/30 shadow-2xl" />
           </div>

           <h2 className="text-3xl font-heading font-bold text-white mb-1">JUAN ESCOBAR</h2>
           <p className="text-blue-300 font-bold tracking-[0.2em] uppercase text-xs mb-6">Director General</p>

           {/* Social Pills */}
           <div className="flex flex-wrap justify-center gap-3 w-full">
              <a href="#" className="flex-1 flex justify-center py-3 bg-blue-900/30 hover:bg-[#1877F2]/20 border border-blue-500/10 rounded-2xl text-blue-300/70 hover:text-[#1877F2] transition-colors">
                <FacebookIcon size={18} />
              </a>
              <a href="#" className="flex-1 flex justify-center py-3 bg-blue-900/30 hover:bg-[#FF0000]/20 border border-blue-500/10 rounded-2xl text-blue-300/70 hover:text-[#FF0000] transition-colors">
                <YoutubeIcon size={18} />
              </a>
              <a href="#" className="flex-1 flex justify-center py-3 bg-blue-900/30 hover:bg-[#25D366]/20 border border-blue-500/10 rounded-2xl text-blue-300/70 hover:text-[#25D366] transition-colors">
                <MessageCircle size={18} />
              </a>
              <a href="#" className="flex-1 flex justify-center py-3 bg-blue-900/30 hover:bg-[var(--color-accent)]/20 border border-blue-500/10 rounded-2xl text-blue-300/70 hover:text-[var(--color-accent)] transition-colors">
                <Globe size={18} />
              </a>
           </div>
        </div>

        {/* RIGHT COLUMN GRID */}
        <div className="col-span-1 md:col-span-2 flex flex-col gap-6">

           {/* BENTO ITEM 2: Mission */}
           <div className="flex-1 bg-blue-950/40 backdrop-blur-md rounded-[2.5rem] border border-blue-500/20 p-8 md:p-12 shadow-[0_10px_30px_rgba(0,0,50,0.5)] hover:border-blue-400/40 hover:shadow-[0_0_30px_rgba(37,99,235,0.2)] transition-all duration-500 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/15 rounded-full blur-[80px] -mr-10 -mt-10 pointer-events-none"></div>
              
              <h1 className="text-4xl md:text-5xl font-black text-white italic tracking-wide uppercase mb-6 drop-shadow-lg">
                J.E. <span className="text-[var(--color-accent)]">MULTIMEDIA</span>
              </h1>
              
              <p className="text-lg md:text-xl text-blue-100/80 font-light leading-relaxed max-w-2xl mt-4">
                 Radio Online <span className="text-[var(--color-accent)] font-semibold">con Propósitos</span>. Somos el principal canal y portal digital dedicado plenamente a brindarte contenidos enriquecedores. 
                 <br/><br/>
                 Conectamos conocimientos generales, la realidad nacional, noticias vitales, la curiosidad de grandes pensadores y auténticas voces ciudadanas, con la convicción del poder que tiene la información de valor para transformar nuestra sociedad y cultivar el futuro.
              </p>
           </div>

           {/* BENTO ITEM 3: Mini Widgets */}
           <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {tBento.map((item, i) => (
                 <div key={i} className="bg-blue-950/30 backdrop-blur-md border border-blue-500/15 rounded-[1.5rem] p-5 flex flex-col items-center justify-center text-center shadow-lg hover:bg-blue-800/20 hover:border-blue-400/40 hover:shadow-[0_0_15px_rgba(37,99,235,0.2)] transition-all duration-300 group">
                    <div className="mb-3 p-3 rounded-full bg-blue-900/50 group-hover:bg-[var(--color-accent)] group-hover:text-white transition-colors text-[var(--color-accent)]">
                      {item.icon}
                    </div>
                    <span className="text-blue-100/80 font-medium text-xs md:text-sm">{item.title}</span>
                 </div>
              ))}
           </div>
        
        </div>

      </div>
    </div>
  );
};

export default SobreNosotros;
