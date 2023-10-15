import { isNullish } from "./general";


export function isIterable<T = any>(value: any): value is Iterable<T> {
  return !isNullish(value)
    && typeof value[Symbol.iterator] === "function";
}


export function isAsyncIterable<T = any>(value: any): value is AsyncIterable<T> {
  return !isNullish(value)
    && typeof value[Symbol.asyncIterator] === "function";
}


export function isArrayLike<T = any>(value: any): value is ArrayLike<T> {
  return !isNullish(value)
    && (Array.isArray(value)
      || (
        typeof value === "object"
        && !(value instanceof String)
        && typeof (value.length) === "number"
        && (
          value.length === 0
          || (value.length > 0 && (value.length - 1) in value)
        )
      )
    );
}
