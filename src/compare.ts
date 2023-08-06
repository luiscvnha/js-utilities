import { Comparer, Order } from "./common";


export class Compare {
  private constructor() {}


  public static asStrings(
    order: Order = Order.Ascending,
    locales?: string | string[] | undefined,
    options?: Intl.CollatorOptions | undefined
  ): Comparer<any> {
    const collator = new Intl.Collator(locales, options);

    return order === Order.Ascending
      ? function(a: any, b: any): number {
        return collator.compare(String(a), String(b));
      }
      : function(a: any, b: any): number {
        return collator.compare(String(b), String(a));
      };
  }

  public static strings(
    order: Order = Order.Ascending,
    locales?: string | string[] | undefined,
    options?: Intl.CollatorOptions | undefined
  ): Comparer<string> {
    const collator = new Intl.Collator(locales, options);

    return order === Order.Ascending
      ? collator.compare
      : function(a: string, b: string): number {
        return collator.compare(b, a);
      };
  }

  public static numbers(order: Order = Order.Ascending): Comparer<number> {
    return order === Order.Ascending
      ? function(a: number, b: number): number {
        return a - b;
      }
      : function(a: number, b: number): number {
        return b - a;
      };
  }

  public static bigInts(order: Order = Order.Ascending): Comparer<bigint> {
    return order === Order.Ascending
      ? function(a: bigint, b: bigint): number {
        return a > b ? 1 : (a < b ? -1 : 0);
      }
      : function(a: bigint, b: bigint): number {
        return b > a ? 1 : (b < a ? -1 : 0);
      };
  }

  public static dates(order: Order = Order.Ascending): Comparer<Date> {
    return order === Order.Ascending
      ? function(a: Date, b: Date): number {
        return a.valueOf() - b.valueOf();
      }
      : function(a: Date, b: Date): number {
        return b.valueOf() - a.valueOf();
      };
  }
}
