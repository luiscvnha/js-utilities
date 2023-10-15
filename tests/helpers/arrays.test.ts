import { isArrayLike, isIterable, isAsyncIterable } from "../../src/helpers";
import { List } from "../../src/list";


describe("Testing array helpers", () => {

  test("isIterable", () => {
    expect(isIterable([])).toBe(true);
    expect(isIterable([1, 2, 3])).toBe(true);
    expect(isIterable(new Array<any>(3))).toBe(true);
    expect(isIterable(new List<any>())).toBe(true);
    expect(isIterable(new List<any>(1, 2, 3))).toBe(true);
    expect(isIterable(new Map<any, any>())).toBe(true);
    expect(isIterable(new Set<any>())).toBe(true);
    expect(isIterable("")).toBe(true);
    expect(isIterable("123")).toBe(true);
    expect(isIterable(new String())).toBe(true);
    expect(isIterable(new String("123"))).toBe(true);

    expect(isIterable(null)).toBe(false);
    expect(isIterable(undefined)).toBe(false);
    expect(isIterable(0)).toBe(false);
    expect(isIterable(NaN)).toBe(false);
    expect(isIterable(Infinity)).toBe(false);
    expect(isIterable(new Number(0))).toBe(false);
    expect(isIterable(BigInt(0))).toBe(false);
    expect(isIterable(true)).toBe(false);
    expect(isIterable(false)).toBe(false);
    expect(isIterable(new Boolean(true))).toBe(false);
    expect(isIterable(new Boolean(false))).toBe(false);
    expect(isIterable(Symbol())).toBe(false);
    expect(isIterable({})).toBe(false);
    expect(isIterable({ length: 0 })).toBe(false);
    expect(isIterable({ 0: 1, 1: 2, 2: 3, length: 3 })).toBe(false);
    expect(isIterable(new Object())).toBe(false);
  });

  test("isAsyncIterable", () => {
    expect(isAsyncIterable(new ReadableStream())).toBe(true);

    expect(isAsyncIterable([])).toBe(false);
    expect(isAsyncIterable([1, 2, 3])).toBe(false);
    expect(isAsyncIterable(new Array<any>(3))).toBe(false);
    expect(isAsyncIterable(new List<any>())).toBe(false);
    expect(isAsyncIterable(new List<any>(1, 2, 3))).toBe(false);
    expect(isAsyncIterable(new Map<any, any>())).toBe(false);
    expect(isAsyncIterable(new Set<any>())).toBe(false);
    expect(isAsyncIterable("")).toBe(false);
    expect(isAsyncIterable("123")).toBe(false);
    expect(isAsyncIterable(new String())).toBe(false);
    expect(isAsyncIterable(new String("123"))).toBe(false);
    expect(isAsyncIterable(null)).toBe(false);
    expect(isAsyncIterable(undefined)).toBe(false);
    expect(isAsyncIterable(0)).toBe(false);
    expect(isAsyncIterable(NaN)).toBe(false);
    expect(isAsyncIterable(Infinity)).toBe(false);
    expect(isAsyncIterable(new Number(0))).toBe(false);
    expect(isAsyncIterable(BigInt(0))).toBe(false);
    expect(isAsyncIterable(true)).toBe(false);
    expect(isAsyncIterable(false)).toBe(false);
    expect(isAsyncIterable(new Boolean(true))).toBe(false);
    expect(isAsyncIterable(new Boolean(false))).toBe(false);
    expect(isAsyncIterable(Symbol())).toBe(false);
    expect(isAsyncIterable({})).toBe(false);
    expect(isAsyncIterable({ length: 0 })).toBe(false);
    expect(isAsyncIterable({ 0: 1, 1: 2, 2: 3, length: 3 })).toBe(false);
    expect(isAsyncIterable(new Object())).toBe(false);
  });

  test("isArrayLike", () => {
    expect(isArrayLike([])).toBe(true);
    expect(isArrayLike([1, 2, 3])).toBe(true);
    expect(isArrayLike(new Array<any>(3))).toBe(true);
    expect(isArrayLike(new List<any>())).toBe(true);
    expect(isArrayLike(new List<any>(1, 2, 3))).toBe(true);
    expect(isArrayLike({ length: 0 })).toBe(true);
    expect(isArrayLike({ 0: 1, 1: 2, 2: 3, length: 3 })).toBe(true);

    expect(isArrayLike("")).toBe(false);
    expect(isArrayLike("123")).toBe(false);
    expect(isArrayLike(new String())).toBe(false);
    expect(isArrayLike(new String("123"))).toBe(false);
    expect(isArrayLike(null)).toBe(false);
    expect(isArrayLike(undefined)).toBe(false);
    expect(isArrayLike(0)).toBe(false);
    expect(isArrayLike(NaN)).toBe(false);
    expect(isArrayLike(Infinity)).toBe(false);
    expect(isArrayLike(new Number(0))).toBe(false);
    expect(isArrayLike(BigInt(0))).toBe(false);
    expect(isArrayLike(true)).toBe(false);
    expect(isArrayLike(false)).toBe(false);
    expect(isArrayLike(new Boolean(true))).toBe(false);
    expect(isArrayLike(new Boolean(false))).toBe(false);
    expect(isArrayLike(Symbol())).toBe(false);
    expect(isArrayLike({})).toBe(false);
    expect(isArrayLike({ length: -1 })).toBe(false);
    expect(isArrayLike({ length: 1 })).toBe(false);
    expect(isArrayLike({ 0: 1 })).toBe(false);
    expect(isArrayLike(new Object())).toBe(false);
    expect(isArrayLike(new Map<any, any>())).toBe(false);
    expect(isArrayLike(new Set<any>())).toBe(false);
  });

});
