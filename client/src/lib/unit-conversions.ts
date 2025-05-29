export const kgToLbs = (kg: number): number => kg * 2.20462;
export const lbsToKg = (lbs: number): number => lbs / 2.20462;
export const cmToFt = (cm: number): number => cm / 30.48;
export const ftToCm = (ft: number): number => ft * 30.48;
export const cmToInches = (cm: number): number => cm / 2.54;
export const inchesToCm = (inches: number): number => inches * 2.54;

export const formatHeight = (value: number, isMetric: boolean): string => {
  if (isMetric) {
    return `${value.toFixed(1)} cm`;
  } else {
    const feet = Math.floor(value);
    const inches = Math.round((value - feet) * 12);
    return `${feet}'${inches}"`;
  }
};

export const formatWeight = (value: number, isMetric: boolean): string => {
  return `${value.toFixed(1)} ${isMetric ? 'kg' : 'lbs'}`;
};
