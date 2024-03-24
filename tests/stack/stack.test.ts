import { Stack } from "../../src/stack";


describe("Stack", () => {

  test("Stack() constructor", () => {
    // #1
    let stack = new Stack();
    expect(stack.toArray()).toEqual([]);
    expect(stack.size).toBe(0);

    // #2
    stack = new Stack(0);
    expect(stack.toArray()).toEqual([0]);
    expect(stack.size).toBe(1);

    // #3
    stack = new Stack(1, 2, 3);
    expect(stack.toArray()).toEqual([1, 2, 3]);
    expect(stack.size).toBe(3);
  });

  test("Stack.prototype.push()", () => {
    const stack = new Stack<number>();

    // #1
    let size = stack.push();

    expect(stack.toArray()).toEqual([]);
    expect(size).toBe(0);

    // #2
    size = stack.push(1);

    expect(stack.toArray()).toEqual([1]);
    expect(size).toBe(1);

    // #3
    size = stack.push(2, 3);

    expect(stack.toArray()).toEqual([1, 2, 3]);
    expect(size).toBe(3);
  });

  test("Stack.prototype.pop()", () => {
    const stack = new Stack(1, 2, 3);

    // #1
    let last = stack.pop();

    expect(stack.toArray()).toEqual([1, 2]);
    expect(last).toBe(3);

    // #2
    last = stack.pop();

    expect(stack.toArray()).toEqual([1]);
    expect(last).toBe(2);

    // #3
    last = stack.pop();

    expect(stack.toArray()).toEqual([]);
    expect(last).toBe(1);

    // #4
    last = stack.pop();

    expect(stack.toArray()).toEqual([]);
    expect(last).toBe(undefined);
  });

  test("Stack.prototype.peek()", () => {
    const stack = new Stack<number>();

    // #1
    let last = stack.peek();

    expect(stack.toArray()).toEqual([]);
    expect(last).toBe(undefined);

    // #2
    stack.push(1);
    last = stack.peek();

    expect(stack.toArray()).toEqual([1]);
    expect(last).toBe(1);

    // #3
    stack.push(2);
    last = stack.peek();

    expect(stack.toArray()).toEqual([1, 2]);
    expect(last).toBe(2);

    // #4
    stack.pop();
    last = stack.peek();

    expect(stack.toArray()).toEqual([1]);
    expect(last).toBe(1);
  });

  test("Stack.prototype.isEmpty()", () => {
    // #1
    expect((new Stack()).isEmpty()).toBe(true);

    // #2
    expect((new Stack(1)).isEmpty()).toBe(false);

    // #3
    expect((new Stack(1, 2, 3)).isEmpty()).toBe(false);
  });

  test("Stack.prototype.clear()", () => {
    // #1
    const stack = new Stack(1, 2, 3);
    stack.clear();

    expect(stack.toArray()).toEqual([]);
  });

  test("Stack.prototype.has()", () => {
    const stack = new Stack(1, 2, 3, NaN, -0);

    // #1
    expect(stack.has(2)).toBe(true);

    // #2
    expect(stack.has(NaN)).toBe(true);

    // #3
    expect(stack.has(0)).toBe(true);

    // #4
    expect(stack.has(+0)).toBe(true);

    // #5
    expect(stack.has(10)).toBe(false);
  });

  test("Stack.prototype[@@iterator]()", () => {
    const stack = new Stack(4, 5, 6);
    const iterableIterator = stack[Symbol.iterator]();

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

  test("Stack.prototype.toString()", () => {
    // #1
    const stack = new Stack<any>(1, 2, "a", "1a");

    expect(stack.toString()).toBe("[1, 2, a, 1a]");
  });

  test("Stack.prototype.toArray()", () => {
    // #1
    const stack = new Stack(1, 2, 3);

    expect(stack.toArray()).toStrictEqual([1, 2, 3]);
  });

  test("Stack.prototype.clone()", () => {
    // #1
    const stack = new Stack(1, 2, 3);
    const newStack = stack.clone();

    expect(newStack.size).toBe(3);
    expect(newStack.toArray()).toEqual([1, 2, 3]);
    expect(newStack).not.toBe(stack);
  });

});
