import type { AnyFunction } from "./any-function";
import type { AnyObject } from "./any-object";


export interface Class<T extends AnyObject, Args extends unknown[] = unknown[]> extends AnyFunction {
  new (...args: Args): T;
  readonly prototype: T;
}
