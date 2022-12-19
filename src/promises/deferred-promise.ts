import { BasePromise } from './base-promise';
import { PromiseState } from './promise-state';


export class DeferredPromise<T> extends BasePromise<T> {
  private _resolve: ((value: T | PromiseLike<T>) => void) | undefined;
  private _reject: ((reason?: any) => void) | undefined;
  protected _state: PromiseState;

  public get [Symbol.toStringTag](): string {
    return 'DeferredPromise';
  }

  public static get [Symbol.species](): PromiseConstructor {
    return BasePromise[Symbol.species];
  }


  public constructor() {
    let _resolve: (value: T | PromiseLike<T>) => void;
    let _reject: (reason?: any) => void;

    super((resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    });

    this._resolve = _resolve!;
    this._reject = _reject!;
    this._state = PromiseState.pending;
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
