import { Comparer, Order } from "./common";


export class Compare {
  private constructor() {}


  public static numbers(order: Order = Order.Asc): Comparer<number> {
    return order === Order.Asc
      ? function(a: number, b: number) {
        return a - b;
      }
      : function(a: number, b: number) {
        return b - a;
      };
  }

  public static bigInts(order: Order = Order.Asc): Comparer<bigint> {
    return order === Order.Asc
      ? function(a: bigint, b: bigint) {
        return a > b ? 1 : (a < b ? -1 : 0);
      }
      : function(a: bigint, b: bigint) {
        return b > a ? 1 : (b < a ? -1 : 0);
      };
  }

  public static strings(order: Order = Order.Asc): Comparer<string> {
    return order === Order.Asc
      ? function(a: string, b: string) {
        return a.localeCompare(b);
      }
      : function(a: string, b: string) {
        return b.localeCompare(a);
      };
  }

  public static dates(order: Order = Order.Asc): Comparer<Date> {
    return order === Order.Asc
      ? function(a: Date, b: Date) {
        return a.valueOf() - b.valueOf();
      }
      : function(a: Date, b: Date) {
        return b.valueOf() - a.valueOf();
      };
  }
}
