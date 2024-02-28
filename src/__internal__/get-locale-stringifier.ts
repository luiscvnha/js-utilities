import type { ToLocaleStringOptions } from "../common/types/to-locale-string-options";

import { localeStringify } from "./locale-stringify";


export function getLocaleStringifier(
  locales?: Intl.LocalesArgument | undefined,
  options?: ToLocaleStringOptions | undefined
): (value: unknown) => string {
  return (value) => localeStringify(value, locales, options);
}
