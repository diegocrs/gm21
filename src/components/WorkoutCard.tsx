import React, { useState } from 'react';
import { DayPlan } from '../types';
import { CheckCircle2, Circle, Trophy, Play, Video, Bot, Loader2, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import { getExerciseTip } from '../services/geminiService';

interface WorkoutCardProps {
  day: DayPlan;
  completedExercises: Record<string, boolean>;
  onToggleExercise: (exerciseKey: string) => void;
  onCompleteDay: () => void;
  isDayCompleted: boolean;
  onBack: () => void;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ 
  day, 
  completedExercises, 
  onToggleExercise, 
  onCompleteDay,
  isDayCompleted,
  onBack
}) => {
  const [loadingTip, setLoadingTip] = useState<string | null>(null);
  const [tips, setTips] = useState<Record<string, string>>({});

  const allExercisesCompleted = day.exercises.every((_, index) => 
    completedExercises[`${day.id}-${index}`]
  );

  const handleFinishDay = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#a855f7', '#ec4899']
    });
    onCompleteDay();
  };

  const fetchTip = async (exerciseName: string, index: number) => {
    const key = `${day.id}-${index}`;
    if (tips[key]) return; // Already fetched

    setLoadingTip(key);
    const tip = await getExerciseTip(exerciseName);
    setTips(prev => ({ ...prev, [key]: tip }));
    setLoadingTip(null);
  };

  return (
    <div className="w-full max-w-3xl mx-auto pb-20 animate-fade-in text-slate-900 dark:text-white">
      {/* Header Action */}
      <button 
        onClick={onBack} 
        className="glass hover:bg-white/40 dark:hover:bg-slate-800/40 text-slate-700 dark:text-white mb-6 text-sm px-4 py-2 rounded-full flex items-center gap-2 transition-all font-medium shadow-sm w-fit backdrop-blur-md"
      >
        <ArrowLeft size={16} /> Voltar
      </button>

      {/* Main Title Card (Glass) */}
      <div className="glass-card rounded-3xl p-8 mb-8 relative overflow-hidden transition-colors">
        <div className="absolute top-0 right-0 p-4 opacity-10 dark:opacity-10 text-slate-900 dark:text-white pointer-events-none">
          <Trophy size={140} className="rotate-12" />
        </div>
        
        <div className="relative z-10">
            <span className="inline-block px-3 py-1 rounded-full bg-brand-500/20 text-brand-600 dark:text-brand-300 text-xs font-bold uppercase tracking-wider mb-2 border border-brand-500/20">
              Dia {day.id}
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-3 tracking-tight drop-shadow-sm">{day.title}</h1>
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <span className="w-2 h-2 rounded-full bg-brand-500 shadow-[0_0_8px_#f43f5e]"></span>
              <p className="font-medium">Foco: {day.focus}</p>
            </div>
        </div>
      </div>

      {day.videoUrl && (
        <div className="mb-8 rounded-2xl overflow-hidden border border-white/20 shadow-2xl aspect-video bg-black relative group">
          <div className="absolute inset-0 bg-brand-500/10 pointer-events-none group-hover:bg-transparent transition-colors"></div>
          <iframe 
            width="100%" 
            height="100%" 
            src={day.videoUrl} 
            title="Workout Video" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            className="relative z-10"
          ></iframe>
        </div>
      )}

      {day.isRest && !day.exercises.length ? (
        <div className="glass rounded-3xl p-10 text-center border-white/40 dark:border-white/10 shadow-lg">
          <div className="w-20 h-20 bg-emerald-100/50 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 backdrop-blur-sm shadow-[0_0_20px_rgba(16,185,129,0.2)]">
            <CheckCircle2 size={40} />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Descanso Merecido!</h3>
          <p className="text-slate-600 dark:text-slate-300 mb-8 max-w-md mx-auto leading-relaxed">{day.description}</p>
          {!isDayCompleted ? (
            <button 
              onClick={handleFinishDay}
              className="px-10 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-full font-bold transition-all transform hover:scale-105 shadow-lg shadow-emerald-500/30 border border-white/20"
            >
              Marcar dia como Concluído
            </button>
          ) : (
             <div className="px-8 py-3 bg-green-100/80 dark:bg-green-900/40 text-green-800 dark:text-green-300 rounded-full inline-flex items-center gap-2 border border-green-200/50 dark:border-green-800/50 backdrop-blur-md font-semibold">
                <CheckCircle2 size={20} />
                Concluído
             </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
           {day.description && (
            <div className="glass p-4 rounded-xl mb-6 text-slate-600 dark:text-slate-300 italic flex gap-3 items-start border-l-4 border-l-brand-500">
               <span className="text-2xl">💡</span>
               <p>{day.description}</p>
            </div>
          )}
          
          {day.exercises.map((exercise, index) => {
            const exerciseKey = `${day.id}-${index}`;
            const isCompleted = completedExercises[exerciseKey];
            const hasTip = !!tips[exerciseKey];

            return (
              <div 
                key={index}
                style={{ transitionDelay: `${index * 50}ms` }}
                className={`group relative p-5 rounded-2xl border transition-all duration-500 ${
                  isCompleted 
                    ? 'bg-slate-100/40 dark:bg-slate-900/40 border-slate-200/50 dark:border-slate-800/50 backdrop-blur-sm opacity-60 grayscale-[0.5]' 
                    : 'glass border-white/40 dark:border-white/10 shadow-sm hover:shadow-md hover:scale-[1.01] hover:bg-white/40 dark:hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-start gap-4">
                  <button 
                    onClick={() => onToggleExercise(exerciseKey)}
                    className={`mt-1 flex-shrink-0 transition-all duration-300 transform active:scale-90 ${
                      isCompleted ? 'text-green-500 rotate-0' : 'text-slate-300 dark:text-slate-600 hover:text-brand-500 -rotate-90'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 size={32} className="fill-green-500/10 filter drop-shadow-sm" />
                    ) : (
                      <Circle size={32} />
                    )}
                  </button>
                  
                  <div className="flex-grow">
                    <h3 className={`text-xl font-bold mb-2 ${isCompleted ? 'text-slate-500 line-through decoration-2 decoration-slate-300' : 'text-slate-900 dark:text-white'}`}>
                      {exercise.name}
                    </h3>
                    <div className="flex flex-wrap gap-3 text-sm font-medium mb-3">
                      {exercise.sets && (
                        <span className="bg-slate-100/80 dark:bg-slate-800/80 px-3 py-1 rounded-md text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-sm">
                          {exercise.sets} Séries
                        </span>
                      )}
                      {exercise.reps && (
                        <span className="bg-slate-100/80 dark:bg-slate-800/80 px-3 py-1 rounded-md text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-sm">
                          {exercise.reps} Reps
                        </span>
                      )}
                    </div>
                    {exercise.note && (
                      <p className="text-brand-600 dark:text-brand-400 text-sm italic bg-brand-50/50 dark:bg-brand-900/10 p-2 rounded-lg border border-brand-100 dark:border-brand-900/30 inline-block mb-2">
                        ⚠️ {exercise.note}
                      </p>
                    )}

                    {/* AI Tip Section */}
                    <div className="mt-2">
                       {hasTip ? (
                         <div className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-100 dark:border-blue-800/50 rounded-xl p-4 text-sm text-blue-800 dark:text-blue-200 animate-fade-in flex gap-3 shadow-inner">
                            <Bot size={18} className="mt-0.5 flex-shrink-0 text-blue-500" />
                            <p className="leading-relaxed">{tips[exerciseKey]}</p>
                         </div>
                       ) : (
                         <button 
                          onClick={() => fetchTip(exercise.name, index)}
                          disabled={loadingTip === exerciseKey}
                          className="text-xs font-semibold text-slate-500 hover:text-brand-600 dark:hover:text-brand-400 flex items-center gap-1.5 transition-colors px-3 py-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 w-fit"
                         >
                            {loadingTip === exerciseKey ? <Loader2 size={12} className="animate-spin" /> : <Bot size={14} />}
                            {loadingTip === exerciseKey ? "IA está pensando..." : "Dica do Personal IA"}
                         </button>
                       )}
                    </div>

                  </div>
                </div>
              </div>
            );
          })}

          <div className="sticky bottom-6 mt-8 flex justify-center z-10 pt-4">
            {!isDayCompleted ? (
              <button 
                onClick={handleFinishDay}
                disabled={!allExercisesCompleted}
                className={`
                  px-8 py-4 rounded-full font-bold shadow-2xl flex items-center gap-3 transition-all transform border
                  ${allExercisesCompleted 
                    ? 'bg-gradient-to-r from-brand-600 to-purple-600 text-white hover:scale-105 hover:shadow-brand-500/40 border-white/20' 
                    : 'glass text-slate-400 cursor-not-allowed border-slate-200 dark:border-slate-700'}
                `}
              >
                <Trophy size={22} className={allExercisesCompleted ? "animate-bounce" : ""} />
                {allExercisesCompleted ? 'Finalizar Treino de Hoje!' : 'Complete todos os exercícios'}
              </button>
            ) : (
              <div className="px-10 py-4 bg-gradient-to-r from-emerald-500/90 to-teal-500/90 backdrop-blur-xl text-white rounded-full font-bold shadow-2xl shadow-emerald-500/30 flex items-center gap-2 border border-white/20 animate-fade-in-up">
                <CheckCircle2 size={24} />
                Treino Concluído!
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutCard;