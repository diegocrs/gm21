import { useState, useEffect } from 'react';
import { UserProgress, UserData } from '../types';

const EMPTY_PROGRESS: UserProgress = { completedDays: [], completedExercises: {} };

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

    const completeDay = (dayId: number) => {
        if (!progress.completedDays.includes(dayId)) {
            setProgress(prev => ({
                ...prev,
                completedDays: [...prev.completedDays, dayId]
            }));
        }
    };

    const resetProgress = () => {
        if (!user) return;
        setProgress(EMPTY_PROGRESS);
        localStorage.setItem(`gluteChallengeProgress_${user.email}`, JSON.stringify(EMPTY_PROGRESS));
    };

    return { progress, toggleExercise, completeDay, resetProgress };
};
