import type { Nullable } from "../types/nullable";
import { isString } from "./is-string";


export function isNullishOrWhitespace(value: string): boolean;
export function isNullishOrWhitespace(value: unknown): value is Nullable<string>;
export function isNullishOrWhitespace(value: unknown): boolean {
  return value === null
    || value === undefined
    || (isString(value) && value.trim().length <= 0);
}
