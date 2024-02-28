import type { FormatOptions } from "../common/types/format-options";
import type { LocalesArgument } from "../common/types/locales-argument";
import { sameValueZero } from "../helpers/same-value-zero";
import { getLocaleStringifier } from "../__internal__/get-locale-stringifier";
import { join } from "../__internal__/join";
import { stringify } from "../__internal__/stringify";


export class Queue<T = unknown> implements Iterable<T> {
  [index: number]: T;

  private _head: number;
  private _tail: number;

  public get size(): number {
    return this._tail - this._head;
  }

  public get [Symbol.toStringTag](): string {
    return "Queue";
  }

  private static readonly separator = ", ";
  private static readonly shiftThreshold = 8;


  public constructor(...items: T[]) {
    Object.defineProperties(this, {
      "_head": {
        configurable: false,
        enumerable: false,
        writable: true
      },
      "_tail": {
        configurable: false,
        enumerable: false,
        writable: true
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
    return [...this];
  }

  public clone(): Queue<T> {
    return new Queue<T>(...this);
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
