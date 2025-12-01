import React from 'react';
import { Lock } from 'lucide-react';

interface WeekTabsProps {
    activeWeek: number;
    setActiveWeek: (week: number) => void;
    isWeekUnlocked: (week: number) => boolean;
}

const WeekTabs: React.FC<WeekTabsProps> = ({ activeWeek, setActiveWeek, isWeekUnlocked }) => {
    return (
        <div className="sticky top-[60px] z-20 py-2 mb-6">
            <div className="max-w-md mx-auto px-4">
                <div className="glass rounded-xl p-1.5 flex justify-between gap-1 shadow-lg backdrop-blur-xl">
                    {[1, 2, 3].map(week => {
                        const unlocked = isWeekUnlocked(week);
                        const isActive = activeWeek === week;
                        return (
                            <button
                                key={week}
                                onClick={() => unlocked && setActiveWeek(week)}
                                disabled={!unlocked}
                                className={`
                  flex-1 py-2.5 px-2 rounded-lg text-xs sm:text-sm font-bold transition-all relative flex items-center justify-center gap-1.5
                  ${isActive
                                        ? 'text-brand-600 dark:text-white bg-white/80 dark:bg-slate-700/80 shadow-sm border border-white/40 dark:border-white/10'
                                        : unlocked
                                            ? 'text-slate-600 dark:text-slate-400 hover:bg-white/30 dark:hover:bg-white/5'
                                            : 'text-slate-400 dark:text-slate-600 opacity-50 cursor-not-allowed'
                                    }
                `}
                            >
                                {!unlocked && <Lock size={12} />}
                                Semana {week}
                                {isActive && (
                                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand-500 rounded-full shadow-[0_0_5px_#f43f5e]"></span>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default WeekTabs;
