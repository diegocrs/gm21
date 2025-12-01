import React, { useState } from 'react';
import { Loader2, Mail, ArrowRight } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (user: any) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailMode, setEmailMode] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleGoogleLogin = () => {
    setIsLoading(true);
    // Simulação de delay de rede e autenticação do Google
    setTimeout(() => {
      const mockUser = {
        name: "Usuário Fitness",
        email: "usuario@exemplo.com",
        photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
      };
      onLogin(mockUser);
      setIsLoading(false);
    }, 1500);
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.name) return;

    setIsLoading(true);
    setTimeout(() => {
      const mockUser = {
        name: formData.name,
        email: formData.email,
        // No photo for email login, App handles fallback
      };
      onLogin(mockUser);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden transition-colors duration-500">
      {/* Background Elements managed in App.tsx now, but we keep the container structure */}

      <div className="w-full max-w-md glass-card rounded-3xl p-8 shadow-2xl relative z-10 animate-fade-in-up">
        {/* Subtle top border highlight */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-70"></div>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-500/80 to-purple-600/80 backdrop-blur-md shadow-lg shadow-brand-500/30 mb-6 rotate-3 hover:rotate-6 transition-transform border border-white/20">
            <span className="text-4xl drop-shadow-md">🍑</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2 drop-shadow-sm">
            Desafio GM21
          </h1>
          <p className="text-slate-600 dark:text-slate-300 font-medium">
            Transforme seu corpo em 21 dias.
          </p>
        </div>

        {!emailMode ? (
          <div className="space-y-4">
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full bg-white/80 hover:bg-white dark:bg-slate-800/60 dark:hover:bg-slate-800/80 text-slate-900 dark:text-white font-semibold py-4 px-4 rounded-xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed group shadow-md border border-white/40 dark:border-white/10 backdrop-blur-sm"
            >
              {isLoading ? (
                <Loader2 size={20} className="animate-spin text-slate-600" />
              ) : (
                <>
                  <svg className="w-5 h-5 filter drop-shadow-sm" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  <span>Continuar com Google</span>
                </>
              )}
            </button>

            <button
              onClick={() => setEmailMode(true)}
              className="w-full bg-slate-800/80 hover:bg-slate-700/80 dark:bg-black/40 dark:hover:bg-black/60 text-white font-semibold py-4 px-4 rounded-xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] border border-slate-700/50 dark:border-white/10 backdrop-blur-sm shadow-md"
            >
              <Mail size={20} />
              <span>Entrar com Email</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleEmailLogin} className="space-y-4 animate-fade-in">
             <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1 ml-1 uppercase tracking-wide">Seu Nome</label>
              <input 
                type="text" 
                required
                className="w-full bg-white/50 dark:bg-slate-800/50 border border-white/40 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 backdrop-blur-sm shadow-inner"
                placeholder="Ex: Maria Silva"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1 ml-1 uppercase tracking-wide">Seu Email</label>
              <input 
                type="email" 
                required
                className="w-full bg-white/50 dark:bg-slate-800/50 border border-white/40 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 backdrop-blur-sm shadow-inner"
                placeholder="Ex: maria@email.com"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-brand-600 to-purple-600 hover:from-brand-500 hover:to-purple-500 text-white font-bold py-4 px-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-brand-500/30 mt-4 border border-white/10"
            >
              {isLoading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <>
                  <span>Entrar</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
            
            <button 
              type="button"
              onClick={() => setEmailMode(false)}
              className="w-full text-slate-600 dark:text-slate-400 text-sm py-2 hover:text-slate-900 dark:hover:text-white transition-colors font-medium"
            >
              Voltar
            </button>
          </form>
        )}

        <div className="mt-8 pt-6 border-t border-slate-200/50 dark:border-slate-700/50 text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Ao continuar, você concorda com os termos do Desafio GM21.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;