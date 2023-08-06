export type PromiseResolver<T> = (value: T | PromiseLike<T>) => void;

export type PromiseRejector = (reason?: any) => void;

export type PromiseExecutor<T> = (resolve: PromiseResolver<T>, reject: PromiseRejector) => void;

export enum PromiseState {
  Pending,   // initial state, neither fulfilled nor rejected.
  Fulfilled, // the operation was completed successfully.
  Rejected   // the operation failed.
}

export interface IXPromise<T> extends Promise<T> {
  state: PromiseState;
}
