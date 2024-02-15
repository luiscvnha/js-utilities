export function clamp(value: number, min: number, max: number): number {
  if (min > max) {
    throw new RangeError("max must be greater than or equal to min");
  }

  if (Number.isNaN(value) || Number.isNaN(min) || Number.isNaN(max)) {
    return NaN;
  }

  return Math.max(Math.min(value, max), min);
}
