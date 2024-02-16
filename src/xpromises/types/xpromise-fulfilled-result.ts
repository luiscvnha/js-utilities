import type { PromiseState } from "./promise-state";


export interface XPromiseFulfilledResult<T> {
  state: PromiseState.Fulfilled;
  value: T;
}
