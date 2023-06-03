export type PromiseResolver<T> = (value: T | PromiseLike<T>) => void;

export type PromiseRejector = (reason?: any) => void;

export type PromiseExecutor<T> = (resolve: PromiseResolver<T>, reject: PromiseRejector) => void;

export enum PromiseState {
  pending,   // initial state, neither fulfilled nor rejected.
  fulfilled, // the operation was completed successfully.
  rejected   // the operation failed.
}

export interface IXPromise<T> extends Promise<T> {
  state: PromiseState;
}
