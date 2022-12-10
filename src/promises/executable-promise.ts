import { BasePromise } from './base-promise';
import { PromiseState } from './promise-state';


export class ExecutablePromise<T> extends BasePromise<T> {
  private _resolve: ((value: T | PromiseLike<T>) => void) | undefined;
  private _reject: ((reason?: any) => void) | undefined;
  private _executed: boolean;
  protected _state: PromiseState;

  public get [Symbol.toStringTag](): string {
    return 'ExecutablePromise';
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
    this._executed = false;
    this._state = PromiseState.pending;
  }

  public execute(
    executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void
  ): ExecutablePromise<T> {

    if (this._executed) {
      throw new Error(`Cannot execute ${this[Symbol.toStringTag]} more than once`);
    }

    const resolve = (value: T | PromiseLike<T>): void => {
      this._resolve!(value);

      this._resolve = undefined;
      this._reject = undefined;

      this._state = PromiseState.fulfilled;
    };

    const reject = (reason?: any): void => {
      this._reject!(reason);

      this._resolve = undefined;
      this._reject = undefined;

      this._state = PromiseState.rejected;
    };

    try {
      executor(resolve, reject);
    }
    catch (error) {
      reject(error);
    }

    this._executed = true;

    return this;
  }
}
