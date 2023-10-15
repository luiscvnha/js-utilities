import { ToLocaleStringOptions, Comparer } from "../common";
import { isArrayLike, isAsyncIterable, isIterable, sameValueZero } from "../helpers";
import { getLocaleStringifier, join } from "../internal";
import { Compare } from "../compare";


type FlattenList<Type, Depth extends number> = [
  Type,
  Type extends List<infer InnerList>
    ? FlattenList<InnerList, [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20][Depth]>
    : Type
][Depth extends -1 ? 0 : 1];


export class List<T = any> implements Iterable<T>, ArrayLike<T> {
  [index: number]: T;

  private _length: number;
  public get length(): number {
    return this._length;
  }

  public get [Symbol.toStringTag](): string {
    return "List";
  }

  private static readonly separator = ", ";


  public constructor(...items: T[]) {
    Object.defineProperty(this, "_length", {
      configurable: false,
      enumerable: false,
      writable: true
    });

    const itemsLength = items.length;
    for (let i = 0; i < itemsLength; ++i) {
      this[i] = items[i];
    }

    this._length = itemsLength;
  }


  /* public */


  public append(...items: T[]): number {
    const length = this._length;
    const itemsLength = items.length;
    for (let i = 0; i < itemsLength; ++i) {
      this[length + i] = items[i];
    }

    this._length += itemsLength;

    return this._length;
  }

  public prepend(...items: T[]): number {
    const itemsLength = items.length;
    if (itemsLength > 0) {
      this.copy(itemsLength, 0, this._length);

      for (let i = 0; i < itemsLength; ++i) {
        this[i] = items[i];
      }

      this._length += itemsLength;
    }

    return this._length;
  }

  public removeLast(): T | undefined {
    if (this._length <= 0) {
      return undefined;
    }

    --this._length;
    const last = this[this._length];
    delete this[this._length];

    return last;
  }

  public removeFirst(): T | undefined {
    if (this._length <= 0) {
      return undefined;
    }

    const first = this[0];

    this.copy(0, 1, this._length);

    --this._length;

    delete this[this._length];

    return first;
  }

  public remove(value: T): boolean {
    let length = this._length;
    let i = 0;
    for (; i < length; ++i) {
      if (sameValueZero(this[i], value)) {
        break;
      }
    }

    if (i >= length) {
      return false;
    }

    --length;
    for (; i < length; ++i) {
      this[i] = this[i + 1];
    }

    this._length = length;

    delete this[this._length];

    return true;
  }

  public removeAll(value: T): number {
    const length = this._length;
    let i = 0;
    for (let j = 0; j < length; ++j) {
      if (!sameValueZero(this[j], value)) {
        if (i < j) {
          this[i] = this[j];
        }

        ++i;
      }
    }

    this._length = i;

    for (; i < length; ++i) {
      delete this[i];
    }

    return length - this._length;
  }

  public removeIf(predicate: (value: T, index: number, list: List<T>) => boolean): List<T> {
    const removedElements = new List<T>();

    const length = this._length;
    let i = 0;
    for (let j = 0; j < length; ++j) {
      if (predicate(this[j], j, this)) {
        removedElements.append(this[j]);
      } else {
        if (i < j) {
          this[i] = this[j];
        }

        ++i;
      }
    }

    this._length = i;

    for (; i < length; ++i) {
      delete this[i];
    }

    return removedElements;
  }

  public fill(value: T, start?: number | undefined, end?: number | undefined): this {
    start = start === undefined ? 0 : List.toAbsoluteIndex(start, this._length);
    if (start >= this._length) {
      return this;
    }

    end = end === undefined ? this._length : List.toAbsoluteIndex(end, this._length);
    if (end <= start) {
      return this;
    }

    for (let i = start; i < end; ++i) {
      this[i] = value;
    }

    return this;
  }

  public isEmpty(): boolean {
    return this._length <= 0;
  }

  public clear(): void {
    const length = this._length;
    for (let i = 0; i < length; ++i) {
      delete this[i];
    }

    this._length = 0;
  }

  public at(index: number): T | undefined {
    index = List.toIntegerOrInfinity(index);
    if (index < -this._length || index >= this._length) {
      return undefined;
    } else if (index < 0) {
      index += this._length;
    }

    return this[index];
  }

