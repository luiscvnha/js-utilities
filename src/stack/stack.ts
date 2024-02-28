import type { FormatOptions } from "../common/types/format-options";
import type { LocalesArgument } from "../common/types/locales-argument";
import { sameValueZero } from "../helpers/same-value-zero";
import { getLocaleStringifier } from "../__internal__/get-locale-stringifier";
import { join } from "../__internal__/join";
import { stringify } from "../__internal__/stringify";


export class Stack<T = unknown> implements Iterable<T> {
  [index: number]: T;

  private _size: number;
  public get size(): number {
    return this._size;
  }

  public get [Symbol.toStringTag](): string {
    return "Stack";
  }

  private static readonly separator = ", ";


  public constructor(...items: T[]) {
    Object.defineProperty(this, "_size", {
      configurable: false,
      enumerable: false,
      writable: true
    });

    const itemsLength = items.length;
    for (let i = 0; i < itemsLength; ++i) {
      this[i] = items[i];
    }

    this._size = itemsLength;
  }


  /* public */


  public push(...items: T[]): number {
    const size = this._size;
    const itemsLength = items.length;
    for (let i = 0; i < itemsLength; ++i) {
      this[size + i] = items[i];
    }

    this._size += itemsLength;

    return this._size;
  }

  public pop(): T | undefined {
    if (this._size <= 0) {
      return undefined;
    }

    --this._size;
    const r = this[this._size];
    delete this[this._size];

    return r;
  }

  public peek(): T | undefined {
    if (this._size <= 0) {
      return undefined;
    }

    return this[this._size - 1];
  }

  public isEmpty(): boolean {
    return this._size <= 0;
  }

  public clear(): void {
    const length = this._size;
    for (let i = 0; i < length; ++i) {
      delete this[i];
    }

    this._size = 0;
  }

  public has(searchElement: T): boolean {
    const size = this._size;
    for (let i = 0; i < size; ++i) {
      if (sameValueZero(this[i], searchElement)) {
        return true;
      }
    }

    return false;
  }

  public [Symbol.iterator](): IterableIterator<T> {
    let index = 0;
    const size = this._size;

    return {
      next: () => {
        return index < size
          ? { value: this[index++], done: false }
          : { value: undefined, done: true };
      },
      [Symbol.iterator]: function() {
        return this;
      }
    };
  }

  public toString(): string {
    return `[${join(this, Stack.separator, stringify)}]`;
  }

  public toLocaleString(locales?: LocalesArgument | undefined, options?: FormatOptions | undefined): string {
    return `[${join(this, Stack.separator, getLocaleStringifier(locales, options))}]`;
  }

  public toArray(): T[] {
    return [...this];
  }

  public clone(): Stack<T> {
    return new Stack<T>(...this);
  }
}
