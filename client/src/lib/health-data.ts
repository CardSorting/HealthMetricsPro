export interface HealthEntry {
  id: string;
  date: string;
  age: number;
  height: number;
  weight: number;
  gender: 'male' | 'female';
  activityLevel: number;
  isMetric: boolean;
  metrics: {
    bmi: number;
    bmiCategory: string;
    bmr: number;
    dailyCalories: number;
    loseCalories: number;
    gainCalories: number;
    idealWeightMin: number;
    idealWeightMax: number;
  };
}

export interface HealthSession {
  entries: HealthEntry[];
  currentEntry?: HealthEntry;
}