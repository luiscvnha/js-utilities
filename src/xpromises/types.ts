export type PromiseExecutor<T> = (resolve: PromiseResolveFunc<T>, reject: PromiseRejectFunc) => void;

export type PromiseResolveFunc<T> = (value: T | PromiseLike<T>) => void;

export type PromiseRejectFunc = (reason?: any) => void;

export enum PromiseState {
  pending,   // initial state, neither fulfilled nor rejected.
  fulfilled, // the operation was completed successfully.
  rejected   // the operation failed.
}
