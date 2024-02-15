import type { AnyObject } from "./any-object";


// eslint-disable-next-line @typescript-eslint/ban-types
export interface Class<T extends AnyObject, Args extends unknown[] = unknown[]> extends Function {
  new (...args: Args): T;
  readonly prototype: T;
}
