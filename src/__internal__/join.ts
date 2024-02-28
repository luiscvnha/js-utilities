import { isIterable } from "../common/is-iterable";
import { isArrayLike } from "../common/is-array-like";


export function join<T>(
  iterable: Iterable<T> | ArrayLike<T>,
  separator: string,
  stringifier: (value: T) => string,
): string {
  let r: string;

  if (isArrayLike(iterable)) {
    const length = iterable.length;
    if (length <= 0) {
      return "";
    }

    r = stringifier(iterable[0]);
    for (let i = 1; i < length; ++i) {
      r += separator + stringifier(iterable[i]);
    }
  }

  else if (isIterable(iterable)) {
    const iterator = iterable[Symbol.iterator]();
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
    throw new TypeError("Invalid iterable value");
  }

  return r;
}
