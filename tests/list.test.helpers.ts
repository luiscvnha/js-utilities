import { typeOf } from "../src/helpers";
import { List } from "../src/list";


function isListOrArray(a: any): a is List<any> | any[] {
  return a instanceof List || Array.isArray(a);
}

function listOrArrayEquals(a: List<any> | any[], b: List<any> | any[]): boolean {
  if (a.length !== b.length) {
    return false;
  }

  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  if (aKeys.length !== bKeys.length) {
    return false;
  }

  const length = aKeys.length;
  for (let i = 0; i < length; ++i) {
    const aKey = aKeys[i];
    const bKey = bKeys[i];

    if (!Object.is(aKey, bKey) || !equals(a[Number(aKey)], b[Number(bKey)])) {
      return false;
    }
  }

  return true;
}


function isMap(a: any): a is Map<any, any> {
  return a instanceof Map;
}

function mapEquals(a: Map<any, any>, b: Map<any, any>): boolean {
  if (a.size !== b.size) {
    return false;
  }

  for (const key of a.keys()) {
    if (!b.has(key)) {
      return false;
    }

    if (!equals(a.get(key), b.get(key))) {
      return false;
    }
  }

  return true;
}


function isPlainObject(a: any): a is Record<any, any> {
  return typeOf(a) === "object";
}

function plainObjectEquals(a: Record<any, any>, b: Record<any, any>): boolean {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  if (aKeys.length !== bKeys.length) {
    return false;
  }

  for (const key of aKeys) {
    if (!bKeys.includes(key)) {
      return false;
    }

    if (!equals(a[key], b[key])) {
      return false;
    }
  }

  return true;
}


function equals(a: any, b: any): boolean {
  if (Object.is(a, b)) {
    return true;
  }

  if (isListOrArray(a) && isListOrArray(b)) {
    return listOrArrayEquals(a, b);
  }

  if (isMap(a) && isMap(b)) {
    return mapEquals(a, b);
  }

  if (isPlainObject(a) && isPlainObject(b)) {
    return plainObjectEquals(a, b);
  }

  return false;
}

export function expectToEqual(actual: any, expected: any): void {
  expect(equals(actual, expected)).toBe(true);
}
