import { isObject } from "./is-object";
import { isFunction } from "./is-function";


export function isAsyncIterable(value: unknown): value is AsyncIterable<unknown> {
  return isObject(value)
    && Symbol.asyncIterator in value
    && isFunction(value[Symbol.asyncIterator]);
}
