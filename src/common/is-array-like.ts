import { isObject } from "./is-object";
import { isNumber } from "./is-number";
import { isString } from "./is-string";


export function isArrayLike(value: unknown): value is ArrayLike<unknown> {
  return isString(value)
    || Array.isArray(value)
    || (
      isObject(value)
      && "length" in value
      && isNumber(value.length)
      && (
        value.length === 0
        || (value.length > 0 && (value.length - 1) in value)
      )
    );
}
