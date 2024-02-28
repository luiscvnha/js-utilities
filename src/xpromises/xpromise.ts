import type { Nullable } from "../common/types/nullable";
import { isPromiseLike } from "../common/is-promise-like";

import type { PromiseRejectionReason } from "./types/promise-rejection-reason";
import type { PromiseExecutor } from "./types/promise-executor";
import type { XPromiseSettledResult } from "./types/xpromise-settled-result";
import type { PromiseOnFinally } from "./types/promise-on-finally";
import type { PromiseOnFulfilled } from "./types/promise-on-fulfilled";
import type { PromiseOnRejected } from "./types/promise-on-rejected";
import type { IXPromise } from "./types/ixpromise";
import { PromiseState } from "./types/promise-state";


export class XPromise<T = void> extends Promise<T> implements IXPromise<T> {
  declare private _state: PromiseState;
  declare private _result: T | PromiseRejectionReason;


  public get [Symbol.toStringTag](): string {
    return "XPromise";
  }


  public constructor(executor: PromiseExecutor<T>) {
    let state = PromiseState.Pending;
    let result;

    super((superResolve, superReject) => {
      const resolve = (value: T): void => {
        superResolve(value);
        state = PromiseState.Fulfilled;
        result = value;
        this._state = state;
        this._result = result;
      };
      const reject = (reason: PromiseRejectionReason): void => {
        superReject(reason);
        state = PromiseState.Rejected;
        result = reason;
        this._state = state;
        this._result = result;
      };

      executor(
        (value) => {
          if (isPromiseLike(value)) {
            value.then(resolve, reject);
          } else {
            resolve(value);
          }
        },
        reject
      );
    });

    Object.defineProperties(this, {
      _state: {
        writable: true,
        value: state,
      },
      _result: {
        writable: true,
        value: result,
      },
    });
  }

  public get state(): PromiseState {
    return this._state;
  }

  public get isPending(): boolean {
    return this._state === PromiseState.Pending;
  }

  public get isFulfilled(): boolean {
    return this._state === PromiseState.Fulfilled;
  }

  public get isRejected(): boolean {
    return this._state === PromiseState.Rejected;
  }

  public get isSettled(): boolean {
    return this._state === PromiseState.Fulfilled || this._state === PromiseState.Rejected;
  }

  public get result(): XPromiseSettledResult<T> {
    if (!this.isSettled) {
      throw new Error(`Cannot get result of unsettled ${this[Symbol.toStringTag]}`);
    }

    return {
      state: this._state,
      [this.isFulfilled ? "value" : "reason"]: this._result,
    } as XPromiseSettledResult<T>;
  }

  declare public then: <TResult1 = T, TResult2 = never>(onfulfilled?: Nullable<PromiseOnFulfilled<T, TResult1>>, onrejected?: Nullable<PromiseOnRejected<TResult2>>) => IXPromise<TResult1 | TResult2>;

  declare public catch: <TResult = never>(onrejected?: Nullable<PromiseOnRejected<TResult>>) => IXPromise<T | TResult>;

  declare public finally: (onfinally?: Nullable<PromiseOnFinally>) => IXPromise<T>;
}
