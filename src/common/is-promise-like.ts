import { isObject } from "./is-object";
import { isFunction } from "./is-function";


export function isPromiseLike(value: unknown): value is PromiseLike<unknown> {
  return isObject(value)
    && "then" in value
    && isFunction(value.then);
}
