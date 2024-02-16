import type { AnyObject } from "../types/any-object";


export function isObject(value: unknown): value is AnyObject {
  return typeof value === "object"
    && value !== null
    && !(value instanceof Boolean)
    && !(value instanceof Number)
    && !(value instanceof String);
}
