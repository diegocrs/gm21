import React from 'react';
import { Activity, CalendarDays, ChevronRight } from 'lucide-react';
import { WorkoutDay } from '../types';

interface DaysGridProps {
    currentWeekPlan: WorkoutDay[];
    completedDays: number[];
    isWeekUnlocked: (week: number) => boolean;
    setActiveDayId: (dayId: number) => void;
}

const DaysGrid: React.FC<DaysGridProps> = ({ currentWeekPlan, completedDays, isWeekUnlocked, setActiveDayId }) => {
    return (
        <div className="max-w-md mx-auto px-4 space-y-3">
            {currentWeekPlan.map((day, index) => {
                const isCompleted = completedDays.includes(day.id);

                // Logic for unlocking:
                // 1. First day of the week is always unlocked (if week is unlocked, which is true now)
                // 2. Subsequent days require the previous day to be completed
                const isFirstDayOfWeek = index === 0;
                const previousDayCompleted = completedDays.includes(day.id - 1);
                const isUnlocked = isWeekUnlocked(day.week) && (isFirstDayOfWeek || previousDayCompleted);

                const isCurrent = !isCompleted && isUnlocked;

                return (
                    <button
                        key={day.id}
                        onClick={() => isUnlocked && setActiveDayId(day.id)}
                        disabled={!isUnlocked}
                        style={{ animationDelay: `${index * 100}ms` }}
                        className={`
              w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden group animate-fade-in-up
              ${isCompleted
                                ? 'glass opacity-60 hover:opacity-80'
                                : isCurrent
                                    ? 'glass-card border-brand-500/30 dark:border-brand-500/30 shadow-[0_0_20px_rgba(244,63,94,0.15)] scale-[1.02] hover:scale-[1.03]'
                                    : isUnlocked
                                        ? 'glass hover:bg-white/40 dark:hover:bg-slate-800/40'
                                        : 'glass opacity-40 cursor-not-allowed grayscale'
                            }
            `}
                    >
                        {/* Shiny highlight effect on hover (only if unlocked) */}
                        {isUnlocked && (
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                        )}

                        {isCurrent && (
                            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-brand-500 to-purple-500"></div>
                        )}

                        <div className="flex items-center justify-between relative z-10">
                            <div className="flex-1 pr-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className={`
                    text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide backdrop-blur-md shadow-sm border
                    ${isCurrent
                                            ? 'bg-brand-500 text-white border-brand-400'
                                            : 'bg-slate-200/50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 border-white/10'
                                        }
                  `}>
                                        Dia {day.id}
                                    </span>
                                    {day.isRest && (
                                        <span className="text-[10px] bg-emerald-100/80 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-200/50 dark:border-emerald-800/50 font-semibold backdrop-blur-md">
                                            Descanso
                                        </span>
                                    )}
                                    {!isUnlocked && (
                                        <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700 font-semibold flex items-center gap-1">
                                            Bloqueado
                                        </span>
                                    )}
                                </div>
                                <h3 className={`text-base sm:text-lg font-bold ${isCompleted ? 'text-slate-500 dark:text-slate-500 line-through decoration-slate-400' : 'text-slate-900 dark:text-white'}`}>
                                    {day.title}
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-0.5 font-medium opacity-80">{day.focus}</p>
                            </div>

                            <div className="flex-shrink-0">
                                {isCompleted ? (
                                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30 backdrop-blur-sm shadow-[0_0_10px_rgba(34,197,94,0.2)]">
                                        <Activity size={18} className="text-green-600 dark:text-green-400" />
                                    </div>
                                ) : isCurrent ? (
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg shadow-brand-500/40 animate-pulse-slow">
                                        <ChevronRight size={22} className="text-white ml-0.5" />
                                    </div>
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-slate-200/50 dark:bg-slate-700/50 flex items-center justify-center border border-white/20">
                                        <CalendarDays size={18} className="text-slate-400 dark:text-slate-500" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </button>
                );
            })}
        </div>
    );
};

export default DaysGrid;
