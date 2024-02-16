import type { PromiseRejectionReason } from "./promise-rejection-reason";


export type PromiseOnRejected<TResult> = (reason: PromiseRejectionReason) => TResult | PromiseLike<TResult>;
