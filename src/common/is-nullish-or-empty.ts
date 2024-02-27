import type { Nullable } from "./types/nullable";
import { isString } from "./is-string";


export function isNullishOrEmpty(value: unknown): value is Nullable<""> {
  return value === null
    || value === undefined
    || (isString(value) && value.length <= 0);
}
