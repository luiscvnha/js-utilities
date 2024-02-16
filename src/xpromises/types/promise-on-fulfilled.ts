export type PromiseOnFulfilled<T, TResult> = (value: T) => TResult | PromiseLike<TResult>;
