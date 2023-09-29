import { PromiseState, DeferredXPromise } from "../../src/xpromises";


describe("Testing DeferredXPromise", () => {

  test("State when unsettled", () => {
    const p = new DeferredXPromise();

    expect(p.state).toBe(PromiseState.Pending);
  });

  test("State when resolving synchronously", () => {
    const p = new DeferredXPromise();
    p.resolve();

    expect(p.state).toBe(PromiseState.Fulfilled);

    return p.then(() => {
      expect(p.state).toBe(PromiseState.Fulfilled);
    });
  });

  test("State when rejecting synchronously", () => {
    const p = new DeferredXPromise();
    p.reject();

    expect(p.state).toBe(PromiseState.Rejected);

    return p.catch(() => {
      expect(p.state).toBe(PromiseState.Rejected);
    });
  });

  test("State when resolving asynchronously", () => {
    const p = new DeferredXPromise();
    setTimeout(() => {
      p.resolve();
    });

    expect(p.state).toBe(PromiseState.Pending);

    return p.then(() => {
      expect(p.state).toBe(PromiseState.Fulfilled);
    });
  });

  test("State when rejecting asynchronously", () => {
    const p = new DeferredXPromise();
    setTimeout(() => {
      p.reject();
    });

    expect(p.state).toBe(PromiseState.Pending);

    return p.catch(() => {
      expect(p.state).toBe(PromiseState.Rejected);
    });
  });

});
