import type { PromiseRejectionReason } from "./promise-rejection-reason";


export type PromiseRejector = (reason?: PromiseRejectionReason) => void;
