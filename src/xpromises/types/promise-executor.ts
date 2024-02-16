import type { PromiseRejector } from "./promise-rejector";
import type { PromiseResolver } from "./promise-resolver";


export type PromiseExecutor<T> = (resolve: PromiseResolver<T>, reject: PromiseRejector) => void;
