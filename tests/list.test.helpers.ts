import { typeOf } from "../src/helpers";
import { List } from "../src/list";


function isListOrArray(x: any): x is List<any> | any[] {
  return x instanceof List || Array.isArray(x);
}

function expectListOrArrayToEqual(actual: List<any> | any[], expected: List<any> | any[]): void {
  expect(actual.length).toBe(expected.length);

  const actualKeys = Object.keys(actual);
  const expectedKeys = Object.keys(expected);

  expect(actualKeys.length).toBe(expectedKeys.length);

  const length = actualKeys.length;
  for (let i = 0; i < length; ++i) {
    const actualKey = actualKeys[i];
    const expectedKey = expectedKeys[i];

    expect(actualKey).toBe(expectedKey);

    expectToEqual(actual[Number(actualKey)], expected[Number(expectedKey)]);
  }
}


function isMap(x: any): x is Map<any, any> {
  return x instanceof Map;
}

function expectMapToEqual(actual: Map<any, any>, expected: Map<any, any>): void {
  expect(actual.size).toBe(expected.size);

  for (const key of actual.keys()) {
    expect(expected.has(key)).toBe(true);
    expectToEqual(actual.get(key), expected.get(key));
  }
}


function isPlainObject(x: any): x is Record<any, any> {
  return typeOf(x) === "object";
}

function expectPlainObjectToEqual(actual: Record<any, any>, expected: Record<any, any>): void {
  const actualKeys = Object.keys(actual);
  const expectedKeys = Object.keys(expected);

  expect(actualKeys.length).toBe(expectedKeys.length);

  for (const key of actualKeys) {
    expect(expectedKeys).toContain(key);
    expectToEqual(actual[key], expected[key]);
  }
}


export function expectToEqual(actual: any, expected: any): void {
  if (Object.is(actual, expected)) {
    return;
  }

  if (isListOrArray(actual) && isListOrArray(expected)) {
    expectListOrArrayToEqual(actual, expected);
  }
  else if (isMap(actual) && isMap(expected)) {
    expectMapToEqual(actual, expected);
  }
  else if (isPlainObject(actual) && isPlainObject(expected)) {
    expectPlainObjectToEqual(actual, expected);
  }
  else {
    throw new Error();
  }
}
