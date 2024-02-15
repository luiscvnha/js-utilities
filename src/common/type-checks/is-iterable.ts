import { isFunction } from "./is-function";
import { isObject } from "./is-object";


export function isIterable<T = unknown>(value: unknown): value is Iterable<T> {
  return isObject(value) && isFunction(value[Symbol.iterator]);
}
