import type { Nullable } from "../../common/types/nullable";

import type { PromiseOnFinally } from "./promise-on-finally";
import type { PromiseOnFulfilled } from "./promise-on-fulfilled";
import type { PromiseOnRejected } from "./promise-on-rejected";
import type { PromiseState } from "./promise-state";
import type { XPromiseSettledResult } from "./xpromise-settled-result";


export interface IXPromise<T = void> extends Promise<T> {
  readonly [Symbol.toStringTag]: string;
  readonly state: PromiseState;
  readonly isPending: boolean;
  readonly isFulfilled: boolean;
  readonly isRejected: boolean;
  readonly isSettled: boolean;
  readonly result: XPromiseSettledResult<T>;
  then<TResult1 = T, TResult2 = never>(onfulfilled?: Nullable<PromiseOnFulfilled<T, TResult1>>, onrejected?: Nullable<PromiseOnRejected<TResult2>>): IXPromise<TResult1 | TResult2>;
  catch<TResult = never>(onrejected?: Nullable<PromiseOnRejected<TResult>>): IXPromise<T | TResult>;
  finally(onfinally?: Nullable<PromiseOnFinally>): IXPromise<T>;
}
