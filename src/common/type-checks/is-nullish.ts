import type { Nullish } from "../types/nullish";


export function isNullish(value: unknown): value is Nullish {
  return value === null || value === undefined;
}
