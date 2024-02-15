import type { Nullish } from "./nullish";


/**
 * Adds `null` and `undefined` to T
 */
export type Nullable<T> = T | Nullish;
