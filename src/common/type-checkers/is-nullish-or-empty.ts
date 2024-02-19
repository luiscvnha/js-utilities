import type { Nullish } from "../types/nullish";
import { isString } from "./is-string";


export function isNullishOrEmpty(value: unknown): boolean {
  return value === null
    || value === undefined
    || (isString(value) && value.length <= 0);
}
