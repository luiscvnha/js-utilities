import type { FormatOptions } from "../common/types/format-options";
import type { LocalesArgument } from "../common/types/locales-argument";
import { sameValueZero } from "../helpers/same-value-zero";
import { getLocaleStringifier } from "../__internal__/get-locale-stringifier";
import { join } from "../__internal__/join";
import { stringify } from "../__internal__/stringify";


const className = "Queue";

export class Queue<T = unknown> implements Iterable<T> {
  // Non-enumerable properties

  declare private _head: number;
  declare private _tail: number;

  declare public readonly size: number;
  declare public readonly [Symbol.toStringTag]: string;

  // Enumerable properties

  [index: number]: T;

  // Static properties

  private static readonly separator = ", ";
  private static readonly shiftThreshold = 8;


  public constructor(...items: T[]) {
    Object.defineProperties(this, {
      _head: {
        writable: true,
      },
      _tail: {
        writable: true,
      },
      size: {
        get: () => this._tail - this._head,
      },
      [Symbol.toStringTag]: {
        configurable: true,
        value: className,
      }
    });

    const itemsLength = items.length;
    for (let i = 0; i < itemsLength; ++i) {
      this[i] = items[i];
    }

    this._head = 0;
    this._tail = itemsLength;
  }


  /* public */


  public enqueue(...items: T[]): number {
    const tail = this._tail;
    const itemsLength = items.length;
    for (let i = 0; i < itemsLength; ++i) {
      this[tail + i] = items[i];
    }

    this._tail += itemsLength;

    return this.size;
  }

  public dequeue(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    const r = this[this._head];
    delete this[this._head];
    ++this._head;

    if (this.isEmpty() || this._head >= Queue.shiftThreshold) {
      this.shift();
    }

    return r;
  }

  public peek(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    return this[this._head];
  }

  public isEmpty(): boolean {
    return this._head >= this._tail;
  }

  public clear(): void {
    for (let i = this._head; i < this._tail; ++i) {
      delete this[i];
    }

    this._head = 0;
    this._tail = 0;
  }

  public has(searchElement: T): boolean {
    for (let i = this._head; i < this._tail; ++i) {
      if (sameValueZero(this[i], searchElement)) {
        return true;
      }
    }

    return false;
  }

  public [Symbol.iterator](): IterableIterator<T> {
    let index = this._head;
    const tail = this._tail;

    return {
      next: () => {
        return index < tail
          ? { value: this[index++], done: false }
          : { value: undefined, done: true };
      },
      [Symbol.iterator]: function() {
        return this;
      }
    };
  }

  public toString(): string {
    return `[${join(this, Queue.separator, stringify)}]`;
  }

  public toLocaleString(locales?: LocalesArgument | undefined, options?: FormatOptions | undefined): string {
    return `[${join(this, Queue.separator, getLocaleStringifier(locales, options))}]`;
  }

  public toArray(): T[] {
    const r = [];

    let j = 0;
    const tail = this._tail;
    for (let i = this._head; i < tail; ++i, ++j) {
      r[j] = this[i];
    }

    return r;
  }

  public clone(): Queue<T> {
    const r = new Queue<T>();

    let j = 0;
    const tail = this._tail;
    for (let i = this._head; i < tail; ++i, ++j) {
      r[j] = this[i];
    }

    r._head = 0;
    r._tail = j;

    return r;
  }


  /* private */


  private shift() {
    if (this._head <= 0) {
      return;
    }

    const originalHead = this._head;
    const originalTail = this._tail;

    this._head = 0;
    this._tail -= originalHead;

    for (let i = 0; i < this._tail; ++i) {
      this[i] = this[originalHead + i];
    }

    for (let i = Math.max(this._tail, originalHead); i < originalTail; ++i) {
      delete this[i];
    }
  }
}
