// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties#obtaining_properties_by_enumerabilityownership
export const PropertyRetriever = Object.freeze({
  getOwnEnumerable(obj: object): string[] {
    return Object.keys(obj);
  },

  getOwnNonEnumerable(obj: object): string[] {
    return _getPropertyNames(obj, true, false, _nonEnumerable);
  },

  getOwn(obj: object): string[] {
    return Object.getOwnPropertyNames(obj);
  },

  getInheritedEnumerable(obj: object): string[] {
    return _getPropertyNames(obj, false, true, _enumerable);
  },

  getInheritedNonEnumerable(obj: object): string[] {
    return _getPropertyNames(obj, false, true, _nonEnumerable);
  },

  getInherited(obj: object): string[] {
    return _getPropertyNames(obj, false, true, _enumerableAndNonEnumerable);
  },

  getEnumerable(obj: object): string[] {
    const props: string[] = [];
    for (const prop in obj) {
      props.push(prop);
    }
    return props;
  },

  getNonEnumerable(obj: object): string[] {
    return _getPropertyNames(obj, true, true, _nonEnumerable);
  },

  getAll(obj: object): string[] {
    return _getPropertyNames(obj, true, true, _enumerableAndNonEnumerable);
  }
});


function _enumerable(obj: object, prop: string): boolean {
  return Object.prototype.propertyIsEnumerable.call(obj, prop);
}

function _nonEnumerable(obj: object, prop: string): boolean {
  return !Object.prototype.propertyIsEnumerable.call(obj, prop);
}

function _enumerableAndNonEnumerable(): boolean {
  return true;
}

function _getPropertyNames(obj: object, iterateSelf: boolean, iteratePrototype: boolean, includeProp: (obj: object, prop: string) => boolean): string[] {
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
