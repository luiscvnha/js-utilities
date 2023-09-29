import { PromiseState, ExecutableXPromise } from "../../src/xpromises";


describe("Testing ExecutableXPromise", () => {

  test("State when unsettled", () => {
    const p = new ExecutableXPromise();

    expect(p.state).toBe(PromiseState.Pending);

    p.execute(() => {});

    expect(p.state).toBe(PromiseState.Pending);
  });

  test("State when resolving synchronously", () => {
    const p = new ExecutableXPromise();
    p.execute((resolve) => {
      resolve();
    });

    expect(p.state).toBe(PromiseState.Fulfilled);

    return p.then(() => {
      expect(p.state).toBe(PromiseState.Fulfilled);
    });
  });

  test("State when rejecting synchronously", () => {
    const p = new ExecutableXPromise();
    p.execute((resolve, reject) => {
      reject();
    });

    expect(p.state).toBe(PromiseState.Rejected);

    return p.catch(() => {
      expect(p.state).toBe(PromiseState.Rejected);
    });
  });

  test("State when resolving asynchronously", () => {
    const p = new ExecutableXPromise();
    p.execute((resolve) => {
      setTimeout(() => {
        resolve();
      });
    });

    expect(p.state).toBe(PromiseState.Pending);

    return p.then(() => {
      expect(p.state).toBe(PromiseState.Fulfilled);
    });
  });

  test("State when rejecting asynchronously", () => {
    const p = new ExecutableXPromise();
    p.execute((resolve, reject) => {
      setTimeout(() => {
        reject();
      });
    });

    expect(p.state).toBe(PromiseState.Pending);

    return p.catch(() => {
      expect(p.state).toBe(PromiseState.Rejected);
    });
  });

});
