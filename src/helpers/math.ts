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


// https://stackoverflow.com/a/19722641
export function round(value: number, digits: number = 0): number {
  if (digits < 0 || digits > 100) {
    throw new RangeError("decimals must be a number between 0 and 100");
  }

  if (Number.isNaN(value) || Number.isNaN(digits)) {
    return NaN;
  }

  if (value === Infinity || value === -Infinity) {
    return value;
  }

  digits = Math.trunc(digits);

  let r: any = `${value}e+${digits}`;
  r = Math.round(r);
  r = `${r}e-${digits}`;

  return Number(r);
}
