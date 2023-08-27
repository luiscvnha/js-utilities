import { PropertyRetriever } from "../src/property-retriever";


describe("Testing PropertyRetriever", () => {

  const prototype = Object.create(null, {
    inheritedEnumerable: { writable: true, enumerable: true },
    inheritedNonEnumerable: { writable: true, enumerable: false },
  });

  const obj = Object.create(prototype, {
    ownEnumerable: { writable: true, enumerable: true },
    ownNonEnumerable: { writable: true, enumerable: false },
  });

  test("PropertyRetriever.getOwnEnumerable()", () => {
    expect(PropertyRetriever.getOwnEnumerable(obj)).toEqual(["ownEnumerable"]);
  });

  test("PropertyRetriever.getOwnNonEnumerable()", () => {
    expect(PropertyRetriever.getOwnNonEnumerable(obj)).toEqual(["ownNonEnumerable"]);
  });

  test("PropertyRetriever.getOwn()", () => {
    expect(PropertyRetriever.getOwn(obj)).toEqual(["ownEnumerable", "ownNonEnumerable"]);
  });

  test("PropertyRetriever.getInheritedEnumerable()", () => {
    expect(PropertyRetriever.getInheritedEnumerable(obj)).toEqual(["inheritedEnumerable"]);
  });

  test("PropertyRetriever.getInheritedNonEnumerable()", () => {
    expect(PropertyRetriever.getInheritedNonEnumerable(obj)).toEqual(["inheritedNonEnumerable"]);
  });

  test("PropertyRetriever.getInherited()", () => {
    expect(PropertyRetriever.getInherited(obj)).toEqual(["inheritedEnumerable", "inheritedNonEnumerable"]);
  });

  test("PropertyRetriever.getEnumerable()", () => {
    expect(PropertyRetriever.getEnumerable(obj)).toEqual(["ownEnumerable", "inheritedEnumerable"]);
  });

  test("PropertyRetriever.getNonEnumerable()", () => {
    expect(PropertyRetriever.getNonEnumerable(obj)).toEqual(["ownNonEnumerable", "inheritedNonEnumerable"]);
  });

  test("PropertyRetriever.getAll()", () => {
    expect(PropertyRetriever.getAll(obj)).toEqual(["ownEnumerable", "ownNonEnumerable", "inheritedEnumerable", "inheritedNonEnumerable"]);
  });

});
