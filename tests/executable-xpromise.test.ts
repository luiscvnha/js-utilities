import { PromiseState, ExecutableXPromise } from "../src/xpromise";


describe("Testing ExecutableXPromise", () => {

  test("State when unsettled", () => {
    const p = new ExecutableXPromise();

    expect(p.state).toBe(PromiseState.pending);

    p.execute(() => {});

    expect(p.state).toBe(PromiseState.pending);
  });

  test("State when resolving synchronously", () => {
    const p = new ExecutableXPromise();
    p.execute((resolve) => {
      resolve();
    });

    expect(p.state).toBe(PromiseState.fulfilled);

    return p.then(() => {
      expect(p.state).toBe(PromiseState.fulfilled);
    });
  });

  test("State when rejecting synchronously", () => {
    const p = new ExecutableXPromise();
    p.execute((resolve, reject) => {
      reject();
    });

    expect(p.state).toBe(PromiseState.rejected);

    return p.catch(() => {
      expect(p.state).toBe(PromiseState.rejected);
    });
  });

  test("State when resolving asynchronously", () => {
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

  test("State when rejecting asynchronously", () => {
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
