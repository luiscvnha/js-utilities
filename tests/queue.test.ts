import { Queue } from "../src/queue";


describe("Testing Queue", () => {

  test("Queue() constructor", () => {
    // #1
    let queue = new Queue();
    expect(queue.toArray()).toEqual([]);
    expect(queue.size).toBe(0);

    // #2
    queue = new Queue(0);
    expect(queue.toArray()).toEqual([0]);
    expect(queue.size).toBe(1);

    // #3
    queue = new Queue(1, 2, 3);
    expect(queue.toArray()).toEqual([1, 2, 3]);
    expect(queue.size).toBe(3);
  });

  test("Queue.prototype.enqueue()", () => {
    const queue = new Queue<number>();

    // #1
    let size = queue.enqueue();

    expect(queue.toArray()).toEqual([]);
    expect(size).toBe(0);

    // #2
    size = queue.enqueue(1);

    expect(queue.toArray()).toEqual([1]);
    expect(size).toBe(1);

    // #3
    size = queue.enqueue(2, 3);

    expect(queue.toArray()).toEqual([1, 2, 3]);
    expect(size).toBe(3);
  });

  test("Queue.prototype.dequeue()", () => {
    const queue = new Queue(1, 2, 3);

    // #1
    let first = queue.dequeue();

    expect(queue.toArray()).toEqual([2, 3]);
    expect(first).toBe(1);

    // #2
    first = queue.dequeue();

    expect(queue.toArray()).toEqual([3]);
    expect(first).toBe(2);

    // #3
    first = queue.dequeue();

    expect(queue.toArray()).toEqual([]);
    expect(first).toBe(3);

    // #4
    first = queue.dequeue();

    expect(queue.toArray()).toEqual([]);
    expect(first).toBe(undefined);
  });

  test("Queue.prototype.peek()", () => {
    const queue = new Queue<number>();

    // #1
    let first = queue.peek();

    expect(queue.toArray()).toEqual([]);
    expect(first).toBe(undefined);

    // #2
    queue.enqueue(1);
    first = queue.peek();

    expect(queue.toArray()).toEqual([1]);
    expect(first).toBe(1);

    // #3
    queue.enqueue(2);
    first = queue.peek();

    expect(queue.toArray()).toEqual([1, 2]);
    expect(first).toBe(1);

    // #4
    queue.dequeue();
    first = queue.peek();

    expect(queue.toArray()).toEqual([2]);
    expect(first).toBe(2);
  });

  test("Queue.prototype.isEmpty()", () => {
    // #1
    expect((new Queue()).isEmpty()).toBe(true);

    // #2
    expect((new Queue(1)).isEmpty()).toBe(false);

    // #3
    expect((new Queue(1, 2, 3)).isEmpty()).toBe(false);
  });

  test("Queue.prototype.clear()", () => {
    // #1
    const queue = new Queue(1, 2, 3);
    queue.clear();

    expect(queue.toArray()).toEqual([]);
  });

  test("Queue.prototype.has()", () => {
    const queue = new Queue(1, 2, 3, NaN, -0);

    // #1
    expect(queue.has(2)).toBe(true);

    // #2
    expect(queue.has(NaN)).toBe(true);

    // #3
    expect(queue.has(0)).toBe(true);

    // #4
    expect(queue.has(+0)).toBe(true);

    // #5
    expect(queue.has(10)).toBe(false);
  });

  test("Queue.prototype[@@iterator]()", () => {
    const queue = new Queue(4, 5, 6);
    const iterableIterator = queue[Symbol.iterator]();

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

  test("Queue.prototype.toString()", () => {
    // #1
    const queue = new Queue<any>(1, 2, "a", "1a");

    expect(queue.toString()).toBe("[1, 2, a, 1a]");
  });

  test("Queue.prototype.toArray()", () => {
    // #1
    const queue = new Queue(1, 2, 3);

    expect(queue.toArray()).toStrictEqual([1, 2, 3]);
  });

  test("Queue.prototype.clone()", () => {
    // #1
    const queue = new Queue(1, 2, 3);
    const newQueue = queue.clone();

    expect(newQueue.toArray()).toEqual([1, 2, 3]);
    expect(newQueue).not.toBe(queue);
  });

});
