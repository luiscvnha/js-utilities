import type { AnyObject } from "../../common/types/any-object";


export const shallowFreeze: <T extends AnyObject>(object: T) => Readonly<T> = Object.freeze;
