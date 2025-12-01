export interface Exercise {
  name: string;
  sets?: string;
  reps?: string;
  note?: string;
}

export interface DayPlan {
  id: number;
  week: number;
  title: string;
  focus: string;
  isRest: boolean;
  exercises: Exercise[];
  videoUrl?: string; // For Yoga or specific tutorials
  description?: string;
}

export type WorkoutDay = DayPlan;

export interface UserProgress {
  completedDays: number[]; // Array of Day IDs completed
  completedExercises: Record<string, boolean>; // Key: "dayId-exerciseIndex", Value: boolean
}

export interface UserData {
  name: string;
  email: string;
  photoUrl?: string;
}