import { PromiseRejectFunc, PromiseResolveFunc, PromiseState } from "./types";
import { BasePromise } from "./base-promise";


export class DeferredPromise<T = void> extends BasePromise<T> {
  private _resolve: PromiseResolveFunc<T> | undefined;
  private _reject: PromiseRejectFunc | undefined;


  public get [Symbol.toStringTag](): string {
    return "DeferredPromise";
  }

  public static get [Symbol.species](): PromiseConstructor {
    return BasePromise[Symbol.species];
  }


  public constructor() {
    super((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });
  }


  public resolve(value: T | PromiseLike<T>): DeferredPromise<T> {
    if (!this.isSettled) {
      this._resolve!(value);

      this._resolve = undefined;
      this._reject = undefined;

      this._state = PromiseState.fulfilled;
    }

    return this;
  }

  public reject(reason?: any): DeferredPromise<T> {
    if (!this.isSettled) {
      this._reject!(reason);

      this._resolve = undefined;
      this._reject = undefined;

      this._state = PromiseState.rejected;
    }

    return this;
  }
}
