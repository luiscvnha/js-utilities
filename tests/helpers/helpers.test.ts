import {
  typeOf,
  sameValueZero
} from "../../src/helpers";


describe("helpers/", () => {

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
    expect(sameValueZero(BigInt(0), BigInt(-0))).toBe(true);
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
    expect(typeOf(false)).toBe(typeof false);

    // number
    expect(typeOf(1)).toBe(typeof 1);

    // bigint
    expect(typeOf(BigInt(1))).toBe(typeof BigInt(1));

    // string
    expect(typeOf("")).toBe(typeof "");

    // symbol
    expect(typeOf(Symbol())).toBe(typeof Symbol());

    // function
    expect(typeOf(() => {})).toBe(typeof (() => {}));
    expect(typeOf(Array)).toBe(typeof Array);
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
