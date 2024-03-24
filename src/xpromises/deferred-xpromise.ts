import type { PromiseRejectionReason } from "./types/promise-rejection-reason";
import type { PromiseRejector } from "./types/promise-rejector";
import type { PromiseResolver } from "./types/promise-resolver";
import { XPromise } from "./xpromise";


const className = "DeferredXPromise";

export class DeferredXPromise<T = void> extends XPromise<T> {
  // Non-enumerable properties

  declare private _resolve: PromiseResolver<T> | undefined;
  declare private _reject: PromiseRejector | undefined;

  declare public readonly [Symbol.toStringTag]: string;

  // Static properties

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

    Object.defineProperties(this, {
      _resolve: {
        writable: true,
        value: resolveTmp,
      },
      _reject: {
        writable: true,
        value: rejectTmp,
      },
      [Symbol.toStringTag]: {
        configurable: true,
        value: className,
      }
    });
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
