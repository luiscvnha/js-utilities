import { deepFreeze } from "../helpers/objects/deep-freeze";


export function createNamespaceObject<T extends object>(content: T): Readonly<T> {
  return deepFreeze<T>(
    Object.assign(
      Object.create(null),
      content
    )
  );
}
