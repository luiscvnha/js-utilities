import { List } from "../../src/list";
import { Compare } from "../../src/compare";
import { expectToEqual } from "./test-helpers";


describe("Testing List", () => {

  test("List() constructor", () => {
    // #1
    expectToEqual(new List(), []);

    // #2
    expectToEqual(new List(0), [0]);

    // #3
    expectToEqual(new List(1, 2, 3), [1, 2, 3]);
  });

  test("List.prototype.append()", () => {
    const list = new List();

    // #1
    let length = list.append();

    expectToEqual(list, []);
    expect(length).toBe(0);

    // #2
    length = list.append(1);

    expectToEqual(list, [1]);
    expect(length).toBe(1);

    // #3
    length = list.append(2, 3);

    expectToEqual(list, [1, 2, 3]);
    expect(length).toBe(3);
  });

  test("List.prototype.prepend()", () => {
    const list = new List();

    // #1
    let length = list.prepend();

    expectToEqual(list, []);
    expect(length).toBe(0);

    // #2
    length = list.prepend(3);

    expectToEqual(list, [3]);
    expect(length).toBe(1);

    // #3
    length = list.prepend(1, 2);

    expectToEqual(list, [1, 2, 3]);
    expect(length).toBe(3);
  });

  test("List.prototype.removeLast()", () => {
    const list = new List(1, 2, 3);

    // #1
    let last = list.removeLast();

    expectToEqual(list, [1, 2]);
    expect(last).toBe(3);

    // #2
    last = list.removeLast();

    expectToEqual(list, [1]);
    expect(last).toBe(2);

    // #3
    last = list.removeLast();

    expectToEqual(list, []);
    expect(last).toBe(1);

    // #4
    last = list.removeLast();

    expectToEqual(list, []);
    expect(last).toBe(undefined);
  });

  test("List.prototype.removeFirst()", () => {
    const list = new List(1, 2, 3);

    // #1
    let first = list.removeFirst();

    expectToEqual(list, [2, 3]);
    expect(first).toBe(1);

    // #2
    first = list.removeFirst();

    expectToEqual(list, [3]);
    expect(first).toBe(2);

    // #3
    first = list.removeFirst();

    expectToEqual(list, []);
    expect(first).toBe(3);

    // #4
    first = list.removeFirst();

    expectToEqual(list, []);
    expect(first).toBe(undefined);
  });

  test("List.prototype.remove()", () => {
    // #1
    let list = new List(1, 2, 3, 2, 1);
    let removed = list.remove(1);

    expectToEqual(list, [2, 3, 2, 1]);
    expect(removed).toBe(true);

    // #2
    list = new List(1, 2, 3, 2, 1);
    removed = list.remove(2);

    expectToEqual(list, [1, 3, 2, 1]);
    expect(removed).toBe(true);

    // #3
    list = new List(1, 2, 3, 2, 1);
    removed = list.remove(3);

    expectToEqual(list, [1, 2, 2, 1]);
    expect(removed).toBe(true);

    // #4
    list = new List(1, 2, 3, 2, 1);
    removed = list.remove(4);

    expectToEqual(list, [1, 2, 3, 2, 1]);
    expect(removed).toBe(false);
  });

  test("List.prototype.removeAll()", () => {
    // #1
    let list = new List(1, 2, 3, 2, 1);
    let removed = list.removeAll(1);

    expectToEqual(list, [2, 3, 2]);
    expect(removed).toBe(2);

    // #2
    list = new List(1, 2, 3, 2, 1);
    removed = list.removeAll(2);

    expectToEqual(list, [1, 3, 1]);
    expect(removed).toBe(2);

    // #3
    list = new List(1, 2, 3, 2, 1);
    removed = list.removeAll(3);

    expectToEqual(list, [1, 2, 2, 1]);
    expect(removed).toBe(1);

    // #4
    list = new List(1, 2, 3, 2, 1);
    removed = list.removeAll(4);

    expectToEqual(list, [1, 2, 3, 2, 1]);
    expect(removed).toBe(0);
  });

  test("List.prototype.removeIf()", () => {
    // #1
    let list = new List(1, 2, 3, 2, 1);
    let removed = list.removeIf(v => v === 2);

    expectToEqual(list, [1, 3, 1]);
    expectToEqual(removed, [2, 2]);

    // #2
    list = new List(1, -5, 3, 5, -4);
    removed = list.removeIf(v => v * v === 25);

    expectToEqual(list, [1, 3, -4]);
    expectToEqual(removed, [-5, 5]);

    // #3
    list = new List(1, 5, 3, 6, 4);
    removed = list.removeIf(v => v < 0);

    expectToEqual(list, [1, 5, 3, 6, 4]);
    expectToEqual(removed, []);
  });

  test("List.prototype.fill()", () => {
    // #1
    let list = new List(1, 2, 3);
    let returnedList = list.fill(0);

    expectToEqual(list, [0, 0, 0]);
    expect(returnedList).toBe(list);

    // #2
    list = new List();
    returnedList = list.fill(0);

    expectToEqual(list, []);
    expect(returnedList).toBe(list);

    // #3
    list = new List(1, 2, 3, 4, 5);
    returnedList = list.fill(0, 2);

    expectToEqual(list, [1, 2, 0, 0, 0]);
    expect(returnedList).toBe(list);

    // #4
    list = new List(1, 2, 3, 4, 5);
    returnedList = list.fill(0, 1, 3);

    expectToEqual(list, [1, 0, 0, 4, 5]);
    expect(returnedList).toBe(list);

    // #5
    list = new List(1, 2, 3, 4, 5);
    returnedList = list.fill(0, -2);

    expectToEqual(list, [1, 2, 3, 0, 0]);
    expect(returnedList).toBe(list);

    // #6
    list = new List(1, 2, 3, 4, 5);
    returnedList = list.fill(0, -3, -2);

    expectToEqual(list, [1, 2, 0, 4, 5]);
    expect(returnedList).toBe(list);
  });

  test("List.prototype.isEmpty", () => {
    // #1
    expect((new List()).isEmpty()).toBe(true);

    // #2
    expect((new List(1)).isEmpty()).toBe(false);

    // #3
    expect((new List(1, 2, 3)).isEmpty()).toBe(false);
  });

  test("List.prototype.clear()", () => {
    // #1
    const list = new List(1, 2, 3);
    list.clear();

    expectToEqual(list, []);
  });

  test("List.prototype.at()", () => {
    const list = new List(1, 2, 3);

    // #1
    expect(list.at(-4)).toBe(undefined);

    // #2
    expect(list.at(-3)).toBe(1);

    // #3
    expect(list.at(-2)).toBe(2);

    // #4
    expect(list.at(-1)).toBe(3);

    // #5
    expect(list.at(0)).toBe(1);

    // #6
    expect(list.at(1)).toBe(2);

    // #7
    expect(list.at(2)).toBe(3);

    // #8
    expect(list.at(3)).toBe(undefined);
  });

  test("List.prototype.with()", () => {
    const list = new List(1, 2, 3);

    // #1
    expect(() => list.with(-4, 0)).toThrowError(RangeError);

    // #2
    expect(() => list.with(3, 0)).toThrowError(RangeError);

    // #3
    const newList = list.with(0, 4);

    expectToEqual(newList, [4, 2, 3]);
    expect(newList).not.toBe(list);
  });

  test("List.prototype.has()", () => {
    const list = new List(1, 2, 3, NaN, -0);

    // #1
    expect(list.has(2)).toBe(true);

    // #2
    expect(list.has(2, undefined)).toBe(true);

    // #3
    expect(list.has(2, -10)).toBe(true);

    // #4
    expect(list.has(2, 10)).toBe(false);

    // #5
    expect(list.has(2, 3)).toBe(false);

    // #6
    expect(list.has(2, -3)).toBe(false);

    // #7
    expect(list.has(NaN)).toBe(true);

    // #8
    expect(list.has(0)).toBe(true);

    // #9
    expect(list.has(+0)).toBe(true);
  });

  test("List.prototype.indexOf()", () => {
    const list = new List(1, 2, 3, NaN, -0, 2, 5, 6);

    // #1
    expect(list.indexOf(2)).toBe(1);

    // #2
    expect(list.indexOf(2, undefined)).toBe(1);

    // #3
    expect(list.indexOf(2, -10)).toBe(1);

    // #4
    expect(list.indexOf(2, 10)).toBe(undefined);

    // #5
    expect(list.indexOf(2, 3)).toBe(5);

    // #6
    expect(list.indexOf(2, -4)).toBe(5);

    // #7
    expect(list.indexOf(2, 6)).toBe(undefined);

    // #8
    expect(list.indexOf(2, -2)).toBe(undefined);

    // #9
    expect(list.indexOf(NaN)).toBe(3);

    // #10
    expect(list.indexOf(0)).toBe(4);

    // #11
    expect(list.indexOf(+0)).toBe(4);
  });

  test("List.prototype.lastIndexOf()", () => {
    const list = new List(1, 2, 3, NaN, -0, 3, 5, 6);

    // #1
    expect(list.lastIndexOf(3)).toBe(5);

    // #2
    expect(list.lastIndexOf(3, undefined)).toBe(5);

    // #3
    expect(list.lastIndexOf(3, -10)).toBe(undefined);

    // #4
    expect(list.lastIndexOf(3, 10)).toBe(5);

    // #5
    expect(list.lastIndexOf(3, 3)).toBe(2);

    // #6
    expect(list.lastIndexOf(3, -4)).toBe(2);

    // #7
    expect(list.lastIndexOf(3, 1)).toBe(undefined);

    // #8
    expect(list.lastIndexOf(3, -7)).toBe(undefined);

    // #9
    expect(list.lastIndexOf(NaN)).toBe(3);

    // #10
    expect(list.lastIndexOf(0)).toBe(4);

    // #11
    expect(list.lastIndexOf(+0)).toBe(4);
  });

  test("List.prototype[@@iterator]()", () => {
    const list = new List(4, 5, 6);
    const iterableIterator = list[Symbol.iterator]();

    // #1
    let result = iterableIterator.next();

    expect(result.value).toBe(4);
    expect(result.done).toBe(false);

    // #2
    result = iterableIterator.next();

    expect(result.value).toBe(5);
    expect(result.done).toBe(false);

    // #3
    result = iterableIterator.next();

    expect(result.value).toBe(6);
    expect(result.done).toBe(false);

    // #4
    result = iterableIterator.next();

    expect(result.value).toBe(undefined);
    expect(result.done).toBe(true);
  });

  test("List.prototype.keys()", () => {
    const list = new List(4, 5, 6);
    const iterableIterator = list.keys();

    // #1
    let result = iterableIterator.next();

    expect(result.value).toBe(0);
    expect(result.done).toBe(false);

    // #2
    result = iterableIterator.next();

    expect(result.value).toBe(1);
    expect(result.done).toBe(false);

    // #3
    result = iterableIterator.next();

    expect(result.value).toBe(2);
    expect(result.done).toBe(false);

    // #4
    result = iterableIterator.next();

    expect(result.value).toBe(undefined);
    expect(result.done).toBe(true);
  });

  test("List.prototype.values()", () => {
    const list = new List(4, 5, 6);
    const iterableIterator = list.values();

    // #1
    let result = iterableIterator.next();

    expect(result.value).toBe(4);
    expect(result.done).toBe(false);

    // #2
    result = iterableIterator.next();

    expect(result.value).toBe(5);
    expect(result.done).toBe(false);

    // #3
    result = iterableIterator.next();

    expect(result.value).toBe(6);
    expect(result.done).toBe(false);

    // #4
    result = iterableIterator.next();

    expect(result.value).toBe(undefined);
    expect(result.done).toBe(true);
  });

  test("List.prototype.entries()", () => {
    const list = new List(4, 5, 6);
    const iterableIterator = list.entries();

    // #1
    let result = iterableIterator.next();

    expect(result.value[0]).toBe(0);
    expect(result.value[1]).toBe(4);
    expect(result.done).toBe(false);

    // #2
    result = iterableIterator.next();

    expect(result.value[0]).toBe(1);
    expect(result.value[1]).toBe(5);
    expect(result.done).toBe(false);

    // #3
    result = iterableIterator.next();

    expect(result.value[0]).toBe(2);
    expect(result.value[1]).toBe(6);
    expect(result.done).toBe(false);

    // #4
    result = iterableIterator.next();

    expect(result.value).toBe(undefined);
    expect(result.done).toBe(true);
  });

  test("List.prototype.all()", () => {
    const list1 = new List(4, 2, 6);
    const list2 = new List(1, 3, 5);

    // #1
    expect(list1.all(v => v % 2 === 0)).toBe(true);

    // #2
    expect(list2.all(v => v % 2 === 0)).toBe(false);

    // #3
    expect(list1.all((v, i, l) => i === 0 || v === l[i-1] + 2)).toBe(false);

    // #4
    expect(list2.all((v, i, l) => i === 0 || v === l[i-1] + 2)).toBe(true);
  });

  test("List.prototype.some()", () => {
    const list = new List(4, 2, 6);

    // #1
    expect(list.some(v => v < 4)).toBe(true);

    // #2
    expect(list.some(v => v === 2)).toBe(true);

    // #3
    expect(list.some(v => v > 6)).toBe(false);
  });

  test("List.prototype.find()", () => {
    const list = new List(1, 3, 4, 5, 6);

    // #1
    expect(list.find(n => n % 2 === 0)).toBe(4);

    // #2
    expect(list.find(n => n === 3)).toBe(3);

    // #3
    expect(list.find(n => n > 10)).toBe(undefined);
  });

  test("List.prototype.findLast()", () => {
    const list = new List(1, 3, 4, 5, 6, 7);

    // #1
    expect(list.findLast(n => n % 2 === 0)).toBe(6);

    // #2
    expect(list.findLast(n => n === 3)).toBe(3);

    // #3
    expect(list.findLast(n => n > 10)).toBe(undefined);
  });

  test("List.prototype.findIndex()", () => {
    const list = new List(1, 3, 4, 5, 6);

    // #1
    expect(list.findIndex(n => n % 2 === 0)).toBe(2);

    // #2
    expect(list.findIndex(n => n === 3)).toBe(1);

    // #3
    expect(list.findIndex(n => n > 10)).toBe(undefined);
  });

  test("List.prototype.findLastIndex()", () => {
    const list = new List(1, 3, 4, 5, 6, 7);

    // #1
    expect(list.findLastIndex(n => n % 2 === 0)).toBe(4);

    // #2
    expect(list.findLastIndex(n => n === 3)).toBe(1);

    // #3
    expect(list.findLastIndex(n => n > 10)).toBe(undefined);
  });

  test("List.prototype.forEach()", () => {
    // #1
    const list = new List(1, 3, 4, 5, 6);
    let calls = 0;

    const returnedList = list.forEach((value, index, l) => {
      expect(value).toBe(l[index]);
      expect(index).toBe(calls);
      expect(l).toBe(list);

      ++calls;
    });

    expect(calls).toBe(list.length);
    expect(returnedList).toBe(list);
  });

  test("List.prototype.reduce()", () => {
    const list = new List(24, 4, 3, 2);

    // #1
    expect(list.reduce((previous, current) => previous / current)).toBe(1);

    // #2
    expect(list.reduce((previous, current) => previous / current, 576)).toBe(1);

    // #3
    expect(list.reduce((previous, current) => previous + current)).toBe(33);

    // #4
    expect(list.reduce((previous, current) => previous + current, 1)).toBe(34);
  });

  test("List.prototype.reduceRight()", () => {
    const list = new List(2, 3, 4, 24);

    // #1
    expect(list.reduceRight((previous, current) => previous / current)).toBe(1);

    // #2
    expect(list.reduceRight((previous, current) => previous / current, 576)).toBe(1);

    // #3
    expect(list.reduceRight((previous, current) => previous + current)).toBe(33);

    // #4
    expect(list.reduceRight((previous, current) => previous + current, 1)).toBe(34);
  });

  test("List.prototype.concat()", () => {
    // #1
    let list = new List(1, 2);
    let newList = list.concat();

    expectToEqual(newList, [1, 2]);
    expect(newList).not.toBe(list);

    // #2
    list = new List(1, 2);
    newList = list.concat(new List(3, 4, 5));

    expectToEqual(newList, [1, 2, 3, 4, 5]);
    expect(newList).not.toBe(list);

    // #3
    list = new List(1, 2);
    newList = list.concat(new List(3), new List(4, 5, 6));

    expectToEqual(newList, [1, 2, 3, 4, 5, 6]);
    expect(newList).not.toBe(list);

    // #4
    list = new List(1);
    newList = list.concat(2, 3, 4);

    expectToEqual(newList, [1, 2, 3, 4]);
    expect(newList).not.toBe(list);

    // #5
    list = new List(1);
    newList = list.concat(new List(2, 3), 4, 5, new List(6));

    expectToEqual(newList, [1, 2, 3, 4, 5, 6]);
    expect(newList).not.toBe(list);
  });

  test("List.prototype.filter()", () => {
    const list = new List(1, 2, 3, 4, 5, 6);

    // #1
    let newList = list.filter(v => v % 2 === 0);

    expectToEqual(newList, [2, 4, 6]);
    expect(newList).not.toBe(list);

    // #2
    newList = list.filter(v => v < 4);

    expectToEqual(newList, [1, 2, 3]);
    expect(newList).not.toBe(list);
  });

  test("List.prototype.map()", () => {
    const list = new List(1, 2, 3, 4, 5, 6);

    // #1
    let newList = list.map(v => v * 2);

    expectToEqual(newList, [2, 4, 6, 8, 10, 12]);
    expect(newList).not.toBe(list);

    // #2
    newList = list.map(v => v + 3);

    expectToEqual(newList, [4, 5, 6, 7, 8, 9]);
    expect(newList).not.toBe(list);
  });

  test("List.prototype.flat()", () => {
    // #1
    let list = new List<any>(1, 2, new List<any>(3, 4));
    let newList = list.flat();

    expectToEqual(newList, [1, 2, 3, 4]);
    expect(newList).not.toBe(list);

    // #2
    list = new List<any>(1, 2, new List<any>(3, 4, new List<any>(5, 6)));
    newList = list.flat();

    expectToEqual(newList, [1, 2, 3, 4, [5, 6]]);
    expect(newList).not.toBe(list);

    // #3
    list = new List<any>(1, 2, new List<any>(3, 4, new List<any>(5, 6)));
    newList = list.flat(2);

    expectToEqual(newList, [1, 2, 3, 4, 5, 6]);
    expect(newList).not.toBe(list);

    // #4
    list = new List<any>(1, 2, new List<any>(3, 4, new List<any>(5, 6, new List<any>(7, 8, new List<any>(9, 10)))));
    newList = list.flat(Infinity);

    expectToEqual(newList, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(newList).not.toBe(list);
  });

  test("List.prototype.flatMap()", () => {
    const list1 = new List(1, 2, 3, 4);
    const list2 = new List("it's Sunny in", "", "California");

    // #1
    let newList = list1.flatMap<any>(v => new List(2*v));

    expectToEqual(newList, [2, 4, 6, 8]);
    expect(newList).not.toBe(list1);

    // #2
    newList = list1.flatMap(v => new List(2*v - 1, 2*v));

    expectToEqual(newList, [1, 2, 3, 4, 5, 6, 7, 8]);
    expect(newList).not.toBe(list1);

    // #3
    newList = list1.flatMap(v => new List(new List(2*v)));

    expectToEqual(newList, [[2], [4], [6], [8]]);
    expect(newList).not.toBe(list1);

    // #4
    newList = list2.flatMap(v => List.from(v.split(" ")));

    expectToEqual(newList, ["it's", "Sunny", "in", "", "California"]);
    expect(newList).not.toBe(list2);
  });

  test("List.prototype.group()", () => {
    const list = new List(
      { name: "asparagus", type: "vegetables", quantity: 5 },
      { name: "bananas", type: "fruit", quantity: 0 },
      { name: "goat", type: "meat", quantity: 23 },
      { name: "cherries", type: "fruit", quantity: 5 },
      { name: "fish", type: "meat", quantity: 22 },
    );

    // #1
    expectToEqual(
      list.group(v => v.type),
      {
        vegetables: [
          { name: "asparagus", type: "vegetables", quantity: 5 },
        ],
        fruit: [
          { name: "bananas", type: "fruit", quantity: 0 },
          { name: "cherries", type: "fruit", quantity: 5 }
        ],
        meat: [
          { name: "goat", type: "meat", quantity: 23 },
          { name: "fish", type: "meat", quantity: 22 }
        ]
      }
    );

    // #2
    expectToEqual(
      list.group(v => v.quantity > 5 ? "ok" : "restock"),
      {
        restock: [
          { name: "asparagus", type: "vegetables", quantity: 5 },
          { name: "bananas", type: "fruit", quantity: 0 },
          { name: "cherries", type: "fruit", quantity: 5 }
        ],
        ok: [
          { name: "goat", type: "meat", quantity: 23 },
          { name: "fish", type: "meat", quantity: 22 }
        ]
      }
    );
  });

  test("List.prototype.groupToMap()", () => {
    const list = new List(
      { name: "asparagus", type: "vegetables", quantity: 5 },
      { name: "bananas", type: "fruit", quantity: 0 },
      { name: "goat", type: "meat", quantity: 23 },
      { name: "cherries", type: "fruit", quantity: 5 },
      { name: "fish", type: "meat", quantity: 22 },
    );

    // #1
    expectToEqual(
      list.groupToMap(v => v.type),
      new Map<string, {name: string, type: string, quantity: number}[]>([
        ["vegetables", [
          { name: "asparagus", type: "vegetables", quantity: 5 },
        ]],
        ["fruit", [
          { name: "bananas", type: "fruit", quantity: 0 },
          { name: "cherries", type: "fruit", quantity: 5 }
        ]],
        ["meat", [
          { name: "goat", type: "meat", quantity: 23 },
          { name: "fish", type: "meat", quantity: 22 }
        ]]
      ])
    );

    // #2
    expectToEqual(
      list.groupToMap(v => v.quantity > 5 ? "ok" : "restock"),
      new Map<string, {name: string, type: string, quantity: number}[]>([
        ["restock", [
          { name: "asparagus", type: "vegetables", quantity: 5 },
          { name: "bananas", type: "fruit", quantity: 0 },
          { name: "cherries", type: "fruit", quantity: 5 }
        ]],
        ["ok", [
          { name: "goat", type: "meat", quantity: 23 },
          { name: "fish", type: "meat", quantity: 22 }
        ]],
      ])
    );
  });

  test("List.prototype.slice()", () => {
    const list = new List("Banana", "Orange", "Lemon", "Apple", "Mango");

    // #1
    let newList = list.slice();

    expectToEqual(newList, ["Banana", "Orange", "Lemon", "Apple", "Mango"]);
    expect(newList).not.toBe(list);

    // #2
    newList = list.slice(2);

    expectToEqual(newList, ["Lemon", "Apple", "Mango"]);
    expect(newList).not.toBe(list);

    // #3
    newList = list.slice(1, 3);

    expectToEqual(newList, ["Orange", "Lemon"]);
    expect(newList).not.toBe(list);
  });

  test("List.prototype.splice()", () => {
    // #1
    let list = new List("angel", "clown", "mandarin", "sturgeon");
    let removed = list.splice(2, 0, "drum");

    expectToEqual(list, ["angel", "clown", "drum", "mandarin", "sturgeon"]);
    expectToEqual(removed, []);

    // #2
    list = new List("angel", "clown", "mandarin", "sturgeon");
    removed = list.splice(2, 0, "drum", "guitar");

    expectToEqual(list, ["angel", "clown", "drum", "guitar", "mandarin", "sturgeon"]);
    expectToEqual(removed, []);

    // #3
    list = new List("angel", "clown", "drum", "mandarin", "sturgeon");
    removed = list.splice(3, 1);

    expectToEqual(list, ["angel", "clown", "drum", "sturgeon"]);
    expectToEqual(removed, ["mandarin"]);

    // #4
    list = new List("angel", "clown", "drum", "sturgeon");
    removed = list.splice(2, 1, "trumpet");

    expectToEqual(list, ["angel", "clown", "trumpet", "sturgeon"]);
    expectToEqual(removed, ["drum"]);

    // #5
    list = new List("angel", "clown", "trumpet", "sturgeon");
    removed = list.splice(0, 2, "parrot", "anemone", "blue");

    expectToEqual(list, ["parrot", "anemone", "blue", "trumpet", "sturgeon"]);
    expectToEqual(removed, ["angel", "clown"]);

    // #6
    list = new List("parrot", "anemone", "blue", "trumpet", "sturgeon");
    removed = list.splice(2, 2);

    expectToEqual(list, ["parrot", "anemone", "sturgeon"]);
    expectToEqual(removed, ["blue", "trumpet"]);

    // #7
    list = new List("angel", "clown", "mandarin", "sturgeon");
    removed = list.splice(-2, 1);

    expectToEqual(list, ["angel", "clown", "sturgeon"]);
    expectToEqual(removed, ["mandarin"]);

    // #8
    list = new List("angel", "clown", "mandarin", "sturgeon");
    removed = list.splice(2, Infinity);

    expectToEqual(list, ["angel", "clown"]);
    expectToEqual(removed, ["mandarin", "sturgeon"]);
  });

  test("List.prototype.toSpliced()", () => {
    const list = new List("angel", "clown", "mandarin", "sturgeon");

    // #1
    let newList = list.toSpliced(2, 0, "drum");

    expectToEqual(newList, ["angel", "clown", "drum", "mandarin", "sturgeon"]);
    expect(newList).not.toBe(list);

    // #2
    newList = list.toSpliced(2, 0, "drum", "guitar");

    expectToEqual(newList, ["angel", "clown", "drum", "guitar", "mandarin", "sturgeon"]);
    expect(newList).not.toBe(list);

    // #3
    newList = list.toSpliced(2, 1);

    expectToEqual(newList, ["angel", "clown", "sturgeon"]);
    expect(newList).not.toBe(list);

    // #4
    newList = list.toSpliced(2, 1, "trumpet");

    expectToEqual(newList, ["angel", "clown", "trumpet", "sturgeon"]);
    expect(newList).not.toBe(list);

    // #5
    newList = list.toSpliced(0, 2, "parrot", "anemone", "blue");

    expectToEqual(newList, ["parrot", "anemone", "blue", "mandarin", "sturgeon"]);
    expect(newList).not.toBe(list);

    // #6
    newList = list.toSpliced(1, 2);

    expectToEqual(newList, ["angel", "sturgeon"]);
    expect(newList).not.toBe(list);

    // #7
    newList = list.toSpliced(-2, 1);

    expectToEqual(newList, ["angel", "clown", "sturgeon"]);
    expect(newList).not.toBe(list);

    // #8
    newList = list.toSpliced(2, Infinity);

    expectToEqual(newList, ["angel", "clown"]);
    expect(newList).not.toBe(list);
  });

  test("List.prototype.copyWithin()", () => {
    // #1
    let list = new List(1, 2, 3, 4, 5);
    let returnedList = list.copyWithin(0, 3);

    expectToEqual(returnedList, [4, 5, 3, 4, 5]);
    expect(returnedList).toBe(list);

    // #2
    list = new List(1, 2, 3, 4, 5);
    returnedList = list.copyWithin(0, 3, 4);

    expectToEqual(returnedList, [4, 2, 3, 4, 5]);
    expect(returnedList).toBe(list);

    // #3
    list = new List(1, 2, 3, 4, 5);
    returnedList = list.copyWithin(-2, -3, -1);

    expectToEqual(returnedList, [1, 2, 3, 3, 4]);
    expect(returnedList).toBe(list);
  });

  test("List.prototype.reverse()", () => {
    // #1
    let list = new List(1, 2, 3, 4);
    let returnedList = list.reverse();

    expectToEqual(returnedList, [4, 3, 2, 1]);
    expect(returnedList).toBe(list);

    // #2
    list = new List(3, 2, 4, 1, 5);
    returnedList = list.reverse();

    expectToEqual(returnedList, [5, 1, 4, 2, 3]);
    expect(returnedList).toBe(list);
  });

  test("List.prototype.toReversed()", () => {
    // #1
    let list = new List(1, 2, 3, 4);
    let newList = list.toReversed();

    expectToEqual(newList, [4, 3, 2, 1]);
    expect(newList).not.toBe(list);

    // #2
    list = new List(3, 2, 4, 1, 5);
    newList = list.toReversed();

    expectToEqual(newList, [5, 1, 4, 2, 3]);
    expect(newList).not.toBe(list);
  });

  test("List.prototype.sort()", () => {
    // #1
    let list = new List<any>("Blue", "Humpback", "Beluga");
    let returnedList = list.sort();

    expectToEqual(returnedList, ["Beluga", "Blue", "Humpback"]);
    expect(returnedList).toBe(list);

    // #2
    returnedList = list.sort(Compare.strings());

    expectToEqual(returnedList, ["Beluga", "Blue", "Humpback"]);
    expect(returnedList).toBe(list);

    // #3
    list = new List(40, 1, 5, 200);
    returnedList = list.sort();

    expectToEqual(returnedList, [1, 200, 40, 5]);
    expect(returnedList).toBe(list);

    // #4
    returnedList = list.sort(Compare.numbers());

    expectToEqual(returnedList, [1, 5, 40, 200]);
    expect(returnedList).toBe(list);

    // #5
    list = new List("80", "9", "700");
    returnedList = list.sort();

    expectToEqual(returnedList, ["700", "80", "9"]);
    expect(returnedList).toBe(list);
  });

  test("List.prototype.toSorted()", () => {
    // #1
    let list = new List<any>("Blue", "Humpback", "Beluga");
    let newList = list.toSorted();

    expectToEqual(newList, ["Beluga", "Blue", "Humpback"]);
    expect(newList).not.toBe(list);

    // #2
    newList = list.toSorted(Compare.strings());

    expectToEqual(newList, ["Beluga", "Blue", "Humpback"]);
    expect(newList).not.toBe(list);

    // #3
    list = new List(40, 1, 5, 200);
    newList = list.toSorted();

    expectToEqual(newList, [1, 200, 40, 5]);
    expect(newList).not.toBe(list);

    // #4
    newList = list.toSorted(Compare.numbers());

    expectToEqual(newList, [1, 5, 40, 200]);
    expect(newList).not.toBe(list);

    // #5
    list = new List("80", "9", "700");
    newList = list.toSorted();

    expectToEqual(newList, ["700", "80", "9"]);
    expect(newList).not.toBe(list);
  });

  test("List.prototype.distinct()", () => {
    // #1
    const list = new List(1, 2, 2, 6, 4, 1, 2, 3, 5, 6);
    const newList = list.distinct();

    expectToEqual(newList, [1, 2, 6, 4, 3, 5]);
    expect(newList).not.toBe(list);
  });

  test("List.prototype.distinctBy()", () => {
    // #1
    const list = new List({v: 1}, {v: 2}, {v: 2}, {v: 6}, {v: 4}, {v: 1}, {v: 2}, {v: 3}, {v: 5}, {v: 6});
    const newList = list.distinctBy(o => o.v);

    expectToEqual(newList, [{v: 1}, {v: 2}, {v: 6}, {v: 4}, {v: 3}, {v: 5}]);
    expect(newList).not.toBe(list);
  });

  test("List.prototype.join()", () => {
    const list = new List("Wind", "Water", "Fire");

    // #1
    expect(list.join()).toBe("Wind, Water, Fire");

    // #2
    expect(list.join(", ")).toBe("Wind, Water, Fire");

    // #3
    expect(list.join(" + ")).toBe("Wind + Water + Fire");

    // #4
    expect(list.join("")).toBe("WindWaterFire");
  });

  test("List.prototype.toString()", () => {
    // #1
    const list = new List<any>(1, 2, "a", "1a");

    expect(list.toString()).toBe("[1, 2, a, 1a]");
  });

  test("List.prototype.toArray()", () => {
    // #1
    const list = new List(1, 2, 3);

    expect(list.toArray()).toStrictEqual([1, 2, 3]);
  });

  test("List.prototype.clone()", () => {
    // #1
    const list = new List(1, 2, 3);
    const newList = list.clone();

    expectToEqual(newList, [1, 2, 3]);
    expect(newList).not.toBe(list);
  });

  test("List.from()", () => {
    // #1
    expectToEqual(
      List.from([1, 2, 3]),
      [1, 2, 3]
    );

    // #2
    expectToEqual(
      List.from("foo"),
      ["f", "o", "o"]
    );

    // #3
    expectToEqual(
      List.from(new Set(["foo", "bar", "baz", "foo"])),
      ["foo", "bar", "baz"]
    );

    // #4
    expectToEqual(
      List.from(new Map([[1, 2], [2, 4], [4, 8]])),
      [[1, 2], [2, 4], [4, 8]]
    );

    // #5
    const map = new Map([
      ["1", "a"],
      ["2", "b"],
    ]);

    expectToEqual(
      List.from(map.values()),
      ["a", "b"]
    );

    // #6
    expectToEqual(
      List.from(map.keys()),
      ["1", "2"]
    );

    // #7
    function func(...args: any[]) {
      void args;
      // eslint-disable-next-line prefer-rest-params
      return List.from(arguments);
    }

    expectToEqual(
      func(1, 2, 3),
      [1, 2, 3]
    );

    // #8
    expectToEqual(
      List.from([1, 2, 3], (x) => x + x),
      [2, 4, 6]
    );
  });

  test("List.fromAsync()", async () => {
    // #1
    const asyncIterable = (async function*() {
      for (let i = 0; i < 5; ++i) {
        await new Promise((resolve) => setTimeout(resolve, 10 * i));
        yield i;
      }
    })();

    let list = await List.fromAsync<any>(asyncIterable);

    expectToEqual(list, [0, 1, 2, 3, 4]);

    // #2
    list = await List.fromAsync(new Map([
      [1, 2],
      [3, 4]
    ]));

    expectToEqual(list, [[1, 2], [3, 4]]);

    // #3
    list = await List.fromAsync(new Set([
      Promise.resolve(1),
      Promise.resolve(2),
      Promise.resolve(3)
    ]));

    expectToEqual(list, [1, 2, 3]);

    // #4
    list = await List.fromAsync({
      length: 3,
      0: Promise.resolve(1),
      1: Promise.resolve(2),
      2: Promise.resolve(3),
    });

    expectToEqual(list, [1, 2, 3]);

    // #5
    function delayedValue<T>(v: T): Promise<T> {
      return new Promise((resolve) => setTimeout(() => resolve(v), 100));
    }

    list = await List.fromAsync(
      [delayedValue(1), delayedValue(2), delayedValue(3)],
      (element) => delayedValue(element * 2)
    );

    expectToEqual(list, [2, 4, 6]);
  });

  test("List.of()", () => {
    // #1
    expectToEqual(List.of(), []);

    // #2
    expectToEqual(List.of(0), [0]);

    // #3
    expectToEqual(List.of(1, 2, 3), [1, 2, 3]);
  });

  test("List.repeat()", () => {
    // #1
    expect(() => List.repeat(0, -1)).toThrow(RangeError);

    // #2
    expectToEqual(List.repeat(0, 0), []);

    // #3
    expectToEqual(List.repeat(0, 5), [0, 0, 0, 0, 0]);
  });

});
