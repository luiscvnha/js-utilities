import { isString } from "./is-string";


export function isNullishOrWhitespace(value: unknown): boolean {
  return value === null
    || value === undefined
    || (isString(value) && value.trim().length <= 0);
}
