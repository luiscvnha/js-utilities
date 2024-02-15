import { isNumber } from "./is-number";
import { isObject } from "./is-object";


export function isArrayLike<T = unknown>(value: unknown): value is ArrayLike<T> {
  return Array.isArray(value)
    || (
      isObject(value)
      && isNumber(value.length)
      && (
        value.length === 0
        || (value.length > 0 && (value.length - 1) in value)
      )
    );
}
