import type { NonNullish } from "./types/non-nullish";


export function isNonNullish(value: unknown): value is NonNullish {
  return value !== null && value !== undefined;
}
