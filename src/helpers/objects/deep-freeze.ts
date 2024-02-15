import type { AnyObject } from "../../common/types/any-object";
import { isObject } from "../../common/type-checks/is-object";
import { getAll as getAllProperties } from "../../property-retriever/property-retriever";


function deepFreezeAux<T extends AnyObject>(object: T, references: WeakSet<T>): Readonly<T> {
  const properties = getAllProperties(object);

  for (const name of properties) {
    const value = object[name];

    if (references.has(value)) {
      continue;
    }

    if (isObject(value)) {
      references.add(value);
      deepFreezeAux(value, references);
    }
  }

  return Object.freeze(object);
}


export function deepFreeze<T extends AnyObject>(object: T): Readonly<T> {
  return deepFreezeAux(object, new WeakSet<T>());
}
