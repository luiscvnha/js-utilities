import { isNullish } from "./general";


export function isIterable<T = any>(value: any): value is Iterable<T> {
  return !isNullish(value) && typeof value[Symbol.iterator] === "function";
}


export function isAsyncIterable<T = any>(value: any): value is AsyncIterable<T> {
  return !isNullish(value) && typeof value[Symbol.asyncIterator] === "function";
}


export function isArrayLike<T = any>(value: any): value is ArrayLike<T> {
  return (
    Array.isArray(value) ||
    typeof value === "string" ||
    (Boolean(value) &&
      typeof value === "object" &&
      typeof (value.length) === "number" &&
      (value.length === 0 ||
        (value.length > 0 &&
        (value.length - 1) in value)
      )
    )
  );
}


export function join<T>(array: Iterable<T> | ArrayLike<T>, separator: string, stringifier: (value: T) => string): string {
  let r: string;

  if (isArrayLike<T>(array)) {
    const length = array.length;
    if (length <= 0) {
      return "";
    }

    r = stringifier(array[0]);
    for (let i = 1; i < length; ++i) {
      r += separator + stringifier(array[i]);
    }
  }
  else if (isIterable<T>(array)) {
    const iterator = array[Symbol.iterator]();
    let result = iterator.next();
    if (result.done === true) {
      return "";
    }

    r = stringifier(result.value);
    for (
      result = iterator.next();
      result.done !== true;
      result = iterator.next()
    ) {
      r += separator + stringifier(result.value);
    }
  }
  else {
    throw new TypeError();
  }

  return r;
}
