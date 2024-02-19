import { isObject } from "../../common/type-checkers/is-object";
import { getAll as getAllProperties } from "../../property-retriever/property-retriever";


function deepFreezeAux<T extends object>(obj: T, references: WeakSet<object>): Readonly<T> {
  const properties = getAllProperties(obj);

  for (const name of properties) {
    const value = obj[name];

    if (isObject(value) && !references.has(value)) {
      references.add(value);
      deepFreezeAux(value, references);
    }
  }

  return Object.freeze(obj);
}


export function deepFreeze<T extends object>(obj: T): Readonly<T> {
  return deepFreezeAux(obj, new WeakSet());
}
