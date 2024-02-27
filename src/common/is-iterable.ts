import { isObject } from "./is-object";
import { isFunction } from "./is-function";
import { isString } from "./is-string";


export function isIterable(value: unknown): value is Iterable<unknown> {
  return isString(value)
    || (
      isObject(value)
      && Symbol.iterator in value
      && isFunction(value[Symbol.iterator])
    );
}
