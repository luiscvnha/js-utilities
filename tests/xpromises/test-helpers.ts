import { PromiseState, IXPromise, PromiseRejectionReason, XPromise, ExecutableXPromise, DeferredXPromise } from "../../src/xpromises";


export function expectXPromiseToBe<T>(actual: IXPromise<T>, state: PromiseState.Pending): void;
export function expectXPromiseToBe<T>(actual: IXPromise<T>, state: PromiseState.Fulfilled, value: T): void;
export function expectXPromiseToBe<T>(actual: IXPromise<T>, state: PromiseState.Rejected, reason: PromiseRejectionReason): void;
export function expectXPromiseToBe<T>(actual: IXPromise<T>, state: PromiseState, result?: any): void {
  if (arguments.length < 2 || arguments.length > 3) {
    throw new Error("Invalid number of arguments");
  }

  if (state !== PromiseState.Pending && state !== PromiseState.Fulfilled && state !== PromiseState.Rejected) {
    throw new Error(`'${state}' is not a valid PromiseState`);
  }

  expect(actual.state).toBe(state);

  expect(actual.isPending).toBe(state === PromiseState.Pending);

  expect(actual.isFulfilled).toBe(state === PromiseState.Fulfilled);

  expect(actual.isRejected).toBe(state === PromiseState.Rejected);

  expect(actual.isSettled).toBe(state === PromiseState.Fulfilled || state === PromiseState.Rejected);

  if (state === PromiseState.Pending) {
    expect(() => { actual.result; }).toThrow();
  } else {
    expect(actual.result).toEqual({
      state: state,
      [state === PromiseState.Fulfilled ? "value" : "reason"]: result,
    });
  }
}


export function expectToBeInstanceOfXPromise<T>(actual: IXPromise<T>): void {
  expect(actual).toBeInstanceOf(XPromise);
  expect(actual).not.toBeInstanceOf(ExecutableXPromise);
  expect(actual).not.toBeInstanceOf(DeferredXPromise);
}
