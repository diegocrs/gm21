import { useState, useEffect } from 'react';
import { UserProgress, UserData } from '../types';

const EMPTY_PROGRESS: UserProgress = { completedDays: [], completedExercises: {}, completionDates: {} };

export const useProgress = (user: UserData | null) => {
    const [progress, setProgress] = useState<UserProgress>(EMPTY_PROGRESS);

    useEffect(() => {
        if (user) {
            const savedProgress = localStorage.getItem(`gluteChallengeProgress_${user.email}`);
            if (savedProgress) {
                try {
                    setProgress(JSON.parse(savedProgress));
                } catch (e) {
                    console.error("Failed to parse progress", e);
                    setProgress(EMPTY_PROGRESS);
                }
            } else {
                setProgress(EMPTY_PROGRESS);
            }
        } else {
            setProgress(EMPTY_PROGRESS);
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            localStorage.setItem(`gluteChallengeProgress_${user.email}`, JSON.stringify(progress));
        }
    }, [progress, user]);

    const toggleExercise = (exerciseKey: string) => {
        setProgress(prev => ({
            ...prev,
            completedExercises: {
                ...prev.completedExercises,
                [exerciseKey]: !prev.completedExercises[exerciseKey]
            }
        }));
    };

    const getTodayDate = (): string => {
        const today = new Date();
        return today.toISOString().split('T')[0]; // YYYY-MM-DD
    };

    const hasCompletedWorkoutToday = (): boolean => {
        const today = getTodayDate();
        return Object.values(progress.completionDates).some(date => date === today);
    };

    const completeDay = (dayId: number): boolean => {
        // Check if already completed a workout today
        if (hasCompletedWorkoutToday()) {
            return false; // Cannot complete another workout today
        }

        if (!progress.completedDays.includes(dayId)) {
            const today = getTodayDate();
            setProgress(prev => ({
                ...prev,
                completedDays: [...prev.completedDays, dayId],
                completionDates: { ...prev.completionDates, [dayId]: today }
            }));
            return true;
        }
        return true; // Already completed, but allow (edge case)
    };

    const resetProgress = () => {
        if (!user) return;
        setProgress(EMPTY_PROGRESS);
        localStorage.setItem(`gluteChallengeProgress_${user.email}`, JSON.stringify(EMPTY_PROGRESS));
    };

    return { progress, toggleExercise, completeDay, resetProgress, hasCompletedWorkoutToday };
};
