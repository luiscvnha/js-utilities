import { Order } from "../common/types/order";

import type { Comparer } from "./types/comparer";


export function asStrings(order: Order = Order.Ascending, locales?: string | string[] | undefined, options?: Intl.CollatorOptions | undefined): Comparer<unknown> {
  const collator = new Intl.Collator(locales, options);

  return order === Order.Ascending
    ? (x: unknown, y: unknown): number => {
      return collator.compare(String(x), String(y));
    }
    : (x: unknown, y: unknown): number => {
      return collator.compare(String(y), String(x));
    };
}


export function strings(order: Order = Order.Ascending, locales?: string | string[] | undefined, options?: Intl.CollatorOptions | undefined): Comparer<string> {
  const collator = new Intl.Collator(locales, options);

  return order === Order.Ascending
    ? collator.compare
    : (x: string, y: string): number => {
      return collator.compare(y, x);
    };
}


export function numbers(order: Order = Order.Ascending): Comparer<number> {
  return order === Order.Ascending
    ? (x: number, y: number): number => {
      return x - y;
    }
    : (x: number, y: number): number => {
      return y - x;
    };
}


export function bigInts(order: Order = Order.Ascending): Comparer<bigint> {
  return order === Order.Ascending
    ? (x: bigint, y: bigint): number => {
      return x > y ? 1 : (x < y ? -1 : 0);
    }
    : (x: bigint, y: bigint): number => {
      return y > x ? 1 : (y < x ? -1 : 0);
    };
}


export function dates(order: Order = Order.Ascending): Comparer<Date> {
  return order === Order.Ascending
    ? (x: Date, y: Date): number => {
      return x.valueOf() - y.valueOf();
    }
    : (x: Date, y: Date): number => {
      return y.valueOf() - x.valueOf();
    };
}
