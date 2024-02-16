import type { ToLocaleStringOptions } from "../common/types/to-locale-string-options";
import { isFunction } from "../common/type-checkers/is-function";
import { isNonNullish } from "../common/type-checkers/is-non-nullish";


export class Lazy<T = unknown> {
  private _factory: (() => T) | undefined;
  private _hasValue: boolean;
  private _value!: T;

  public get hasValue(): boolean {
    return this._hasValue;
  }

  public get value(): T {
    if (!this._hasValue) {
      this._value = this._factory!();
      this._factory = undefined;
      this._hasValue = true;
    }
    return this._value;
  }

  public get [Symbol.toStringTag](): string {
    return "Lazy";
  }


  public constructor(factory: () => T) {
    this._factory = factory;
    this._hasValue = false;
  }


  public toString(): string {
    if (!this._hasValue) {
      return "Value is not created";
    }

    if (isNonNullish(this._value) && isFunction((this._value as any).toString)) {
      return (this._value as any).toString();
    }

    return String(this._value);
  }

  public toLocaleString(locales?: Intl.LocalesArgument | undefined, options?: ToLocaleStringOptions | undefined): string {
    if (!this._hasValue) {
      return "Value is not created";
    }

    if (isNonNullish(this._value) && isFunction((this._value as any).toLocaleString)) {
      return (this._value as any).toLocaleString(locales, options);
    }

    return String(this._value);
  }
}
