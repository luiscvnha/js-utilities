import { PromiseState } from "../../src/xpromises/types";
import { XPromise } from "../../src/xpromises/xpromise";


describe("testing XPromise", () => {

  test("state when unsettled", () => {
    const p = new XPromise(() => {});

    expect(p.state).toBe(PromiseState.pending);
  });

  test("state when resolving synchronously", () => {
    const p = new XPromise((resolve) => {
      resolve();
    });

    expect(p.state).toBe(PromiseState.fulfilled);

    return p.then(() => {
      expect(p.state).toBe(PromiseState.fulfilled);
    });
  });

  test("state when rejecting synchronously", () => {
    const p = new XPromise((resolve, reject) => {
      reject();
    });

    expect(p.state).toBe(PromiseState.rejected);

    return p.catch(() => {
      expect(p.state).toBe(PromiseState.rejected);
    });
  });

  test("state when resolving asynchronously", () => {
    const p = new XPromise((resolve) => {
      setTimeout(() => {
        resolve();
      });
    });

    expect(p.state).toBe(PromiseState.pending);

    return p.then(() => {
      expect(p.state).toBe(PromiseState.fulfilled);
    });
  });

  test("state when rejecting asynchronously", () => {
    const p = new XPromise((resolve, reject) => {
      setTimeout(() => {
        reject();
      });
    });

    expect(p.state).toBe(PromiseState.pending);

    return p.catch(() => {
      expect(p.state).toBe(PromiseState.rejected);
    });
  });

});