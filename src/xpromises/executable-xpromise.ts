import type { PromiseRejector } from "./types/promise-rejector";
import type { PromiseResolver } from "./types/promise-resolver";
import type { PromiseExecutor } from "./types/promise-executor";
import { XPromise } from "./xpromise";


export class ExecutableXPromise<T = void> extends XPromise<T> {
  private _resolve: PromiseResolver<T> | undefined;
  private _reject: PromiseRejector | undefined;
  private _executed: boolean;


  public get [Symbol.toStringTag](): string {
    return "ExecutableXPromise";
  }

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

    this._resolve = resolveTmp;
    this._reject = rejectTmp;

    this._executed = false;
  }


  public execute(executor: PromiseExecutor<T>): ExecutableXPromise<T> {
    if (this._executed) {
      throw new Error(`Cannot execute ${this[Symbol.toStringTag]} more than once`);
    }


    const resolveFn: PromiseResolver<T> = (value) => {
      this._resolve!(value);

      this._resolve = undefined;
      this._reject = undefined;
    };

    const rejectFn: PromiseRejector = (reason) => {
      this._reject!(reason);

      this._resolve = undefined;
      this._reject = undefined;
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
