// https://stackoverflow.com/a/4467559
export function mod(value: number, modulo: number): number {
  if (value === Infinity || value === -Infinity) {
    throw new RangeError("value must be a finite number");
  }

  if (modulo < 1 || modulo === Infinity) {
    throw new RangeError("modulo must be a finite number greater than or equal to 1");
  }

  if (Number.isNaN(value) || Number.isNaN(modulo)) {
    return NaN;
  }

  modulo = Math.trunc(modulo);

  return ((value % modulo) + modulo) % modulo;
}


export function clamp(value: number, min: number, max: number): number {
  if (min > max) {
    throw new RangeError("max must be greater than or equal to min");
  }

  if (Number.isNaN(value) || Number.isNaN(min) || Number.isNaN(max)) {
    return NaN;
  }

  return Math.max(Math.min(value, max), min);
}
