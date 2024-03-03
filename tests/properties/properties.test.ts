import { Properties } from "../../src/properties";


const $inheritedEnumerableSymbol = Symbol("inheritedEnumerable");
const $inheritedNonEnumerableSymbol = Symbol("inheritedNonEnumerable");
const $ownEnumerableSymbol = Symbol("ownEnumerable");
const $ownNonEnumerableSymbol = Symbol("ownNonEnumerable");

const prototype = Object.create(null, {
  inheritedEnumerable: { writable: true, enumerable: true },
  inheritedNonEnumerable: { writable: true, enumerable: false },
  [$inheritedEnumerableSymbol]: { writable: true, enumerable: true },
  [$inheritedNonEnumerableSymbol]: { writable: true, enumerable: false },
});

const $object = Object.create(prototype, {
  ownEnumerable: { writable: true, enumerable: true },
  ownNonEnumerable: { writable: true, enumerable: false },
  [$ownEnumerableSymbol]: { writable: true, enumerable: true },
  [$ownNonEnumerableSymbol]: { writable: true, enumerable: false },
});


describe("Properties", () => {

  // own, enumerable

  test("Properties.getOwnEnumerableNames()", () => {
    expect(Properties.getOwnEnumerableNames($object)).toEqual(["ownEnumerable"]);
  });

  test("Properties.getOwnEnumerableSymbols()", () => {
    expect(Properties.getOwnEnumerableSymbols($object)).toEqual([$ownEnumerableSymbol]);
  });

  test("Properties.getOwnEnumerable()", () => {
    expect(Properties.getOwnEnumerable($object)).toEqual(["ownEnumerable", $ownEnumerableSymbol]);
  });

  test("Properties.hasOwnEnumerable()", () => {
    expect(Properties.hasOwnEnumerable($object, "inheritedEnumerable")).toBe(false);
    expect(Properties.hasOwnEnumerable($object, "inheritedNonEnumerable")).toBe(false);
    expect(Properties.hasOwnEnumerable($object, "ownEnumerable")).toBe(true);
    expect(Properties.hasOwnEnumerable($object, "ownNonEnumerable")).toBe(false);
    expect(Properties.hasOwnEnumerable($object, $inheritedEnumerableSymbol)).toBe(false);
    expect(Properties.hasOwnEnumerable($object, $inheritedNonEnumerableSymbol)).toBe(false);
    expect(Properties.hasOwnEnumerable($object, $ownEnumerableSymbol)).toBe(true);
    expect(Properties.hasOwnEnumerable($object, $ownNonEnumerableSymbol)).toBe(false);
  });


  // own, non-enumerable

  test("Properties.getOwnNonEnumerableNames()", () => {
    expect(Properties.getOwnNonEnumerableNames($object)).toEqual(["ownNonEnumerable"]);
  });

  test("Properties.getOwnNonEnumerableSymbols()", () => {
    expect(Properties.getOwnNonEnumerableSymbols($object)).toEqual([$ownNonEnumerableSymbol]);
  });

  test("Properties.getOwnNonEnumerable()", () => {
    expect(Properties.getOwnNonEnumerable($object)).toEqual(["ownNonEnumerable", $ownNonEnumerableSymbol]);
  });

  test("Properties.hasOwnNonEnumerable()", () => {
    expect(Properties.hasOwnNonEnumerable($object, "inheritedEnumerable")).toBe(false);
    expect(Properties.hasOwnNonEnumerable($object, "inheritedNonEnumerable")).toBe(false);
    expect(Properties.hasOwnNonEnumerable($object, "ownEnumerable")).toBe(false);
    expect(Properties.hasOwnNonEnumerable($object, "ownNonEnumerable")).toBe(true);
    expect(Properties.hasOwnNonEnumerable($object, $inheritedEnumerableSymbol)).toBe(false);
    expect(Properties.hasOwnNonEnumerable($object, $inheritedNonEnumerableSymbol)).toBe(false);
    expect(Properties.hasOwnNonEnumerable($object, $ownEnumerableSymbol)).toBe(false);
    expect(Properties.hasOwnNonEnumerable($object, $ownNonEnumerableSymbol)).toBe(true);
  });


  // own

  test("Properties.getOwnNames()", () => {
    expect(Properties.getOwnNames($object)).toEqual(["ownEnumerable", "ownNonEnumerable"]);
  });

  test("Properties.getOwnSymbols()", () => {
    expect(Properties.getOwnSymbols($object)).toEqual([$ownEnumerableSymbol, $ownNonEnumerableSymbol]);
  });

  test("Properties.getOwn()", () => {
    expect(Properties.getOwn($object)).toEqual(["ownEnumerable", "ownNonEnumerable", $ownEnumerableSymbol, $ownNonEnumerableSymbol]);
  });

  test("Properties.hasOwn()", () => {
    expect(Properties.hasOwn($object, "inheritedEnumerable")).toBe(false);
    expect(Properties.hasOwn($object, "inheritedNonEnumerable")).toBe(false);
    expect(Properties.hasOwn($object, "ownEnumerable")).toBe(true);
    expect(Properties.hasOwn($object, "ownNonEnumerable")).toBe(true);
    expect(Properties.hasOwn($object, $inheritedEnumerableSymbol)).toBe(false);
    expect(Properties.hasOwn($object, $inheritedNonEnumerableSymbol)).toBe(false);
    expect(Properties.hasOwn($object, $ownEnumerableSymbol)).toBe(true);
    expect(Properties.hasOwn($object, $ownNonEnumerableSymbol)).toBe(true);
  });


  // inherited, enumerable

  test("Properties.getInheritedEnumerableNames()", () => {
    expect(Properties.getInheritedEnumerableNames($object)).toEqual(["inheritedEnumerable"]);
  });

  test("Properties.getInheritedEnumerableSymbols()", () => {
    expect(Properties.getInheritedEnumerableSymbols($object)).toEqual([$inheritedEnumerableSymbol]);
  });

  test("Properties.getInheritedEnumerable()", () => {
    expect(Properties.getInheritedEnumerable($object)).toEqual(["inheritedEnumerable", $inheritedEnumerableSymbol]);
  });

  test("Properties.hasInheritedEnumerable()", () => {
    expect(Properties.hasInheritedEnumerable($object, "inheritedEnumerable")).toBe(true);
    expect(Properties.hasInheritedEnumerable($object, "inheritedNonEnumerable")).toBe(false);
    expect(Properties.hasInheritedEnumerable($object, "ownEnumerable")).toBe(false);
    expect(Properties.hasInheritedEnumerable($object, "ownNonEnumerable")).toBe(false);
    expect(Properties.hasInheritedEnumerable($object, $inheritedEnumerableSymbol)).toBe(true);
    expect(Properties.hasInheritedEnumerable($object, $inheritedNonEnumerableSymbol)).toBe(false);
    expect(Properties.hasInheritedEnumerable($object, $ownEnumerableSymbol)).toBe(false);
    expect(Properties.hasInheritedEnumerable($object, $ownNonEnumerableSymbol)).toBe(false);
  });


  // inherited, non-enumerable

  test("Properties.getInheritedNonEnumerableNames()", () => {
    expect(Properties.getInheritedNonEnumerableNames($object)).toEqual(["inheritedNonEnumerable"]);
  });

  test("Properties.getInheritedNonEnumerableSymbols()", () => {
    expect(Properties.getInheritedNonEnumerableSymbols($object)).toEqual([$inheritedNonEnumerableSymbol]);
  });

  test("Properties.getInheritedNonEnumerable()", () => {
    expect(Properties.getInheritedNonEnumerable($object)).toEqual(["inheritedNonEnumerable", $inheritedNonEnumerableSymbol]);
  });

  test("Properties.hasInheritedNonEnumerable()", () => {
    expect(Properties.hasInheritedNonEnumerable($object, "inheritedEnumerable")).toBe(false);
    expect(Properties.hasInheritedNonEnumerable($object, "inheritedNonEnumerable")).toBe(true);
    expect(Properties.hasInheritedNonEnumerable($object, "ownEnumerable")).toBe(false);
    expect(Properties.hasInheritedNonEnumerable($object, "ownNonEnumerable")).toBe(false);
    expect(Properties.hasInheritedNonEnumerable($object, $inheritedEnumerableSymbol)).toBe(false);
    expect(Properties.hasInheritedNonEnumerable($object, $inheritedNonEnumerableSymbol)).toBe(true);
    expect(Properties.hasInheritedNonEnumerable($object, $ownEnumerableSymbol)).toBe(false);
    expect(Properties.hasInheritedNonEnumerable($object, $ownNonEnumerableSymbol)).toBe(false);
  });


  // inherited

  test("Properties.getInheritedNames()", () => {
    expect(Properties.getInheritedNames($object)).toEqual(["inheritedEnumerable", "inheritedNonEnumerable"]);
  });

  test("Properties.getInheritedSymbols()", () => {
    expect(Properties.getInheritedSymbols($object)).toEqual([$inheritedEnumerableSymbol, $inheritedNonEnumerableSymbol]);
  });

  test("Properties.getInherited()", () => {
    expect(Properties.getInherited($object)).toEqual(["inheritedEnumerable", "inheritedNonEnumerable", $inheritedEnumerableSymbol, $inheritedNonEnumerableSymbol]);
  });

  test("Properties.hasInherited()", () => {
    expect(Properties.hasInherited($object, "inheritedEnumerable")).toBe(true);
    expect(Properties.hasInherited($object, "inheritedNonEnumerable")).toBe(true);
    expect(Properties.hasInherited($object, "ownEnumerable")).toBe(false);
    expect(Properties.hasInherited($object, "ownNonEnumerable")).toBe(false);
    expect(Properties.hasInherited($object, $inheritedEnumerableSymbol)).toBe(true);
    expect(Properties.hasInherited($object, $inheritedNonEnumerableSymbol)).toBe(true);
    expect(Properties.hasInherited($object, $ownEnumerableSymbol)).toBe(false);
    expect(Properties.hasInherited($object, $ownNonEnumerableSymbol)).toBe(false);
  });


  // enumerable

  test("Properties.getEnumerableNames()", () => {
    expect(Properties.getEnumerableNames($object)).toEqual(["ownEnumerable", "inheritedEnumerable"]);
  });

  test("Properties.getEnumerableSymbols()", () => {
    expect(Properties.getEnumerableSymbols($object)).toEqual([$ownEnumerableSymbol, $inheritedEnumerableSymbol]);
  });

  test("Properties.getEnumerable()", () => {
    expect(Properties.getEnumerable($object)).toEqual(["ownEnumerable", $ownEnumerableSymbol, "inheritedEnumerable", $inheritedEnumerableSymbol]);
  });

  test("Properties.hasEnumerable()", () => {
    expect(Properties.hasEnumerable($object, "inheritedEnumerable")).toBe(true);
    expect(Properties.hasEnumerable($object, "inheritedNonEnumerable")).toBe(false);
    expect(Properties.hasEnumerable($object, "ownEnumerable")).toBe(true);
    expect(Properties.hasEnumerable($object, "ownNonEnumerable")).toBe(false);
    expect(Properties.hasEnumerable($object, $inheritedEnumerableSymbol)).toBe(true);
    expect(Properties.hasEnumerable($object, $inheritedNonEnumerableSymbol)).toBe(false);
    expect(Properties.hasEnumerable($object, $ownEnumerableSymbol)).toBe(true);
    expect(Properties.hasEnumerable($object, $ownNonEnumerableSymbol)).toBe(false);
  });


  // non-enumerable

  test("Properties.getNonEnumerableNames()", () => {
    expect(Properties.getNonEnumerableNames($object)).toEqual(["ownNonEnumerable", "inheritedNonEnumerable"]);
  });

  test("Properties.getNonEnumerableSymbols()", () => {
    expect(Properties.getNonEnumerableSymbols($object)).toEqual([$ownNonEnumerableSymbol, $inheritedNonEnumerableSymbol]);
  });

  test("Properties.getNonEnumerable()", () => {
    expect(Properties.getNonEnumerable($object)).toEqual(["ownNonEnumerable", $ownNonEnumerableSymbol, "inheritedNonEnumerable", $inheritedNonEnumerableSymbol]);
  });

  test("Properties.hasNonEnumerable()", () => {
    expect(Properties.hasNonEnumerable($object, "inheritedEnumerable")).toBe(false);
    expect(Properties.hasNonEnumerable($object, "inheritedNonEnumerable")).toBe(true);
    expect(Properties.hasNonEnumerable($object, "ownEnumerable")).toBe(false);
    expect(Properties.hasNonEnumerable($object, "ownNonEnumerable")).toBe(true);
    expect(Properties.hasNonEnumerable($object, $inheritedEnumerableSymbol)).toBe(false);
    expect(Properties.hasNonEnumerable($object, $inheritedNonEnumerableSymbol)).toBe(true);
    expect(Properties.hasNonEnumerable($object, $ownEnumerableSymbol)).toBe(false);
    expect(Properties.hasNonEnumerable($object, $ownNonEnumerableSymbol)).toBe(true);
  });


  // all

  test("Properties.getAllNames()", () => {
    expect(Properties.getAllNames($object)).toEqual(["ownEnumerable", "ownNonEnumerable", "inheritedEnumerable", "inheritedNonEnumerable"]);
  });

  test("Properties.getAllSymbols()", () => {
    expect(Properties.getAllSymbols($object)).toEqual([$ownEnumerableSymbol, $ownNonEnumerableSymbol, $inheritedEnumerableSymbol, $inheritedNonEnumerableSymbol]);
  });

  test("Properties.getAll()", () => {
    expect(Properties.getAll($object)).toEqual(["ownEnumerable", "ownNonEnumerable", $ownEnumerableSymbol, $ownNonEnumerableSymbol, "inheritedEnumerable", "inheritedNonEnumerable", $inheritedEnumerableSymbol, $inheritedNonEnumerableSymbol]);
  });

  test("Properties.has()", () => {
    expect(Properties.has($object, "inheritedEnumerable")).toBe(true);
    expect(Properties.has($object, "inheritedNonEnumerable")).toBe(true);
    expect(Properties.has($object, "ownEnumerable")).toBe(true);
    expect(Properties.has($object, "ownNonEnumerable")).toBe(true);
    expect(Properties.has($object, $inheritedEnumerableSymbol)).toBe(true);
    expect(Properties.has($object, $inheritedNonEnumerableSymbol)).toBe(true);
    expect(Properties.has($object, $ownEnumerableSymbol)).toBe(true);
    expect(Properties.has($object, $ownNonEnumerableSymbol)).toBe(true);
  });

});
