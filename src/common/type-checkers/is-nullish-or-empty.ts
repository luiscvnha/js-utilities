import type { Nullish } from "../types/nullish";
import { isNumber } from "./is-number";


export function isNullishOrEmpty(value: unknown): value is Nullish | { length: 0 } | { size: 0 } {
  return value === null
    || value === undefined
    || (isNumber((value as any).length) && (value as any).length <= 0)
    || (isNumber((value as any).size) && (value as any).size <= 0);
}
