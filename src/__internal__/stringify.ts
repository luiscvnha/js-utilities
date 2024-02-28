import { isNumber } from "../common/is-number";
import { isFunction } from "../common/is-function";
import { isNonNullish } from "../common/is-non-nullish";
import { isString } from "../common/is-string";


export function stringify(value: unknown): string {
  if (isString(value)) {
    return value;
  }

  if (isNumber(value)) {
    return value.toString(10);
  }

  if (isNonNullish(value) && isFunction((value as any).toString)) {
    return (value as any).toString();
  }

  return String(value);
}
