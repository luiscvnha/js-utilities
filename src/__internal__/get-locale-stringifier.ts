import type { FormatOptions } from "../common/types/format-options";
import type { LocalesArgument } from "../common/types/locales-argument";

import { localeStringify } from "./locale-stringify";


export function getLocaleStringifier(
  locales?: LocalesArgument | undefined,
  options?: FormatOptions | undefined,
): (value: unknown) => string {
  return (value) => localeStringify(value, locales, options);
}
