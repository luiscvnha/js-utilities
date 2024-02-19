// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties#obtaining_properties_by_enumerabilityownership


function enumerable(obj: object, prop: string): boolean {
  return Object.prototype.propertyIsEnumerable.call(obj, prop);
}


function nonEnumerable(obj: object, prop: string): boolean {
  return !Object.prototype.propertyIsEnumerable.call(obj, prop);
}


function enumerableAndNonEnumerable(): boolean {
  return true;
}


function getPropertyNames(obj: object, iterateSelf: boolean, iteratePrototype: boolean, includeProp: (obj: object, prop: string) => boolean): string[] {
  const props: string[] = [];

  do {
    if (iterateSelf) {
      for (const prop of Object.getOwnPropertyNames(obj)) {
        if (!props.includes(prop) && includeProp(obj, prop)) {
          props.push(prop);
        }
      }
    }

    if (!iteratePrototype) {
      break;
    }

    iterateSelf = true;
    obj = Object.getPrototypeOf(obj);
  } while (obj);

  return props;
}


export function getOwnEnumerable<T>(obj: T): (keyof T & string)[];
export function getOwnEnumerable(obj: object): string[];
export function getOwnEnumerable(obj: object): string[] {
  return Object.keys(obj);
}


export function getOwnNonEnumerable<T>(obj: T): (keyof T & string)[];
export function getOwnNonEnumerable(obj: object): string[];
export function getOwnNonEnumerable(obj: object): string[] {
  return getPropertyNames(obj, true, false, nonEnumerable);
}


export function getOwn<T>(obj: T): (keyof T & string)[];
export function getOwn(obj: object): string[];
export function getOwn(obj: object): string[] {
  return Object.getOwnPropertyNames(obj);
}


export function getInheritedEnumerable<T>(obj: T): (keyof T & string)[];
export function getInheritedEnumerable(obj: object): string[];
export function getInheritedEnumerable(obj: object): string[] {
  return getPropertyNames(obj, false, true, enumerable);
}


export function getInheritedNonEnumerable<T>(obj: T): (keyof T & string)[];
export function getInheritedNonEnumerable(obj: object): string[];
export function getInheritedNonEnumerable(obj: object): string[] {
  return getPropertyNames(obj, false, true, nonEnumerable);
}


export function getInherited<T>(obj: T): (keyof T & string)[];
export function getInherited(obj: object): string[];
export function getInherited(obj: object): string[] {
  return getPropertyNames(obj, false, true, enumerableAndNonEnumerable);
}


export function getEnumerable<T>(obj: T): (keyof T & string)[];
export function getEnumerable(obj: object): string[];
export function getEnumerable(obj: object): string[] {
  const props: string[] = [];
  for (const prop in obj) {
    props.push(prop);
  }
  return props;
}


export function getNonEnumerable<T>(obj: T): (keyof T & string)[];
export function getNonEnumerable(obj: object): string[];
export function getNonEnumerable(obj: object): string[] {
  return getPropertyNames(obj, true, true, nonEnumerable);
}


export function getAll<T>(obj: T): (keyof T & string)[];
export function getAll(obj: object): string[];
export function getAll(obj: object): string[] {
  return getPropertyNames(obj, true, true, enumerableAndNonEnumerable);
}
