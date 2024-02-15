import type { AnyObject } from "./any-object";
import type { Nullish } from "./nullish";


/**
 * Any object, including functions, or `null` or `undefined`
 */
export type NullableObject = AnyObject | Nullish;
