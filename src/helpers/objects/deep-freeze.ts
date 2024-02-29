import { isObject } from "../../common/is-object";
import { getAll as getAllProperties } from "../../properties/properties";


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
