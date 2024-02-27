import type { Nullable } from "./types/nullable";
import { isString } from "./is-string";


export function isNullishOrWhitespace(value: unknown): value is Nullable<string> {
  return value === null
    || value === undefined
    || (isString(value) && value.trim().length <= 0);
}
