export type ToLocaleStringOptions = Intl.NumberFormatOptions & BigIntToLocaleStringOptions & Intl.DateTimeFormatOptions;

export type Comparer<T> = (a: T, b: T) => number;

export enum Order {
  Asc,
  Desc
}
