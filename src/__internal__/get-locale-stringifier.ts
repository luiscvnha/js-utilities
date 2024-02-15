import type { ToLocaleStringOptions } from "../common/types/to-locale-string-options";
import { isBigInt } from "../common/type-checks/is-big-int";
import { isNumber } from "../common/type-checks/is-number";


export function getLocaleStringifier(locales?: Intl.LocalesArgument | undefined, options?: ToLocaleStringOptions | undefined): (value: unknown) => string {
  return (value) => (
    isNumber(value) || isBigInt(value) || value instanceof Date
      ? (value as any).toLocaleString(locales, options)
      : String(value)
  );
}
