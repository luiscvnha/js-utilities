import { deepFreeze } from "../helpers/objects/deep-freeze";
import {
  getOwnEnumerable,
  getOwnNonEnumerable,
  getOwn,
  getInheritedEnumerable,
  getInheritedNonEnumerable,
  getInherited,
  getEnumerable,
  getNonEnumerable,
  getAll
} from "./property-retriever";

export const PropertyRetriever = deepFreeze({
  getOwnEnumerable,
  getOwnNonEnumerable,
  getOwn,
  getInheritedEnumerable,
  getInheritedNonEnumerable,
  getInherited,
  getEnumerable,
  getNonEnumerable,
  getAll
});
