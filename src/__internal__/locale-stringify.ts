import type { FormatOptions } from "../common/types/format-options";
import type { LocalesArgument } from "../common/types/locales-argument";
import { isNonNullish } from "../common/is-non-nullish";
import { isFunction } from "../common/is-function";
import { isString } from "../common/is-string";


export function localeStringify(
  value: unknown,
  locales?: LocalesArgument | undefined,
  options?: FormatOptions | undefined,
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
