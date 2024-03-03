import { PlainObject, isPlainObject } from "../../src/common";
import { List } from "../../src/list";


function isListOrArray(x: any): x is List<any> | any[] {
  return x instanceof List || Array.isArray(x);
}

function expectListOrArrayToBe(actual: List<any> | any[], expected: List<any> | any[]): void {
  expect(actual.length).toBe(expected.length);

  const actualKeys = Object.keys(actual);
  const expectedKeys = Object.keys(expected);

  expect(actualKeys.length).toBe(expectedKeys.length);

  const length = actualKeys.length;
  for (let i = 0; i < length; ++i) {
    const actualKey = actualKeys[i];
    const expectedKey = expectedKeys[i];

    expect(actualKey).toBe(expectedKey);

    expectListToBe(actual[Number(actualKey)], expected[Number(expectedKey)]);
  }
}


function isMap(x: any): x is Map<any, any> {
  return x instanceof Map;
}

function expectMapToBe(actual: Map<any, any>, expected: Map<any, any>): void {
  expect(actual.size).toBe(expected.size);

  for (const key of actual.keys()) {
    expect(expected.has(key)).toBe(true);
    expectListToBe(actual.get(key), expected.get(key));
  }
}


function expectPlainObjectToBe(actual: PlainObject, expected: PlainObject): void {
  const actualKeys = Object.keys(actual);
  const expectedKeys = Object.keys(expected);

  expect(actualKeys.length).toBe(expectedKeys.length);

  for (const key of actualKeys) {
    expect(expectedKeys).toContain(key);
    expectListToBe(actual[key], expected[key]);
  }
}


export function expectListToBe(actual: any, expected: any): void {
  if (Object.is(actual, expected)) {
    return;
  }

  if (isListOrArray(actual) && isListOrArray(expected)) {
    expectListOrArrayToBe(actual, expected);
  }
  else if (isMap(actual) && isMap(expected)) {
    expectMapToBe(actual, expected);
  }
  else if (isPlainObject(actual) && isPlainObject(expected)) {
    expectPlainObjectToBe(actual, expected);
  }
  else {
    throw new Error("Arguments' types are incompatible");
  }
}
