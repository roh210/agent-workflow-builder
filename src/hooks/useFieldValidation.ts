export const useFieldValidation = () => {
  const clampNumber = (value: number, min: number, max: number): number => {
    if (isNaN(value)) return min;
    return Math.min(Math.max(value, min), max);
  };

  return { clampNumber };
};
