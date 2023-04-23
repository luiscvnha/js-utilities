import { PromiseState } from "../../src/xpromises/types";
import { DeferredXPromise } from "../../src/xpromises/deferred-xpromise";


describe("testing DeferredXPromise", () => {

  test("state when unsettled", () => {
    const p = new DeferredXPromise();

    expect(p.state).toBe(PromiseState.pending);
  });

  test("state when resolving synchronously", () => {
    const p = new DeferredXPromise();
    p.resolve();

    expect(p.state).toBe(PromiseState.fulfilled);

    return p.then(() => {
      expect(p.state).toBe(PromiseState.fulfilled);
    });
  });

  test("state when rejecting synchronously", () => {
    const p = new DeferredXPromise();
    p.reject();

    expect(p.state).toBe(PromiseState.rejected);

    return p.catch(() => {
      expect(p.state).toBe(PromiseState.rejected);
    });
  });

  test("state when resolving asynchronously", () => {
    const p = new DeferredXPromise();
    setTimeout(() => {
      p.resolve();
    });

    expect(p.state).toBe(PromiseState.pending);

    return p.then(() => {
      expect(p.state).toBe(PromiseState.fulfilled);
    });
  });

  test("state when rejecting asynchronously", () => {
    const p = new DeferredXPromise();
    setTimeout(() => {
      p.reject();
    });

    expect(p.state).toBe(PromiseState.pending);

    return p.catch(() => {
      expect(p.state).toBe(PromiseState.rejected);
    });
  });

});
