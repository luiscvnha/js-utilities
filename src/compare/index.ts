import { deepFreeze } from "../helpers/objects/deep-freeze";
import {
  asStrings,
  strings,
  numbers,
  bigInts,
  dates,
} from "./compare";

export * from "./types/comparer";
export const Compare = deepFreeze({
  asStrings,
  strings,
  numbers,
  bigInts,
  dates,
});
