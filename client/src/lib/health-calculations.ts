export interface HealthMetrics {
  bmi: number;
  bmiCategory: string;
  bmiClass: string;
  bmr: number;
  dailyCalories: number;
  loseCalories: number;
  gainCalories: number;
  idealWeightMin: number;
  idealWeightMax: number;
  weightStatus: string;
}

export const calculateBMI = (weightKg: number, heightCm: number): number => {
  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
};

export const getBMICategory = (bmi: number): { text: string; class: string } => {
  if (bmi < 18.5) return { text: 'Underweight', class: 'bmi-underweight' };
  if (bmi < 25) return { text: 'Normal weight', class: 'bmi-normal' };
  if (bmi < 30) return { text: 'Overweight', class: 'bmi-overweight' };
  return { text: 'Obese', class: 'bmi-obese' };
};

export const calculateBMR = (
  weightKg: number,
  heightCm: number,
  age: number,
  gender: 'male' | 'female'
): number => {
  // Mifflin-St Jeor Equation
  const bmr = 10 * weightKg + 6.25 * heightCm - 5 * age;
  return gender === 'male' ? bmr + 5 : bmr - 161;
};

export const calculateIdealWeight = (heightCm: number): { min: number; max: number } => {
  const heightM = heightCm / 100;
  const minWeight = 18.5 * heightM * heightM;
  const maxWeight = 24.9 * heightM * heightM;
  return { min: minWeight, max: maxWeight };
};

export const getWeightStatus = (
  currentWeightKg: number,
  idealMin: number,
  idealMax: number
): string => {
  if (currentWeightKg < idealMin) {
    const difference = idealMin - currentWeightKg;
    return `You are ${difference.toFixed(1)}kg below the healthy range. Consider consulting a healthcare provider.`;
  } else if (currentWeightKg > idealMax) {
    const difference = currentWeightKg - idealMax;
    return `You are ${difference.toFixed(1)}kg above the healthy range. Consider a balanced diet and exercise.`;
  } else {
    return 'Your weight is within the healthy range for your height. Keep up the good work!';
  }
};

export const calculateHealthMetrics = (
  age: number,
  height: number,
  weight: number,
  gender: 'male' | 'female',
  activityLevel: number,
  isMetric: boolean
): HealthMetrics => {
  // Convert to metric if needed
  const weightKg = isMetric ? weight : weight / 2.20462;
  const heightCm = isMetric ? height : height * 30.48;

  const bmi = calculateBMI(weightKg, heightCm);
  const bmiCategory = getBMICategory(bmi);
  const bmr = calculateBMR(weightKg, heightCm, age, gender);
  const dailyCalories = bmr * activityLevel;
  const idealWeight = calculateIdealWeight(heightCm);

  return {
    bmi,
    bmiCategory: bmiCategory.text,
    bmiClass: bmiCategory.class,
    bmr,
    dailyCalories,
    loseCalories: dailyCalories - 550, // ~0.5kg/week loss
    gainCalories: dailyCalories + 550, // ~0.5kg/week gain
    idealWeightMin: idealWeight.min,
    idealWeightMax: idealWeight.max,
    weightStatus: getWeightStatus(weightKg, idealWeight.min, idealWeight.max),
  };
};
