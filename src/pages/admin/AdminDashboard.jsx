import { useState, useEffect } from 'react';
import { db, auth } from '../../services/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Save, LogOut, Radio, Loader2, Link as LinkIcon } from 'lucide-react';

const AdminDashboard = () => {
  const [streamUrl, setStreamUrl] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = auth.onAuthStateChanged(user => {
      if (!user) {
        navigate('/admin/login');
      } else {
        loadConfig();
      }
    });
    return () => checkAuth();
  }, [navigate]);

  const loadConfig = async () => {
    try {
      const docRef = doc(db, 'jem_config', 'stream');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setStreamUrl(data.url || '');
        setIsActive(data.activo !== false);
      } else {
        await setDoc(docRef, {
          url: '',
          nombre: 'Juan Escobar Multimedia',
          activo: true
        });
      }
    } catch (error) {
      console.error(error);
      setMessage({ text: 'Error al cargar configuración', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ text: '', type: '' });
    
    try {
      const docRef = doc(db, 'jem_config', 'stream');
      await setDoc(docRef, {
        url: streamUrl,
        nombre: 'Juan Escobar Multimedia',
        activo: isActive
      }, { merge: true });
      
      setMessage({ text: 'Configuración guardada correctamente.', type: 'success' });
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    } catch (error) {
      console.error(error);
      setMessage({ text: 'Error al guardar.', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  if (loading) {
    return <div className="flex justify-center items-center h-[50vh]"><Loader2 className="w-8 h-8 animate-spin text-[var(--color-accent)]" /></div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold flex items-center gap-3">
            <Radio className="text-[var(--color-accent)] w-8 h-8" />
            Panel de Administración
          </h1>
          <p className="text-[var(--color-text-secondary)] mt-1">Gestiona el enlace de transmisión en vivo.</p>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors border border-red-500/20"
        >
          <LogOut size={18} /> Cerrar Sesión
        </button>
      </div>

      <div className="bg-[var(--color-surface)] border border-gray-700 rounded-3xl p-6 md:p-8 shadow-xl">
        <div className="mb-6 border-b border-gray-700 pb-4">
          <h2 className="text-xl font-heading font-semibold text-[var(--color-text-primary)]">Configuración del Reproductor</h2>
        </div>

        {message.text && (
          <div className={`px-4 py-3 rounded-xl mb-6 text-sm ${message.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/30' : 'bg-red-500/10 text-red-400 border border-red-500/30'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">URL del Stream (Icecast/Shoutcast/Audio en vivo)</label>
            <div className="relative">
              <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="url"
                value={streamUrl}
                onChange={(e) => setStreamUrl(e.target.value)}
                className="w-full bg-[var(--color-primary)] border border-gray-600 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all font-mono text-sm"
                placeholder="https://ip:puerto/stream"
                required
              />
            </div>
            <p className="text-xs text-gray-400 mt-2">Esta URL se actualizará instantáneamente para todos los oyentes conectados.</p>
          </div>

          <div className="flex items-center gap-3 p-4 bg-[var(--color-primary)] rounded-xl border border-gray-700">
            <input
              type="checkbox"
              id="activeCheckbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="w-5 h-5 accent-[var(--color-accent)] rounded focus:ring-[var(--color-accent)] cursor-pointer"
            />
            <label htmlFor="activeCheckbox" className="font-medium text-white cursor-pointer select-none">
              Emisora EN VIVO (Activa el reproductor)
            </label>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 bg-[var(--color-accent)] text-[var(--color-primary)] font-bold rounded-xl hover:bg-[var(--color-accent-alt)] hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-75"
            >
              {saving ? <Loader2 className="animate-spin w-5 h-5" /> : <Save className="w-5 h-5" />}
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;
