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
