import type { ToLocaleStringOptions } from "../common/types/to-locale-string-options";
import { isBigInt } from "../common/type-checkers/is-big-int";
import { isNumber } from "../common/type-checkers/is-number";


export function getLocaleStringifier(locales?: Intl.LocalesArgument | undefined, options?: ToLocaleStringOptions | undefined): (value: unknown) => string {
  return (value) => (
    isNumber(value) || isBigInt(value) || value instanceof Date
      ? (value as any).toLocaleString(locales, options)
      : String(value)
  );
}
