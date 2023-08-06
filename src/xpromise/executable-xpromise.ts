import { PromiseExecutor, PromiseRejector, PromiseResolver, PromiseState } from "./types";
import { BaseXPromise } from "./base-xpromise";


export class ExecutableXPromise<T = void> extends BaseXPromise<T> {
  private _resolve: PromiseResolver<T> | undefined;
  private _reject: PromiseRejector | undefined;
  private _executed: boolean;
  protected _state: PromiseState;


  public get [Symbol.toStringTag](): string {
    return "ExecutableXPromise";
  }

  public static get [Symbol.species](): PromiseConstructor {
    return BaseXPromise[Symbol.species];
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

    this._executed = false;
    this._state = PromiseState.Pending;
  }


  public execute(executor: PromiseExecutor<T>): ExecutableXPromise<T> {
    if (this._executed) {
      throw new Error(`Cannot execute ${this[Symbol.toStringTag]} more than once`);
    }


    const resolveFn: PromiseResolver<T> = (value) => {
      this._resolve!(value);

      this._resolve = undefined;
      this._reject = undefined;

      this._state = PromiseState.Fulfilled;
    };

    const rejectFn: PromiseRejector = (reason) => {
      this._reject!(reason);

      this._resolve = undefined;
      this._reject = undefined;

      this._state = PromiseState.Rejected;
    };


    try {
      executor(resolveFn, rejectFn);
    }
    catch (error) {
      rejectFn(error);
    }


    this._executed = true;

    return this;
  }
}