  public with(index: number, value: T): List<T> {
    index = List.toIntegerOrInfinity(index);
    if (index < -this._length || index >= this._length) {
      throw new RangeError("Invalid index value");
    } else if (index < 0) {
      index += this._length;
    }

    const r = this.clone();
    r[index] = value;

    return r;
  }

  public has(searchElement: T, fromIndex?: number | undefined): boolean {
    fromIndex = fromIndex === undefined ? 0 : List.toAbsoluteIndex(fromIndex, this._length);

    const length = this._length;
    for (let i = fromIndex; i < length; ++i) {
      if (sameValueZero(this[i], searchElement)) {
        return true;
      }
    }

    return false;
  }

  public indexOf(searchElement: T, fromIndex?: number | undefined): number | undefined {
    fromIndex = fromIndex === undefined ? 0 : List.toAbsoluteIndex(fromIndex, this._length);

    const length = this._length;
    for (let i = fromIndex; i < length; ++i) {
      if (sameValueZero(this[i], searchElement)) {
        return i;
      }
    }

    return undefined;
  }

  public lastIndexOf(searchElement: T, fromIndex?: number | undefined): number | undefined {
    if (fromIndex === undefined) {
      fromIndex = this._length - 1;
    } else {
      fromIndex = List.toIntegerOrInfinity(fromIndex);
      if (fromIndex < 0) {
        fromIndex += this._length;
      } else if (fromIndex >= this._length) {
        fromIndex = this._length - 1;
      }
    }

    for (let i = fromIndex; i >= 0; --i) {
      if (sameValueZero(this[i], searchElement)) {
        return i;
      }
    }

    return undefined;
  }

  public [Symbol.iterator]: () => IterableIterator<T> = this.values;

  public keys(): IterableIterator<number> {
    let index = 0;
    const length = this._length;

    return {
      next: () => {
        return index < length
          ? { value: index++, done: false }
          : { value: undefined, done: true };
      },
      [Symbol.iterator]: function() {
        return this;
      }
    };
  }

  public values(): IterableIterator<T> {
    let index = 0;
    const length = this._length;

    return {
      next: () => {
        return index < length
          ? { value: this[index++], done: false }
          : { value: undefined, done: true };
      },
      [Symbol.iterator]: function() {
        return this;
      }
    };
  }

  public entries(): IterableIterator<[number, T]> {
    let index = 0;
    const length = this._length;

    return {
      next: () => {
        return index < length
          ? { value: [index, this[index++]], done: false }
          : { value: undefined, done: true };
      },
      [Symbol.iterator]: function() {
        return this;
      }
    };
  }

  public all<S extends T>(predicate: (value: T, index: number, list: List<T>) => value is S, thisArg?: any): this is List<S>;
  public all(predicate: (value: T, index: number, list: List<T>) => boolean, thisArg?: any): boolean;
  public all(predicate: (value: T, index: number, list: List<T>) => boolean, thisArg?: any): boolean {
    if (thisArg !== undefined) {
      predicate = predicate.bind(thisArg);
    }

    const length = this._length;
    for (let i = 0; i < length; ++i) {
      if (predicate(this[i], i, this) !== true) {
        return false;
      }
    }

    return true;
  }

  public some(predicate: (value: T, index: number, list: List<T>) => boolean, thisArg?: any): boolean {
    if (thisArg !== undefined) {
      predicate = predicate.bind(thisArg);
    }

    const length = this._length;
    for (let i = 0; i < length; ++i) {
      if (predicate(this[i], i, this) === true) {
        return true;
      }
    }

    return false;
  }

  public find<S extends T>(predicate: (value: T, index: number, list: List<T>) => value is S, thisArg?: any): S | undefined;
  public find(predicate: (value: T, index: number, list: List<T>) => boolean, thisArg?: any): T | undefined;
  public find(predicate: (value: T, index: number, list: List<T>) => boolean, thisArg?: any): T | undefined {
    if (thisArg !== undefined) {
      predicate = predicate.bind(thisArg);
    }

    const length = this._length;
    for (let i = 0; i < length; ++i) {
      if (predicate(this[i], i, this) === true) {
        return this[i];
      }
    }

    return undefined;
  }

