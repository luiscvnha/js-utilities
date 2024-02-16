import type { NullableObject } from "../types/nullable-object";


export function isNullableObject(value: unknown): value is NullableObject {
  return (
    typeof value === "object"
    && !(value instanceof Boolean)
    && !(value instanceof Number)
    && !(value instanceof String)
  )
  || value === undefined;
}
