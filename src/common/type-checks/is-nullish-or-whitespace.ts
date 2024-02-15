import type { Nullish } from "../types/nullish";
import { isString } from "./is-string";


export function isNullishOrWhitespace(value: unknown): value is Nullish | "" {
  return value === null
    || value === undefined
    || (isString(value) && value.trim().length <= 0);
}