  public findLast<S extends T>(predicate: (value: T, index: number, list: List<T>) => value is S, thisArg?: any): S | undefined;
  public findLast(predicate: (value: T, index: number, list: List<T>) => boolean, thisArg?: any): T | undefined;
  public findLast(predicate: (value: T, index: number, list: List<T>) => boolean, thisArg?: any): T | undefined {
    if (thisArg !== undefined) {
      predicate = predicate.bind(thisArg);
    }

    for (let i = this._length - 1; i >= 0; --i) {
      if (predicate(this[i], i, this) === true) {
        return this[i];
      }
    }

    return undefined;
  }

  public findIndex(predicate: (value: T, index: number, list: List<T>) => boolean, thisArg?: any): number | undefined {
    if (thisArg !== undefined) {
      predicate = predicate.bind(thisArg);
    }

    const length = this._length;
    for (let i = 0; i < length; ++i) {
      if (predicate(this[i], i, this) === true) {
        return i;
      }
    }

    return undefined;
  }

  public findLastIndex(predicate: (value: T, index: number, list: List<T>) => boolean, thisArg?: any): number | undefined {
    if (thisArg !== undefined) {
      predicate = predicate.bind(thisArg);
    }

    for (let i = this._length - 1; i >= 0; --i) {
      if (predicate(this[i], i, this) === true) {
        return i;
      }
    }

    return undefined;
  }

  public forEach(callbackFn: (value: T, index: number, list: List<T>) => void, thisArg?: any): this {
    if (thisArg !== undefined) {
      callbackFn = callbackFn.bind(thisArg);
    }

    const length = this._length;
    for (let i = 0; i < length; ++i) {
      callbackFn(this[i], i, this);
    }

    return this;
  }

  public reduce(callbackFn: (previousValue: T, currentValue: T, currentIndex: number, list: List<T>) => T): T;
  public reduce(callbackFn: (previousValue: T, currentValue: T, currentIndex: number, list: List<T>) => T, initialValue: T): T;
  public reduce<U>(callbackFn: (previousValue: U, currentValue: T, currentIndex: number, list: List<T>) => U, initialValue: U): U;
  public reduce(callbackFn: (previousValue: T, currentValue: T, currentIndex: number, list: List<T>) => T, initialValue?: T | undefined): T {
    const length = this._length;
    if (length <= 0 && initialValue === undefined) {
      throw new TypeError("Reduce of empty list with no initial value");
    }

    let i = 0;
    let accumulator: T = initialValue !== undefined ? initialValue : this[i++];

    while (i < length) {
      accumulator = callbackFn(accumulator, this[i], i, this);
      ++i;
    }

    return accumulator;
  }

  public reduceRight(callbackFn: (previousValue: T, currentValue: T, currentIndex: number, list: List<T>) => T): T;
  public reduceRight(callbackFn: (previousValue: T, currentValue: T, currentIndex: number, list: List<T>) => T, initialValue: T): T;
  public reduceRight<U>(callbackFn: (previousValue: U, currentValue: T, currentIndex: number, list: List<T>) => U, initialValue: U): U;
  public reduceRight(callbackFn: (previousValue: T, currentValue: T, currentIndex: number, list: List<T>) => T, initialValue?: T | undefined): T {
    if (this._length <= 0 && initialValue === undefined) {
      throw new TypeError("Reduce of empty list with no initial value");
    }

    let i = this._length - 1;
    let accumulator: T = initialValue !== undefined ? initialValue : this[i--];

    while (i >= 0) {
      accumulator = callbackFn(accumulator, this[i], i, this);
      --i;
    }

    return accumulator;
  }

  public concat(...items: (T | List<T>)[]): List<T> {
    const r = this.clone();
    let length = r._length;

    const itemsLength = items.length;
    for (let i = 0; i < itemsLength; ++i) {
      const item = items[i];

      if (item instanceof List) {
        const listLength = item._length;
        for (let j = 0; j < listLength; ++j) {
          r[length++] = item[j];
        }
      } else {
        r[length++] = item;
      }
    }

    r._length = length;

    return r;
  }

  public filter<S extends T>(predicate: (value: T, index: number, list: List<T>) => value is S, thisArg?: any): List<S>;
  public filter(predicate: (value: T, index: number, list: List<T>) => boolean, thisArg?: any): List<T>;
  public filter(predicate: (value: T, index: number, list: List<T>) => boolean, thisArg?: any): List<T> {
    const r = new List();
    let i = 0;

    if (thisArg !== undefined) {
      predicate = predicate.bind(thisArg);
    }

    const length = this._length;
    for (let j = 0; j < length; ++j) {
      if (predicate(this[j], j, this) === true) {
        r[i++] = this[j];
      }
    }

    r._length = i;

    return r;
  }

