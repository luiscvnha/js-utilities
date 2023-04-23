import { PromiseExecutor, PromiseRejectFunc, PromiseResolveFunc, PromiseState } from "./types";
import { BaseXPromise } from "./base-xpromise";


export class ExecutableXPromise<T = void> extends BaseXPromise<T> {
  private _resolve: PromiseResolveFunc<T> | undefined;
  private _reject: PromiseRejectFunc | undefined;
  private _executed: boolean;
  protected _state: PromiseState;


  public get [Symbol.toStringTag](): string {
    return "ExecutableXPromise";
  }

  public static get [Symbol.species](): PromiseConstructor {
    return BaseXPromise[Symbol.species];
  }


  public constructor() {
    let resolveTmp: PromiseResolveFunc<T> | undefined;
    let rejectTmp: PromiseRejectFunc | undefined;

    super((resolve, reject) => {
      resolveTmp = resolve;
      rejectTmp = reject;
    });

    this._resolve = resolveTmp;
    this._reject = rejectTmp;

    this._executed = false;
    this._state = PromiseState.pending;
  }


  public execute(executor: PromiseExecutor<T>): ExecutableXPromise<T> {
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