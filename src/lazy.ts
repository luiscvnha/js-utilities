import { ToLocaleStringOptions, isNullish } from "./common";


export class Lazy<T = any> {
  private _valueFactory: (() => T) | undefined;
  private _isValueCreated: boolean;
  private _value: T | undefined;

  public get isValueCreated(): boolean {
    return this._isValueCreated;
  }

  public get value(): T {
    if (!this._isValueCreated) {
      this._value = this._valueFactory!();
      this._isValueCreated = true;
      this._valueFactory = undefined;
    }
    return this._value!;
  }

  public get [Symbol.toStringTag](): string {
    return "Lazy";
  }


  public constructor(valueFactory: () => T) {
    this._valueFactory = valueFactory;
    this._isValueCreated = false;
  }


  /* public */


  public toString(): string {
    if (!this._isValueCreated) {
      return "Value is not created";
    }

    if (!isNullish(this._value) && typeof (this._value as any).toString === "function") {
      return (this._value as any).toString();
    }

    return String(this._value);
  }

  public toLocaleString(locales?: Intl.LocalesArgument | undefined, options?: ToLocaleStringOptions | undefined): string {
    if (!this._isValueCreated) {
      return "Value is not created";
    }

    if (!isNullish(this._value) && typeof (this._value as any).toLocaleString === "function") {
      return (this._value as any).toLocaleString(locales, options);
    }

    return String(this._value);
  }
}
