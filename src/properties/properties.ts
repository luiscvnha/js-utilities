// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties


function enumerable(obj: object, prop: PropertyKey): boolean {
  return Object.prototype.propertyIsEnumerable.call(obj, prop);
}


function nonEnumerable(obj: object, prop: PropertyKey): boolean {
  return !Object.prototype.propertyIsEnumerable.call(obj, prop);
}


function enumerableAndNonEnumerable(): boolean {
  return true;
}


function getProperties<T extends object>(obj: T, iterateSelf: boolean, iteratePrototype: boolean, enumerability: (obj: object, prop: PropertyKey) => boolean, includeNames: true, includeSymbols: false): (keyof T & string)[];
function getProperties<T extends object>(obj: T, iterateSelf: boolean, iteratePrototype: boolean, enumerability: (obj: object, prop: PropertyKey) => boolean, includeNames: false, includeSymbols: true): (keyof T & symbol)[];
function getProperties<T extends object>(obj: T, iterateSelf: boolean, iteratePrototype: boolean, enumerability: (obj: object, prop: PropertyKey) => boolean, includeNames: true, includeSymbols: true): (keyof T & (string | symbol))[];
function getProperties(
  obj: object,
  iterateSelf: boolean,
  iteratePrototype: boolean,
  enumerability: (obj: object, prop: PropertyKey) => boolean,
  includeNames: boolean,
  includeSymbols: boolean,
): (string | symbol)[] {

  const props: (string | symbol)[] = [];

  do {
    if (iterateSelf) {
      if (includeNames) {
        for (const prop of Object.getOwnPropertyNames(obj)) {
          if (!props.includes(prop) && enumerability(obj, prop)) {
            props.push(prop);
          }
        }
      }

      if (includeSymbols) {
        for (const prop of Object.getOwnPropertySymbols(obj)) {
          if (!props.includes(prop) && enumerability(obj, prop)) {
            props.push(prop);
          }
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


function hasProperty(
  obj: object,
  prop: PropertyKey,
  iterateSelf: boolean,
  iteratePrototype: boolean,
  enumerability: (obj: object, prop: PropertyKey) => boolean,
): boolean {

  do {
    if (iterateSelf) {
      if (Object.prototype.hasOwnProperty.call(obj, prop) && enumerability(obj, prop)) {
        return true;
      }
    }

    if (!iteratePrototype) {
      break;
    }

    iterateSelf = true;
    obj = Object.getPrototypeOf(obj);
  } while (obj);

  return false;
}


// own, enumerable

export function getOwnEnumerableNames<T extends object>(obj: T): (keyof T & string)[] {
  return Object.keys(obj) as (keyof T & string)[];
}

export function getOwnEnumerableSymbols<T extends object>(obj: T): (keyof T & symbol)[] {
  return getProperties(obj, true, false, enumerable, false, true);
}

export function getOwnEnumerable<T extends object>(obj: T): (keyof T & (string | symbol))[] {
  return getProperties(obj, true, false, enumerable, true, true);
}

export function hasOwnEnumerable<T extends object>(obj: T, prop: PropertyKey): prop is keyof T {
  return Object.prototype.propertyIsEnumerable.call(obj, prop);
}


// own, non-enumerable

export function getOwnNonEnumerableNames<T extends object>(obj: T): (keyof T & string)[] {
  return getProperties(obj, true, false, nonEnumerable, true, false);
}

export function getOwnNonEnumerableSymbols<T extends object>(obj: T): (keyof T & symbol)[] {
  return getProperties(obj, true, false, nonEnumerable, false, true);
}

export function getOwnNonEnumerable<T extends object>(obj: T): (keyof T & (string | symbol))[] {
  return getProperties(obj, true, false, nonEnumerable, true, true);
}

export function hasOwnNonEnumerable<T extends object>(obj: T, prop: PropertyKey): prop is keyof T {
  return hasProperty(obj, prop, true, false, nonEnumerable);
}


// own

export function getOwnNames<T extends object>(obj: T): (keyof T & string)[] {
  return Object.getOwnPropertyNames(obj) as (keyof T & string)[];
}

export function getOwnSymbols<T extends object>(obj: T): (keyof T & symbol)[] {
  return Object.getOwnPropertySymbols(obj) as (keyof T & symbol)[];
}

export function getOwn<T extends object>(obj: T): (keyof T & (string | symbol))[] {
  return getProperties(obj, true, false, enumerableAndNonEnumerable, true, true);
}

export function hasOwn<T extends object>(obj: T, prop: PropertyKey): prop is keyof T {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}


// inherited, enumerable

export function getInheritedEnumerableNames<T extends object>(obj: T): (keyof T & string)[] {
  return getProperties(obj, false, true, enumerable, true, false);
}

export function getInheritedEnumerableSymbols<T extends object>(obj: T): (keyof T & symbol)[] {
  return getProperties(obj, false, true, enumerable, false, true);
}

export function getInheritedEnumerable<T extends object>(obj: T): (keyof T & (string | symbol))[] {
  return getProperties(obj, false, true, enumerable, true, true);
}

export function hasInheritedEnumerable<T extends object>(obj: T, prop: PropertyKey): prop is keyof T {
  return hasProperty(obj, prop, false, true, enumerable);
}


// inherited, non-enumerable

export function getInheritedNonEnumerableNames<T extends object>(obj: T): (keyof T & string)[] {
  return getProperties(obj, false, true, nonEnumerable, true, false);
}

export function getInheritedNonEnumerableSymbols<T extends object>(obj: T): (keyof T & symbol)[] {
  return getProperties(obj, false, true, nonEnumerable, false, true);
}

export function getInheritedNonEnumerable<T extends object>(obj: T): (keyof T & (string | symbol))[] {
  return getProperties(obj, false, true, nonEnumerable, true, true);
}

export function hasInheritedNonEnumerable<T extends object>(obj: T, prop: PropertyKey): prop is keyof T {
  return hasProperty(obj, prop, false, true, nonEnumerable);
}


// inherited

export function getInheritedNames<T extends object>(obj: T): (keyof T & string)[] {
  return getProperties(obj, false, true, enumerableAndNonEnumerable, true, false);
}

export function getInheritedSymbols<T extends object>(obj: T): (keyof T & symbol)[] {
  return getProperties(obj, false, true, enumerableAndNonEnumerable, false, true);
}

export function getInherited<T extends object>(obj: T): (keyof T & (string | symbol))[] {
  return getProperties(obj, false, true, enumerableAndNonEnumerable, true, true);
}

export function hasInherited<T extends object>(obj: T, prop: PropertyKey): prop is keyof T {
  return hasProperty(obj, prop, false, true, enumerableAndNonEnumerable);
}


// enumerable

export function getEnumerableNames<T extends object>(obj: T): (keyof T & string)[] {
  const props: (keyof T & string)[] = [];
  for (const prop in obj) {
    props.push(prop);
  }
  return props;
}

export function getEnumerableSymbols<T extends object>(obj: T): (keyof T & symbol)[] {
  return getProperties(obj, true, true, enumerable, false, true);
}

export function getEnumerable<T extends object>(obj: T): (keyof T & (string | symbol))[] {
  return getProperties(obj, true, true, enumerable, true, true);
}

export function hasEnumerable<T extends object>(obj: T, prop: PropertyKey): prop is keyof T {
  return hasProperty(obj, prop, true, true, enumerable);
}


// non-enumerable

export function getNonEnumerableNames<T extends object>(obj: T): (keyof T & string)[] {
  return getProperties(obj, true, true, nonEnumerable, true, false);
}

export function getNonEnumerableSymbols<T extends object>(obj: T): (keyof T & symbol)[] {
  return getProperties(obj, true, true, nonEnumerable, false, true);
}

export function getNonEnumerable<T extends object>(obj: T): (keyof T & (string | symbol))[] {
  return getProperties(obj, true, true, nonEnumerable, true, true);
}

export function hasNonEnumerable<T extends object>(obj: T, prop: PropertyKey): prop is keyof T {
  return hasProperty(obj, prop, true, true, nonEnumerable);
}


// all

export function getAllNames<T extends object>(obj: T): (keyof T & string)[] {
  return getProperties(obj, true, true, enumerableAndNonEnumerable, true, false);
}

export function getAllSymbols<T extends object>(obj: T): (keyof T & symbol)[] {
  return getProperties(obj, true, true, enumerableAndNonEnumerable, false, true);
}

export function getAll<T extends object>(obj: T): (keyof T & (string | symbol))[] {
  return getProperties(obj, true, true, enumerableAndNonEnumerable, true, true);
}

export function has<T extends object>(obj: T, prop: PropertyKey): prop is keyof T {
  return prop in obj;
}
