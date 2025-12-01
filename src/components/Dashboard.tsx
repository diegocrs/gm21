import React from 'react';
import { Activity } from 'lucide-react';
import { UserData, WorkoutDay } from '../types';
import Header from './Header';
import WeekTabs from './WeekTabs';
import DaysGrid from './DaysGrid';
import BackgroundLiquid from './BackgroundLiquid';

interface DashboardProps {
    user: UserData;
    theme: string;
    toggleTheme: () => void;
    onOpenSettings: () => void;
    onLogout: () => void;
    activeWeek: number;
    setActiveWeek: (week: number) => void;
    isWeekUnlocked: (week: number) => boolean;
    currentWeekPlan: WorkoutDay[];
    completedDays: number[];
    setActiveDayId: (dayId: number) => void;
    percentage: number;
}

const Dashboard: React.FC<DashboardProps> = ({
    user,
    theme,
    toggleTheme,
    onOpenSettings,
    onLogout,
    activeWeek,
    setActiveWeek,
    isWeekUnlocked,
    currentWeekPlan,
    completedDays,
    setActiveDayId,
    percentage,
}) => {
    return (
        <>
            <BackgroundLiquid />
            <div className="min-h-screen text-slate-900 dark:text-white pb-12 transition-colors duration-300 animate-fade-in">
                <Header
                    user={user}
                    theme={theme}
                    toggleTheme={toggleTheme}
                    onOpenSettings={onOpenSettings}
                    onLogout={onLogout}
                />

                {/* Content */}
                <div className="pt-6 pb-8 px-6">
                    <div className="max-w-md mx-auto">
                        <h1 className="text-4xl font-extrabold mb-1 bg-gradient-to-r from-brand-600 to-purple-600 dark:from-brand-400 dark:to-purple-400 bg-clip-text text-transparent drop-shadow-sm filter">
                            Desafio GM21
                        </h1>
                        <p className="text-slate-600 dark:text-slate-300 text-sm mb-6 font-medium opacity-80">Seu corpo, sua melhor versão.</p>

                        {/* Glass Progress Card */}
                        <div className="glass-card rounded-2xl p-6 relative overflow-hidden transition-all group hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] animate-fade-in-up">
                            {/* Glossy reflection */}
                            <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-gradient-to-br from-white/20 to-transparent rotate-12 pointer-events-none opacity-50"></div>

                            <div className="flex justify-between items-end mb-4 relative z-10">
                                <div>
                                    <p className="text-slate-500 dark:text-slate-300 text-xs uppercase tracking-wider mb-1 font-bold">Seu Progresso</p>
                                    <div className="flex items-baseline gap-2">
                                        <p className="text-4xl font-black text-slate-900 dark:text-white drop-shadow-sm">{percentage}%</p>
                                        <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">concluído</p>
                                    </div>
                                </div>
                                <div className="p-3 bg-brand-500/20 dark:bg-brand-500/30 rounded-xl backdrop-blur-md shadow-inner border border-brand-500/10">
                                    <Activity className="text-brand-600 dark:text-brand-400" size={24} />
                                </div>
                            </div>
                            <div className="w-full bg-slate-200/50 dark:bg-slate-700/50 rounded-full h-3 overflow-hidden backdrop-blur-sm border border-white/10 dark:border-white/5">
                                <div
                                    className="bg-gradient-to-r from-brand-500 to-purple-500 h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(244,63,94,0.6)] relative"
                                    style={{ width: `${percentage}%` }}
                                >
                                    <div className="absolute top-0 right-0 bottom-0 w-full bg-gradient-to-b from-white/30 to-transparent"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <WeekTabs
                    activeWeek={activeWeek}
                    setActiveWeek={setActiveWeek}
                    isWeekUnlocked={isWeekUnlocked}
                />

                <DaysGrid
                    currentWeekPlan={currentWeekPlan}
                    completedDays={completedDays}
                    isWeekUnlocked={isWeekUnlocked}
                    setActiveDayId={setActiveDayId}
                />

                <div className="mt-12 text-center">
                    <div className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 text-xs glass px-4 py-1.5 rounded-full font-medium shadow-sm">
                        <span>⚡ Powered by Gemini AI</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
