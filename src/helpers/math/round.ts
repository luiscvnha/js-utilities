// https://stackoverflow.com/a/19722641
export function round(value: number, digits: number = 0): number {
  if (digits < 0 || digits > 100) {
    throw new RangeError("digits must be a number between 0 and 100");
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
