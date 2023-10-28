// https://stackoverflow.com/a/4467559
export function mod(value: number, modulo: number): number {
  if (!Number.isFinite(value) || !Number.isFinite(modulo) || modulo < 1) {
    return NaN;
  }

  modulo = Math.trunc(modulo);

  return ((value % modulo) + modulo) % modulo;
}


export function clamp(value: number, min: number, max: number): number {
  if (Number.isNaN(value) || Number.isNaN(min) || Number.isNaN(max) || min > max) {
    return NaN;
  }

  return Math.max(Math.min(value, max), min);
}
