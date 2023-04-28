export type PromiseResolveFn<T> = (value: T | PromiseLike<T>) => void;

export type PromiseRejectFn = (reason?: any) => void;

export type PromiseExecutor<T> = (resolve: PromiseResolveFn<T>, reject: PromiseRejectFn) => void;

export enum PromiseState {
  pending,   // initial state, neither fulfilled nor rejected.
  fulfilled, // the operation was completed successfully.
  rejected   // the operation failed.
}

export interface IXPromise<T> extends Promise<T> {
  state: PromiseState;
}
