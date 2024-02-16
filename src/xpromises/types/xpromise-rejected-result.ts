import type { PromiseRejectionReason } from "./promise-rejection-reason";
import type { PromiseState } from "./promise-state";


export interface XPromiseRejectedResult {
  state: PromiseState.Rejected;
  reason: PromiseRejectionReason;
}
