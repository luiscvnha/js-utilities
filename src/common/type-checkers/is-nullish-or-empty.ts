import type { Nullable } from "../types/nullable";
import { isString } from "./is-string";


export function isNullishOrEmpty(value: string): value is "";
export function isNullishOrEmpty(value: unknown): value is Nullable<"">;
export function isNullishOrEmpty(value: unknown): boolean {
  return value === null
    || value === undefined
    || (isString(value) && value.length <= 0);
}
