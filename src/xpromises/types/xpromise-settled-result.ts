import type { XPromiseFulfilledResult } from "./xpromise-fulfilled-result";
import type { XPromiseRejectedResult } from "./xpromise-rejected-result";


export type XPromiseSettledResult<T> = XPromiseFulfilledResult<T> | XPromiseRejectedResult;
