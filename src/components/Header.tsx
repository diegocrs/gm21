import React from 'react';
import { User, Sun, Moon, Settings, LogOut } from 'lucide-react';
import { UserData } from '../types';

interface HeaderProps {
    user: UserData;
    theme: string;
    toggleTheme: () => void;
    onOpenSettings: () => void;
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, theme, toggleTheme, onOpenSettings, onLogout }) => {
    return (
        <div className="sticky top-0 z-30 glass border-b-0 px-6 py-3 flex justify-between items-center transition-all shadow-sm backdrop-blur-md">
            <div className="flex items-center gap-3">
                {user.photoUrl ? (
                    <img src={user.photoUrl} alt="User" className="w-9 h-9 rounded-full border-2 border-white/50 dark:border-slate-700/50 object-cover shadow-md" />
                ) : (
                    <div className="w-9 h-9 rounded-full bg-white/50 dark:bg-slate-700/50 flex items-center justify-center backdrop-blur-sm border border-white/20">
                        <User size={16} className="text-slate-600 dark:text-slate-300" />
                    </div>
                )}
                <div className="text-sm">
                    <p className="text-slate-900 dark:text-white font-bold leading-tight drop-shadow-sm">Olá, {user.name.split(' ')[0]}</p>
                    <p className="text-slate-500 dark:text-slate-400 text-[10px] uppercase tracking-wider font-bold">Atleta</p>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={toggleTheme}
                    className="p-2 text-slate-600 dark:text-slate-300 hover:bg-white/40 dark:hover:bg-slate-800/40 rounded-full transition-colors backdrop-blur-sm"
                    title={theme === 'dark' ? 'Modo Claro' : 'Modo Escuro'}
                >
                    {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                <button
                    onClick={onOpenSettings}
                    className="p-2 text-slate-600 dark:text-slate-300 hover:bg-white/40 dark:hover:bg-slate-800/40 rounded-full transition-colors backdrop-blur-sm"
                    title="Configurações"
                >
                    <Settings size={18} />
                </button>
                <button
                    onClick={onLogout}
                    className="p-2 text-slate-600 dark:text-slate-300 hover:bg-white/40 dark:hover:bg-slate-800/40 rounded-full transition-colors backdrop-blur-sm"
                    title="Sair"
                >
                    <LogOut size={18} />
                </button>
            </div>
        </div>
    );
};

export default Header;
