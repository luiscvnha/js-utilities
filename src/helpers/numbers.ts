export function toIntegerOrInfinity(value: number): number {
  return Number.isNaN(value) || value === 0 ? 0 : Math.trunc(value);
}


/**
 * @param index relative index
 * @param length length of the array
 * @returns absolute index, 0 if index < -length or length if index > length
 */
export function toAbsoluteIndex(index: number, length: number): number {
  index = toIntegerOrInfinity(index);
  return index < 0
    ? Math.max(index + length, 0)
    : Math.min(index, length);
}
