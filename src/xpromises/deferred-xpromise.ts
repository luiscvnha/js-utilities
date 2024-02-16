import type { PromiseRejectionReason } from "./types/promise-rejection-reason";
import type { PromiseRejector } from "./types/promise-rejector";
import type { PromiseResolver } from "./types/promise-resolver";
import { XPromise } from "./xpromise";


export class DeferredXPromise<T = void> extends XPromise<T> {
  private _resolve: PromiseResolver<T> | undefined;
  private _reject: PromiseRejector | undefined;


  public get [Symbol.toStringTag](): string {
    return "DeferredXPromise";
  }

  public static get [Symbol.species]() {
    return XPromise;
  }


  public constructor() {
    let resolveTmp: PromiseResolver<T> | undefined;
    let rejectTmp: PromiseRejector | undefined;

    super((resolve, reject) => {
      resolveTmp = resolve;
      rejectTmp = reject;
    });

    this._resolve = resolveTmp;
    this._reject = rejectTmp;
  }


  public resolve(value: T | PromiseLike<T>): DeferredXPromise<T> {
    if (!this.isSettled) {
      this._resolve!(value);

      this._resolve = undefined;
      this._reject = undefined;
    }

    return this;
  }

  public reject(reason?: PromiseRejectionReason): DeferredXPromise<T> {
    if (!this.isSettled) {
      this._reject!(reason);

      this._resolve = undefined;
      this._reject = undefined;
    }

    return this;
  }
}
