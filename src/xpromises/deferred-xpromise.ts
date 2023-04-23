import { PromiseRejectFunc, PromiseResolveFunc, PromiseState } from "./types";
import { BaseXPromise } from "./base-xpromise";


export class DeferredXPromise<T = void> extends BaseXPromise<T> {
  private _resolve: PromiseResolveFunc<T> | undefined;
  private _reject: PromiseRejectFunc | undefined;
  protected _state: PromiseState;


  public get [Symbol.toStringTag](): string {
    return "DeferredXPromise";
  }

  public static get [Symbol.species](): PromiseConstructor {
    return BaseXPromise[Symbol.species];
  }


  public constructor() {
    super((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });

    this._state = PromiseState.pending;
  }


  public resolve(value: T | PromiseLike<T>): DeferredXPromise<T> {
    if (!this.isSettled) {
      this._resolve!(value);

      this._resolve = undefined;
      this._reject = undefined;

      this._state = PromiseState.fulfilled;
    }

    return this;
  }

  public reject(reason?: any): DeferredXPromise<T> {
    if (!this.isSettled) {
      this._reject!(reason);

      this._resolve = undefined;
      this._reject = undefined;

      this._state = PromiseState.rejected;
    }

    return this;
  }
}
