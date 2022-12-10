import { PromiseState } from './promise-state';


export abstract class BasePromise<T> extends Promise<T> {
  protected abstract _state: PromiseState;


  public abstract get [Symbol.toStringTag](): string;

  public static get [Symbol.species](): PromiseConstructor {
    return Promise;
  }


  protected constructor(executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void) {
    super(executor);
  }


  public get state(): PromiseState {
    return this._state;
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
