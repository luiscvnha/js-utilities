import type { FormatOptions } from "../common/types/format-options";
import type { LocalesArgument } from "../common/types/locales-argument";
import { stringify } from "../__internal__/stringify";
import { localeStringify } from "../__internal__/locale-stringify";


const className = "Lazy";

export class Lazy<T = unknown> {
  // Non-enumerable properties

  declare private _factory: (() => T) | undefined;
  declare private _hasValue: boolean;
  declare private _value: T;

  declare public readonly [Symbol.toStringTag]: string;

  // Enumerable properties

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


  public constructor(factory: () => T) {
    Object.defineProperties(this, {
      _factory: {
        writable: true,
        value: factory,
      },
      _hasValue: {
        writable: true,
        value: false,
      },
      _value: {
        writable: true,
      },
      [Symbol.toStringTag]: {
        configurable: true,
        value: className,
      }
    });
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
