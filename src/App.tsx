import React, { useState, useMemo } from 'react';
import { WORKOUT_PLAN } from './constants';
import WorkoutCard from './components/WorkoutCard';
import LoginScreen from './components/LoginScreen';
import SettingsScreen from './components/SettingsScreen';
import BackgroundLiquid from './components/BackgroundLiquid';
import Dashboard from './components/Dashboard';
import { useAuth } from './hooks/useAuth';
import { useTheme } from './hooks/useTheme';
import { useProgress } from './hooks/useProgress';

const TOTAL_DAYS = 21;

const App: React.FC = () => {
  const { user, loading, login, logout, updateUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { progress, toggleExercise, completeDay, resetProgress } = useProgress(user);

  const [activeDayId, setActiveDayId] = useState<number | null>(null);
  const [activeWeek, setActiveWeek] = useState<number>(1);
  const [showSettings, setShowSettings] = useState(false);

  // --- Helpers ---
  const isWeekUnlocked = (weekNum: number) => {
    return true;
  };

  const handleCompleteDay = (dayId: number) => {
    completeDay(dayId);
    setTimeout(() => {
      setActiveDayId(null);
    }, 1500);
  };

  const handleLogout = () => {
    logout();
    setShowSettings(false);
  };

  const percentage = Math.round((progress.completedDays.length / TOTAL_DAYS) * 100);

  const currentWeekPlan = useMemo(() =>
    WORKOUT_PLAN.filter(d => d.week === activeWeek),
    [activeWeek]);

  // --- Render ---

  // 1. Loading Screen
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center text-brand-500 animate-pulse bg-slate-50 dark:bg-slate-950">
      Carregando App...
    </div>
  );

  // 2. Login Screen
  if (!user) {
    return (
      <>
        <BackgroundLiquid />
        <LoginScreen onLogin={login} />
      </>
    );
  }

  // 3. Settings Screen
  if (showSettings) {
    return (
      <>
        <BackgroundLiquid />
        <SettingsScreen
          user={user}
          onUpdateUser={updateUser}
          onResetProgress={resetProgress}
          onClose={() => setShowSettings(false)}
        />
      </>
    );
  }

  // 4. Daily Detail View
  if (activeDayId !== null) {
    const dayData = WORKOUT_PLAN.find(d => d.id === activeDayId);
    if (!dayData) return null;

    return (
      <>
        <BackgroundLiquid />
        <div className="min-h-screen p-4 transition-colors duration-300">
          <WorkoutCard
            day={dayData}
            completedExercises={progress.completedExercises}
            onToggleExercise={toggleExercise}
            onCompleteDay={() => handleCompleteDay(activeDayId)}
            isDayCompleted={progress.completedDays.includes(activeDayId)}
            onBack={() => setActiveDayId(null)}
          />
        </div>
      </>
    );
  }

  // 5. Dashboard View (Main)
  return (
    <Dashboard
      user={user}
      theme={theme}
      toggleTheme={toggleTheme}
      onOpenSettings={() => setShowSettings(true)}
      onLogout={handleLogout}
      activeWeek={activeWeek}
      setActiveWeek={setActiveWeek}
      isWeekUnlocked={isWeekUnlocked}
      currentWeekPlan={currentWeekPlan}
      completedDays={progress.completedDays}
      setActiveDayId={setActiveDayId}
      percentage={percentage}
    />
  );
};

export default App;