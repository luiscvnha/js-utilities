import type { AnyFunction } from "./any-function";


export interface Class<T extends object, Args extends unknown[] = unknown[]> extends AnyFunction {
  new (...args: Args): T;
  readonly prototype: T;
}