  public map<U>(callbackFn: (value: T, index: number, list: List<T>) => U, thisArg?: any): List<U> {
    const r = new List<U>();

    if (thisArg !== undefined) {
      callbackFn = callbackFn.bind(thisArg);
    }

    const length = this._length;
    let i = 0;
    while (i < length) {
      r[i] = callbackFn(this[i], i, this);
      ++i;
    }

    r._length = i;

    return r;
  }

  public flat<This, D extends number = 1>(this: This, depth?: D | undefined): List<FlattenList<This, D>>;
  public flat(depth?: number | undefined): List {
    if (depth === undefined) {
      depth = 1;
    } else if (depth <= 0) {
      return this.clone();
    }

    const r = new List();

    List.flat(r, this, depth);

    return r;
  }

  public flatMap<U>(callbackFn: (value: T, index: number, list: List<T>) => U | List<U>, thisArg?: any): List<U> {
    if (thisArg !== undefined) {
      callbackFn = callbackFn.bind(thisArg);
    }

    const r = new List<U>();

    const length = this._length;
    for (let i = 0; i < length; ++i) {
      const elem = callbackFn(this[i], i, this);
      if (elem instanceof List) {
        r.append(...elem);
      } else {
        r.append(elem);
      }
    }

    return r;
  }

  public group<P extends string | symbol>(callbackFn: (value: T, index: number, list: List<T>) => P, thisArg?: any): Partial<Record<P, List<T>>> {
    const r: Partial<Record<P, List<T>>> = {};

    if (thisArg !== undefined) {
      callbackFn = callbackFn.bind(thisArg);
    }

    const length = this._length;
    for (let i = 0; i < length; ++i) {
      const key = callbackFn(this[i], i, this);

      if (r[key] === undefined) {
        r[key] = new List<T>();
      }

      r[key]!.append(this[i]);
    }

    return r;
  }

  public groupToMap<P>(callbackFn: (value: T, index: number, list: List<T>) => P, thisArg?: any): Map<P, List<T>> {
    const r = new Map<P, List<T>>();

    if (thisArg !== undefined) {
      callbackFn = callbackFn.bind(thisArg);
    }

    const length = this._length;
    for (let i = 0; i < length; ++i) {
      const key = callbackFn(this[i], i, this);

      let value = r.get(key);
      if (value === undefined) {
        value = new List<T>();
        r.set(key, value);
      }

      value.append(this[i]);
    }

    return r;
  }

  public slice(start?: number | undefined, end?: number | undefined): List<T> {
    const r = new List<T>();

    start = start === undefined ? 0 : List.toAbsoluteIndex(start, this._length);
    if (start >= this._length) {
      return r;
    }

    end = end === undefined ? this._length : List.toAbsoluteIndex(end, this._length);
    if (end <= start) {
      return r;
    }

    for (let i = start; i < end; ++i) {
      r[i - start] = this[i];
    }

    r._length = end - start;

    return r;
  }

  public splice(start: number, deleteCount: number, ...items: T[]): List<T> {
    start = List.toAbsoluteIndex(start, this._length);

    const length = this._length;
    deleteCount = deleteCount <= 0
      ? 0
      : Math.min(Math.trunc(deleteCount), length - start);

    const removedElements = this.slice(start, start + deleteCount);

    const itemsLength = items.length;
    this.copy(start + itemsLength, start + deleteCount, length);

    for (let i = 0; i < itemsLength; ++i) {
      this[start + i] = items[i];
    }

    const newLength = length - deleteCount + items.length;
    for (let i = newLength; i < length; ++i) {
      delete this[i];
    }

    this._length = newLength;

    return removedElements;
  }

  public toSpliced(start: number, deleteCount: number, ...items: T[]): List<T> {
    start = List.toAbsoluteIndex(start, this._length);

    const length = this._length;
    deleteCount = deleteCount <= 0
      ? 0
      : Math.min(Math.trunc(deleteCount), length - start);

    const r = new List<T>();

    let i = 0;
    while (i < start) {
      r[i] = this[i];
      ++i;
    }

    const itemsLength = items.length;
    for (let j = 0; j < itemsLength; ++j, ++i) {
      r[i] = items[j];
    }

    for (let j = start + deleteCount; j < length; ++j, ++i) {
      r[i] = this[j];
    }

    r._length = i;

    return r;
  }

