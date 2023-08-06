import { PromiseExecutor, PromiseState } from "./types";
import { BaseXPromise } from "./base-xpromise";


export class XPromise<T = void> extends BaseXPromise<T> {
  protected _state: PromiseState;


  public get [Symbol.toStringTag](): string {
    return "XPromise";
  }

  public static get [Symbol.species](): PromiseConstructor {
    return BaseXPromise[Symbol.species];
  }


  public constructor(executor: PromiseExecutor<T>) {
    let state: PromiseState | undefined;

    super((resolve, reject) => {
      executor(
        (value) => {
          resolve(value);
          state = PromiseState.Fulfilled;
          this._state = state;
        },
        (reason) => {
          reject(reason);
          state = PromiseState.Rejected;
          this._state = state;
        }
      );
    });

    this._state = state ?? PromiseState.Pending;
  }
}
