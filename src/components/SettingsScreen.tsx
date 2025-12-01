import React, { useState, useRef } from 'react';
import { UserData } from '../types';
import { Camera, Save, Trash2, X, AlertTriangle, Lock, User, ArrowLeft } from 'lucide-react';

interface SettingsScreenProps {
  user: UserData;
  onUpdateUser: (updatedUser: UserData) => void;
  onResetProgress: () => void;
  onClose: () => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ user, onUpdateUser, onResetProgress, onClose }) => {
  const [formData, setFormData] = useState<UserData>({ ...user });
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, photoUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would validate the password change here
    onUpdateUser(formData);
    onClose();
  };

  return (
    <div className="min-h-screen text-slate-900 dark:text-white pb-12 animate-fade-in transition-colors">
      {/* Glass Header */}
      <div className="sticky top-0 z-20 glass border-b-0 px-6 py-4 flex items-center gap-4 backdrop-blur-lg shadow-sm">
        <button onClick={onClose} className="p-2 -ml-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-full hover:bg-white/40 dark:hover:bg-slate-800/40 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">Configurações</h1>
      </div>

      <div className="max-w-md mx-auto p-6 space-y-8">
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Profile Picture Section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/50 dark:border-slate-700/50 shadow-xl group-hover:border-brand-500 transition-colors bg-slate-100 dark:bg-slate-800 glass relative z-10">
                {formData.photoUrl ? (
                  <img src={formData.photoUrl} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User size={48} className="text-slate-400 dark:text-slate-500" />
                  </div>
                )}
              </div>
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 backdrop-blur-sm">
                <Camera size={28} className="text-white drop-shadow-md" />
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleImageUpload}
              />
            </div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Toque para alterar a foto</p>
          </div>

          {/* Personal Info */}
          <div className="glass-card rounded-2xl p-6 space-y-5">
            <h2 className="text-sm font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider mb-2 border-b border-slate-200/50 dark:border-slate-700/50 pb-2">
              Dados Pessoais
            </h2>
            
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 ml-1 uppercase">Nome de Exibição</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full bg-white/50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-700/50 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all backdrop-blur-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 ml-1 uppercase">Email (somente leitura)</label>
              <input 
                type="email" 
                value={formData.email}
                readOnly
                className="w-full bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 rounded-xl px-4 py-3 text-slate-500 cursor-not-allowed backdrop-blur-sm"
              />
            </div>
          </div>

          {/* Password Section (Simulated) */}
          <div className="glass-card rounded-2xl p-6 space-y-5">
            <h2 className="text-sm font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider mb-2 border-b border-slate-200/50 dark:border-slate-700/50 pb-2">
              Segurança
            </h2>
            
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 ml-1 uppercase">Nova Senha</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-white/50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-700/50 rounded-xl pl-10 pr-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 backdrop-blur-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 ml-1 uppercase">Confirmar Senha</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  className="w-full bg-white/50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-700/50 rounded-xl pl-10 pr-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 backdrop-blur-sm"
                />
              </div>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-brand-600 to-purple-600 hover:from-brand-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-brand-500/20 transition-all active:scale-95 border border-white/20"
          >
            <Save size={20} />
            Salvar Alterações
          </button>
        </form>

        {/* Danger Zone */}
        <div className="pt-8 mt-8 border-t border-slate-200/30 dark:border-slate-700/30">
          <h2 className="text-sm font-bold text-red-500 uppercase tracking-wider mb-4 pl-1">
            Zona de Perigo
          </h2>
          
          {!showResetConfirm ? (
            <button 
              onClick={() => setShowResetConfirm(true)}
              className="w-full border border-red-200/50 dark:border-red-900/50 bg-red-50/50 dark:bg-red-950/20 text-red-600 dark:text-red-400 hover:bg-red-100/50 dark:hover:bg-red-950/40 font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all backdrop-blur-sm"
            >
              <Trash2 size={18} />
              Reiniciar Todos os Treinos
            </button>
          ) : (
            <div className="glass-card bg-red-50/50 dark:bg-red-950/30 border-red-200/50 dark:border-red-900/50 rounded-xl p-6 animate-fade-in shadow-lg">
              <div className="flex items-center gap-3 text-red-600 dark:text-red-400 mb-4">
                <AlertTriangle size={28} className="flex-shrink-0" />
                <p className="text-sm font-bold leading-tight">
                  Tem certeza? Isso apagará todo o seu histórico de progresso permanentemente.
                </p>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 bg-white/60 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-white py-3 rounded-xl text-sm font-bold transition-colors border border-slate-200/50 dark:border-slate-700"
                >
                  Cancelar
                </button>
                <button 
                  onClick={() => {
                    onResetProgress();
                    setShowResetConfirm(false);
                    onClose();
                  }}
                  className="flex-1 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white py-3 rounded-xl text-sm font-bold transition-all shadow-md shadow-red-500/20"
                >
                  Sim, Reiniciar
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default SettingsScreen;