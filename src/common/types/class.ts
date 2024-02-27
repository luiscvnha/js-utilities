import type { AnyFunction } from "./any-function";


export interface Class<T extends object> extends AnyFunction {
  new (...args: any[]): T;
  readonly prototype: T;
}