  public copyWithin(target: number, start: number, end?: number | undefined): this {
    target = List.toAbsoluteIndex(target, this._length);
    if (target >= this._length) {
      return this;
    }

    start = List.toAbsoluteIndex(start, this._length);
    if (start >= this._length || start === target) {
      return this;
    }

    end = end === undefined ? this._length : List.toAbsoluteIndex(end, this._length);
    if (end <= start) {
      return this;
    }

    const availableSpace = this._length - target;
    if (end - start > availableSpace) {
      end = start + availableSpace;
    }

    this.copy(target, start, end);

    return this;
  }

  public reverse(): this {
    const length = this._length;
    const mid = Math.trunc(length / 2);

    for (let i = 0; i < mid; ++i) {
      this.swap(i, length - 1 - i);
    }

    return this;
  }

  public toReversed(): List<T> {
    const length = this._length;
    const r = new List<T>();

    for (let i = length - 1; i >= 0; --i) {
      r[length - 1 - i] = this[i];
    }

    r._length = this._length;

    return r;
  }

  public sort(compareFn?: Comparer<T> | undefined): this {
    compareFn ??= Compare.asStrings();
    this.quickSort(0, this._length - 1, compareFn);
    return this;
  }

  public toSorted(compareFn?: Comparer<T> | undefined): List<T> {
    return this.clone().sort(compareFn);
  }

  public distinct(): List<T> {
    const r = new List<T>();

    const length = this._length;
    for (let i = 0; i < length; ++i) {
      let j = 0;
      for (; j < i; ++j) {
        if (sameValueZero(this[i], this[j])) {
          break;
        }
      }

      if (j >= i) {
        r.append(this[i]);
      }
    }

    return r;
  }

  public distinctBy<U>(selector: (value: T) => U): List<T> {
    const r = new List<T>();
    const s = new List<U>();

    const length = this._length;
    for (let i = 0; i < length; ++i) {
      const value = selector(this[i]);
      s.append(value);

      let j = 0;
      for (; j < i; ++j) {
        if (sameValueZero(value, s[j])) {
          break;
        }
      }

      if (j >= i) {
        r.append(this[i]);
      }
    }

    return r;
  }

  public join(separator?: string | undefined): string {
    return join(this, separator ?? List.separator, String);
  }

  public toString(): string {
    return `[${join(this, List.separator, String)}]`;
  }

  public toLocaleString(locales?: Intl.LocalesArgument | undefined, options?: ToLocaleStringOptions | undefined): string {
    return `[${join(this, List.separator, getLocaleStringifier(locales, options))}]`;
  }

  public toArray(): T[] {
    return [...this];
  }

  public clone(): List<T> {
    return new List<T>(...this);
  }


  /* public static */


  public static from<T>(iterable: Iterable<T> | ArrayLike<T>): List<T>;
  public static from<T, U>(iterable: Iterable<T> | ArrayLike<T>, mapFn: (value: T, index: number) => U, thisArg?: any): List<U>;
  public static from<T, U>(iterable: Iterable<T> | ArrayLike<T>, mapFn?: ((value: T, index: number) => U) | undefined, thisArg?: any): List<T> | List<U> {
    const r = new List();

    if (mapFn !== undefined && thisArg !== undefined) {
      mapFn = mapFn.bind(thisArg);
    }

    if (isIterable<T>(iterable)) {
      const iterator: Iterator<T> = iterable[Symbol.iterator]();

      let i = 0;
      for (
        let iteratorResult = iterator.next();
        iteratorResult.done !== true;
        iteratorResult = iterator.next(), ++i
      ) {
        r[i] = mapFn !== undefined ? mapFn(iteratorResult.value, i) : iteratorResult.value;
      }

      r._length = i;
    }
    else if (isArrayLike<T>(iterable)) {
      const length = iterable.length;
      let i = 0;
      while (i < length) {
        r[i] = mapFn !== undefined ? mapFn(iterable[i], i) : iterable[i];
        ++i;
      }

      r._length = i;
    }
    else {
      throw new TypeError("Invalid iterable value");
    }

    return r;
  }

