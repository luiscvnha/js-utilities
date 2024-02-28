import type { ToLocaleStringOptions } from "../common/types/to-locale-string-options";
import { isNonNullish } from "../common/is-non-nullish";
import { isFunction } from "../common/is-function";
import { isString } from "../common/is-string";


export function localeStringify(
  value: unknown,
  locales?: Intl.LocalesArgument | undefined,
  options?: ToLocaleStringOptions | undefined
): string {
  if (isString(value)) {
    return value;
  }

  if (isNonNullish(value)) {
    if (isFunction((value as any).toLocaleString)) {
      return (value as any).toLocaleString(locales, options);
    }

    if (isFunction((value as any).toString)) {
      return (value as any).toString();
    }
  }

  return String(value);
}
