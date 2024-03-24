import { createNamespaceObject } from "../__internal__/create-namespace-object";
import {
  asStrings,
  strings,
  numbers,
  bigInts,
  dates,
} from "./compare";

export * from "./types/comparer";
export const Compare = createNamespaceObject({
  asStrings,
  strings,
  numbers,
  bigInts,
  dates,
});
