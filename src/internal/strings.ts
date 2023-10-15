import { ToLocaleStringOptions } from "../common";


export function getLocaleStringifier(locales?: Intl.LocalesArgument | undefined, options?: ToLocaleStringOptions | undefined): (value: any) => string {
  return function(value: any) {
    let r: string;

    if (
      typeof value === "number"
      || typeof value === "bigint"
      || (typeof value === "object"
        && (value instanceof Date
          || value instanceof Number
        )
      )
    ) {
      r = (value as any).toLocaleString(locales, options);
    } else {
      r = String(value);
    }

    return r;
  };
}
