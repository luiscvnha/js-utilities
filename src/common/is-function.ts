import type { AnyFunction } from "./types/any-function";


export function isFunction(value: unknown): value is AnyFunction {
  return typeof value === "function";
}
