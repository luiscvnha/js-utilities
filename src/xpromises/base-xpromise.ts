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
    return this._state === PromiseState.pending;
  }

  public get isFulfilled(): boolean {
    return this._state === PromiseState.fulfilled;
  }

  public get isRejected(): boolean {
    return this._state === PromiseState.rejected;
  }

  public get isSettled(): boolean {
    return this._state === PromiseState.fulfilled || this._state === PromiseState.rejected;
  }
}
