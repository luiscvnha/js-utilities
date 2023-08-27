// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties#obtaining_properties_by_enumerabilityownership
export class PropertyRetriever {
  private constructor() {}


  /* public */


  public static getOwnEnumerable(obj: object): string[] {
    return Object.keys(obj);
  }

  public static getOwnNonEnumerable(obj: object): string[] {
    return PropertyRetriever._getPropertyNames(obj, true, false, PropertyRetriever._nonEnumerable);
  }

  public static getOwn(obj: object): string[] {
    return Object.getOwnPropertyNames(obj);
  }

  public static getInheritedEnumerable(obj: object): string[] {
    return PropertyRetriever._getPropertyNames(obj, false, true, PropertyRetriever._enumerable);
  }

  public static getInheritedNonEnumerable(obj: object): string[] {
    return PropertyRetriever._getPropertyNames(obj, false, true, PropertyRetriever._nonEnumerable);
  }

  public static getInherited(obj: object): string[] {
    return PropertyRetriever._getPropertyNames(obj, false, true, PropertyRetriever._enumerableAndNonEnumerable);
  }

  public static getEnumerable(obj: object): string[] {
    const props: string[] = [];
    for (const prop in obj) {
      props.push(prop);
    }
    return props;
  }

  public static getNonEnumerable(obj: object): string[] {
    return PropertyRetriever._getPropertyNames(obj, true, true, PropertyRetriever._nonEnumerable);
  }

  public static getAll(obj: object): string[] {
    return PropertyRetriever._getPropertyNames(obj, true, true, PropertyRetriever._enumerableAndNonEnumerable);
  }


  /* private */


  private static _enumerable(obj: object, prop: string): boolean {
    return Object.prototype.propertyIsEnumerable.call(obj, prop);
  }

  private static _nonEnumerable(obj: object, prop: string): boolean {
    return !Object.prototype.propertyIsEnumerable.call(obj, prop);
  }

  private static _enumerableAndNonEnumerable(): boolean {
    return true;
  }

  private static _getPropertyNames(obj: object, iterateSelf: boolean, iteratePrototype: boolean, includeProp: (obj: object, prop: string) => boolean): string[] {
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
}
