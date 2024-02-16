import { isFunction } from "./is-function";
import { isObject } from "./is-object";


export function isAsyncIterable<T = unknown>(value: unknown): value is AsyncIterable<T> {
  return isObject(value) && isFunction(value[Symbol.asyncIterator]);
}
