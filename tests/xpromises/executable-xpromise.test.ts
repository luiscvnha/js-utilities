import { PromiseState } from "../../src/xpromises/types";
import { ExecutableXPromise } from "../../src/xpromises/executable-xpromise";


describe("testing ExecutableXPromise", () => {

  test("state when unsettled", () => {
    const p = new ExecutableXPromise();

    expect(p.state).toBe(PromiseState.pending);

    p.execute(() => {});

    expect(p.state).toBe(PromiseState.pending);
  });

  test("state when resolving synchronously", () => {
    const p = new ExecutableXPromise();
    p.execute((resolve) => {
      resolve();
    });

    expect(p.state).toBe(PromiseState.fulfilled);

    return p.then(() => {
      expect(p.state).toBe(PromiseState.fulfilled);
    });
  });

  test("state when rejecting synchronously", () => {
    const p = new ExecutableXPromise();
    p.execute((resolve, reject) => {
      reject();
    });

    expect(p.state).toBe(PromiseState.rejected);

    return p.catch(() => {
      expect(p.state).toBe(PromiseState.rejected);
    });
  });

  test("state when resolving asynchronously", () => {
    const p = new ExecutableXPromise();
    p.execute((resolve) => {
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
    const p = new ExecutableXPromise();
    p.execute((resolve, reject) => {
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
