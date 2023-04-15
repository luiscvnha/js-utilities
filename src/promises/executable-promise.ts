import { PromiseExecutor, PromiseRejectFunc, PromiseResolveFunc, PromiseState } from "./types";
import { BasePromise } from "./base-promise";


export class ExecutablePromise<T = void> extends BasePromise<T> {
  private _resolve: PromiseResolveFunc<T> | undefined;
  private _reject: PromiseRejectFunc | undefined;
  private _executed: boolean;


  public get [Symbol.toStringTag](): string {
    return "ExecutablePromise";
  }

  public static get [Symbol.species](): PromiseConstructor {
    return BasePromise[Symbol.species];
  }


  public constructor() {
    super((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });

    this._executed = false;
  }


  public execute(executor: PromiseExecutor<T>): ExecutablePromise<T> {
    if (this._executed) {
      throw new Error(`Cannot execute ${this[Symbol.toStringTag]} more than once`);
    }


    const resolveFunc: PromiseResolveFunc<T> = (value) => {
      this._resolve!(value);

      this._resolve = undefined;
      this._reject = undefined;

      this._state = PromiseState.fulfilled;
    };

    const rejectFunc: PromiseRejectFunc = (reason) => {
      this._reject!(reason);

      this._resolve = undefined;
      this._reject = undefined;

      this._state = PromiseState.rejected;
    };


    try {
      executor(resolveFunc, rejectFunc);
    }
    catch (error) {
      rejectFunc(error);
    }


    this._executed = true;

    return this;
  }
}
