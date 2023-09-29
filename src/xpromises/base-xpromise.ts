import { PromiseExecutor, PromiseState, IXPromise } from "./types";


export abstract class BaseXPromise<T> extends Promise<T> implements IXPromise<T> {
  protected abstract _state: PromiseState;


  public abstract get [Symbol.toStringTag](): string;

  public static get [Symbol.species](): PromiseConstructor {
    return Promise;
  }


  protected constructor(executor: PromiseExecutor<T>) {
    super(executor);
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
}