  public static async fromAsync<T>(iterable: AsyncIterable<T | Promise<T>> | Iterable<T | Promise<T>> | ArrayLike<T | Promise<T>>): Promise<List<T>>;
  public static async fromAsync<T, U>(iterable: AsyncIterable<T | Promise<T>> | Iterable<T | Promise<T>> | ArrayLike<T | Promise<T>>, mapFn: (value: T, index: number) => U, thisArg?: any): Promise<List<U>>;
  public static async fromAsync<T, U>(iterable: AsyncIterable<T | Promise<T>> | Iterable<T | Promise<T>> | ArrayLike<T | Promise<T>>, mapFn?: ((value: T, index: number) => U) | undefined, thisArg?: any): Promise<List<T> | List<U>> {
    const r = new List();

    if (mapFn !== undefined && thisArg !== undefined) {
      mapFn = mapFn.bind(thisArg);
    }

    const asyncIterable = isAsyncIterable<T>(iterable);
    if (asyncIterable || isIterable<T>(iterable)) {
      const iterator: AsyncIterator<T> | Iterator<T> = asyncIterable
        ? iterable[Symbol.asyncIterator]()
        : iterable[Symbol.iterator]();

      let i = 0;
      for (
        let iteratorResult = await iterator.next();
        iteratorResult.done !== true;
        iteratorResult = await iterator.next(), ++i
      ) {
        const value = await iteratorResult.value;
        r[i] = mapFn !== undefined ? await mapFn(value, i) : value;
      }

      r._length = i;
    }
    else if (isArrayLike<T>(iterable)) {
      const length = iterable.length;
      let i = 0;
      while (i < length) {
        const value = await iterable[i];
        r[i] = mapFn !== undefined ? await mapFn(value, i) : value;
        ++i;
      }

      r._length = i;
    }
    else {
      throw new TypeError("Invalid iterable value");
    }

    return r;
  }

  public static of<T>(...items: T[]): List<T> {
    return new List<T>(...items);
  }

  public static repeat<T>(value: T, count: number): List<T> {
    if (count < 0) {
      throw new RangeError("Invalid count value");
    }

    const r = new List<T>();

    let i = 0;
    while (i < count) {
      r[i] = value;
      ++i;
    }

    r._length = i;

    return r;
  }


  /* private */


  private quickSort(left: number, right: number, compareFn: Comparer<T>): void {
    let index;

    if (this._length > 1) {
      index = this.partition(left, right, compareFn);

      if (left < index - 1) {
        this.quickSort(left, index - 1, compareFn);
      }

      if (index < right) {
        this.quickSort(index, right, compareFn);
      }
    }
  }

  private partition(left: number, right: number, compareFn: Comparer<T>): number {
    const pivot = this[Math.floor((right + left) / 2)];
    let i = left;
    let j = right;

    while (i <= j) {
      while (compareFn(this[i], pivot) < 0) {
        ++i;
      }

      while (compareFn(this[j], pivot) > 0) {
        --j;
      }

      if (i <= j) {
        this.swap(i, j);
        ++i;
        --j;
      }
    }

    return i;
  }

  private swap(i: number, j: number): void {
    const tmp = this[i];
    this[i] = this[j];
    this[j] = tmp;
  }

  private copy(target: number, start: number, end: number): void {
    if (
      target < 0
      || start < 0
      || end > this._length
      || target === start
      || end <= start
    ) {
      return;
    }

    let count = end - start;
    let inc = 1;

    if (start < target && target < start + count) {
      inc = -1;
      start += count - 1;
      target += count - 1;
    }

    while (count > 0) {
      this[target] = this[start];

      --count;
      target += inc;
      start += inc;
    }
  }


  /* private static */


  private static toIntegerOrInfinity(index: number): number {
    return Number.isNaN(index) || index === 0 ? 0 : Math.trunc(index);
  }

  /**
   * @param index relative index
   * @param length length of the array
   * @returns absolute index, 0 if index < -length or length if index > length
   */
  private static toAbsoluteIndex(index: number, length: number): number {
    index = List.toIntegerOrInfinity(index);
    return index < 0
      ? Math.max(index + length, 0)
      : Math.min(index, length);
  }

  private static flat(dest: List, src: List, depth: number): void {
    if (depth <= 0) {
      dest.append(...src);
      return;
    }

    const length = src._length;
    for (let i = 0; i < length; ++i) {
      if (src[i] instanceof List) {
        List.flat(dest, src[i], depth-1);
      } else {
        dest.append(src[i]);
      }
    }
  }
}
