import {
  isNullish,
  isNullishOrEmpty,
  isNullishOrWhitespace,
  typeOf,
  sameValueZero
} from "../../src/helpers";


describe("Testing general helpers", () => {

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
    expect(isNullishOrEmpty(new Set<any>())).toBe(true);
    expect(isNullishOrEmpty(new Map<any, any>())).toBe(true);
    expect(isNullishOrEmpty({ size: 0 })).toBe(true);

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
    expect(typeOf([])).toBe("array");
    expect(typeOf(new Map<any, any>())).toBe("map");
    expect(typeOf(new Set<any>())).toBe("set");
    expect(typeOf({})).toBe("object");
  });

});
