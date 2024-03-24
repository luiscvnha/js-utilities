import type { PromiseRejector } from "./types/promise-rejector";
import type { PromiseResolver } from "./types/promise-resolver";
import type { PromiseExecutor } from "./types/promise-executor";
import { XPromise } from "./xpromise";


const className = "ExecutableXPromise";

export class ExecutableXPromise<T = void> extends XPromise<T> {
  // Non-enumerable properties

  declare private _resolve: PromiseResolver<T> | undefined;
  declare private _reject: PromiseRejector | undefined;
  declare private _executed: boolean;

  declare public readonly [Symbol.toStringTag]: string;

  // Static properties

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

    Object.defineProperties(this, {
      _resolve: {
        writable: true,
        value: resolveTmp,
      },
      _reject: {
        writable: true,
        value: rejectTmp,
      },
      _executed: {
        writable: true,
        value: false,
      },
      [Symbol.toStringTag]: {
        configurable: true,
        value: className,
      }
    });
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
