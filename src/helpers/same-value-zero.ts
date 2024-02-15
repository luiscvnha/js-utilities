// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#same-value-zero_equality
export function sameValueZero(value1: unknown, value2: unknown): boolean;
export function sameValueZero(x: unknown, y: unknown): boolean {
  if (typeof x === "number" && typeof y === "number") {
    return x === y || (x !== x && y !== y);
  }
  return x === y;
}
