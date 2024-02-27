import type { PlainObject } from "./types/plain-object";


export function isPlainObject(value: unknown): value is PlainObject {
  return typeof value === "object"
    && value !== null
    && (
      value.constructor === Object
      || value.constructor === undefined
    );
}
