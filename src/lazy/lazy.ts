import type { FormatOptions } from "../common/types/format-options";
import type { LocalesArgument } from "../common/types/locales-argument";
import { stringify } from "../__internal__/stringify";
import { localeStringify } from "../__internal__/locale-stringify";


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

    return stringify(this._value);
  }

  public toLocaleString(locales?: LocalesArgument | undefined, options?: FormatOptions | undefined): string {
    if (!this._hasValue) {
      return "Value is not created";
    }

    return localeStringify(this._value, locales, options);
  }
}
