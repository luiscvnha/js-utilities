import {
  isNullish,
  isNullishOrEmpty,
  isNullishOrWhitespace,
  typeOf,
  sameValueZero,
  isArrayLike,
  isIterable,
  isAsyncIterable
} from "../src/helpers";
import { List } from "../src/list";


describe("Testing helpers", () => {

  test("isNullish", () => {
    expect(isNullish(null)).toBe(true);
    expect(isNullish(undefined)).toBe(true);

    expect(isNullish(" ")).toBe(false);
    expect(isNullish(false)).toBe(false);
    expect(isNullish(0)).toBe(false);
    expect(isNullish(-0)).toBe(false);
    expect(isNullish(0n)).toBe(false);
    expect(isNullish("")).toBe(false);
    expect(isNullish(NaN)).toBe(false);
    expect(isNullish(true)).toBe(false);
    expect(isNullish({})).toBe(false);
    expect(isNullish([])).toBe(false);
    expect(isNullish(42)).toBe(false);
    expect(isNullish("0")).toBe(false);
    expect(isNullish("false")).toBe(false);
    expect(isNullish(new Date())).toBe(false);
    expect(isNullish(-42)).toBe(false);
    expect(isNullish(12n)).toBe(false);
    expect(isNullish(3.14)).toBe(false);
    expect(isNullish(-3.14)).toBe(false);
    expect(isNullish(Infinity)).toBe(false);
    expect(isNullish(-Infinity)).toBe(false);
  });

  test("isNullishOrEmpty", () => {
    expect(isNullishOrEmpty(null)).toBe(true);
    expect(isNullishOrEmpty(undefined)).toBe(true);
    expect(isNullishOrEmpty("")).toBe(true);
    expect(isNullishOrEmpty([])).toBe(true);
    expect(isNullishOrEmpty({ length: 0 })).toBe(true);

    expect(isNullishOrEmpty(" ")).toBe(false);
    expect(isNullishOrEmpty([1])).toBe(false);
    expect(isNullishOrEmpty(false)).toBe(false);
    expect(isNullishOrEmpty(0)).toBe(false);
    expect(isNullishOrEmpty(-0)).toBe(false);
    expect(isNullishOrEmpty(0n)).toBe(false);
    expect(isNullishOrEmpty(NaN)).toBe(false);
    expect(isNullishOrEmpty(true)).toBe(false);
    expect(isNullishOrEmpty({})).toBe(false);
    expect(isNullishOrEmpty(42)).toBe(false);
    expect(isNullishOrEmpty("0")).toBe(false);
    expect(isNullishOrEmpty("false")).toBe(false);
    expect(isNullishOrEmpty(new Date())).toBe(false);
    expect(isNullishOrEmpty(-42)).toBe(false);
    expect(isNullishOrEmpty(12n)).toBe(false);
    expect(isNullishOrEmpty(3.14)).toBe(false);
    expect(isNullishOrEmpty(-3.14)).toBe(false);
    expect(isNullishOrEmpty(Infinity)).toBe(false);
    expect(isNullishOrEmpty(-Infinity)).toBe(false);
  });

  test("isNullishOrWhitespace", () => {
    expect(isNullishOrWhitespace(null)).toBe(true);
    expect(isNullishOrWhitespace(undefined)).toBe(true);
    expect(isNullishOrWhitespace("")).toBe(true);
    expect(isNullishOrWhitespace(" ")).toBe(true);

    expect(isNullishOrWhitespace(false)).toBe(false);
    expect(isNullishOrWhitespace(0)).toBe(false);
    expect(isNullishOrWhitespace(-0)).toBe(false);
    expect(isNullishOrWhitespace(0n)).toBe(false);
    expect(isNullishOrWhitespace(NaN)).toBe(false);
    expect(isNullishOrWhitespace(true)).toBe(false);
    expect(isNullishOrWhitespace({})).toBe(false);
    expect(isNullishOrWhitespace([])).toBe(false);
    expect(isNullishOrWhitespace(42)).toBe(false);
    expect(isNullishOrWhitespace("0")).toBe(false);
    expect(isNullishOrWhitespace("false")).toBe(false);
    expect(isNullishOrWhitespace(new Date())).toBe(false);
    expect(isNullishOrWhitespace(-42)).toBe(false);
    expect(isNullishOrWhitespace(12n)).toBe(false);
    expect(isNullishOrWhitespace(3.14)).toBe(false);
    expect(isNullishOrWhitespace(-3.14)).toBe(false);
    expect(isNullishOrWhitespace(Infinity)).toBe(false);
    expect(isNullishOrWhitespace(-Infinity)).toBe(false);
  });

  test("typeOf", () => {
    // undefined
    expect(typeOf(undefined)).toBe(typeof undefined);

    // boolean
    expect(typeOf(true)).toBe(typeof true);

    // number
    expect(typeOf(1)).toBe(typeof 1);

    // bigint
    expect(typeOf(1n)).toBe(typeof 1n);

    // string
    expect(typeOf("")).toBe(typeof "");

    // symbol
    expect(typeOf(Symbol())).toBe(typeof Symbol());

    // function
    expect(typeOf(() => {})).toBe(typeof (() => {}));
    expect(typeOf(Date)).toBe(typeof Date);

    // object
    expect(typeOf(null)).toBe("null");
    expect(typeOf(new Date())).toBe("date");
    expect(typeOf(new String())).toBe("string");
    expect(typeOf(new Number())).toBe("number");
    expect(typeOf(new Array<any>())).toBe("array");
    expect(typeOf(new Map<any, any>())).toBe("map");
    expect(typeOf(new Set<any>())).toBe("set");
  });

  test("sameValueZero", () => {
    expect(sameValueZero(undefined, undefined)).toBe(true);
    expect(sameValueZero(null, null)).toBe(true);
    expect(sameValueZero(true, true)).toBe(true);
    expect(sameValueZero(false, false)).toBe(true);
    expect(sameValueZero("foo", "foo")).toBe(true);
    expect(sameValueZero(0, 0)).toBe(true);
    expect(sameValueZero(+0, -0)).toBe(true);
    expect(sameValueZero(+0, 0)).toBe(true);
    expect(sameValueZero(-0, 0)).toBe(true);
    expect(sameValueZero(0n, -0n)).toBe(true);
    expect(sameValueZero(NaN, NaN)).toBe(true);

    expect(sameValueZero(0, false)).toBe(false);
    expect(sameValueZero("", false)).toBe(false);
    expect(sameValueZero("", 0)).toBe(false);
    expect(sameValueZero("0", 0)).toBe(false);
    expect(sameValueZero("17", 17)).toBe(false);
    expect(sameValueZero([1, 2], "1,2")).toBe(false);
    expect(sameValueZero(new String("foo"), "foo")).toBe(false);
    expect(sameValueZero(null, undefined)).toBe(false);
    expect(sameValueZero(null, false)).toBe(false);
    expect(sameValueZero(undefined, false)).toBe(false);
    expect(sameValueZero({ foo: "bar" }, { foo: "bar" })).toBe(false);
    expect(sameValueZero(new String("foo"), new String("foo"))).toBe(false);
    expect(sameValueZero(0, null)).toBe(false);
    expect(sameValueZero(0, NaN)).toBe(false);
    expect(sameValueZero("foo", NaN)).toBe(false);
  });

  test("isIterable", () => {
    expect(isIterable([])).toBe(true);
    expect(isIterable([1, 2, 3])).toBe(true);
    expect(isIterable(new Array<any>())).toBe(true);
    expect(isIterable(new Array<any>(3))).toBe(true);
    expect(isIterable(new Array<any>(1, 2, 3))).toBe(true);
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
    expect(isIterable(0n)).toBe(false);
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
    expect(isAsyncIterable(new Array<any>())).toBe(false);
    expect(isAsyncIterable(new Array<any>(3))).toBe(false);
    expect(isAsyncIterable(new Array<any>(1, 2, 3))).toBe(false);
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
    expect(isAsyncIterable(0n)).toBe(false);
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
    expect(isArrayLike(new Array<any>())).toBe(true);
    expect(isArrayLike(new Array<any>(3))).toBe(true);
    expect(isArrayLike(new Array<any>(1, 2, 3))).toBe(true);
    expect(isArrayLike(new List<any>())).toBe(true);
    expect(isArrayLike(new List<any>(1, 2, 3))).toBe(true);
    expect(isArrayLike({ length: 0 })).toBe(true);
    expect(isArrayLike({ 0: 1, 1: 2, 2: 3, length: 3 })).toBe(true);
    expect(isArrayLike("")).toBe(true);
    expect(isArrayLike("123")).toBe(true);
    expect(isArrayLike(new String())).toBe(true);
    expect(isArrayLike(new String("123"))).toBe(true);

    expect(isArrayLike(null)).toBe(false);
    expect(isArrayLike(undefined)).toBe(false);
    expect(isArrayLike(0)).toBe(false);
    expect(isArrayLike(NaN)).toBe(false);
    expect(isArrayLike(Infinity)).toBe(false);
    expect(isArrayLike(new Number(0))).toBe(false);
    expect(isArrayLike(0n)).toBe(false);
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
