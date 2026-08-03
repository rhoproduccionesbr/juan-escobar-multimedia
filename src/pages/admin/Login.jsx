import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebase';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Loader2 } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin');
    } catch (err) {
      console.error(err);
      setError('Credenciales inválidas. Verifica tu correo y contraseña.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)] px-4">
      <div className="w-full max-w-md bg-[var(--color-surface)]/80 backdrop-blur-md rounded-3xl p-8 border border-[var(--color-surface)] shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[var(--color-primary)] rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[var(--color-accent)]/30">
            <Lock className="h-8 w-8 text-[var(--color-accent)]" />
          </div>
          <h2 className="text-2xl font-heading font-bold text-[var(--color-text-primary)]">Acceso Admin</h2>
          <p className="text-[var(--color-text-secondary)] text-sm mt-1">Ingresa para gestionar Juan Escobar Multimedia</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-xl mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Correo Electrónico</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[var(--color-primary)] border border-gray-700 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-colors"
                placeholder="admin@ejemplo.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[var(--color-primary)] border border-gray-700 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-alt)] text-[var(--color-primary)] font-bold py-3 rounded-xl hover:shadow-[0_0_15px_rgba(226,181,63,0.4)] transition-all flex items-center justify-center disabled:opacity-70"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Ingresar al Panel'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
