import { isFunction } from "./is-function";
import { isObject } from "./is-object";


export function isPromiseLike<T = unknown>(value: unknown): value is PromiseLike<T> {
  return isObject(value) && isFunction(value.then);
}
