import { PromiseState, XPromise } from "../../src/xpromise";


describe("Testing XPromise", () => {

  test("State when unsettled", () => {
    const p = new XPromise(() => {});

    expect(p.state).toBe(PromiseState.Pending);
  });

  test("State when resolving synchronously", () => {
    const p = new XPromise((resolve) => {
      resolve();
    });

    expect(p.state).toBe(PromiseState.Fulfilled);

    return p.then(() => {
      expect(p.state).toBe(PromiseState.Fulfilled);
    });
  });

  test("State when rejecting synchronously", () => {
    const p = new XPromise((resolve, reject) => {
      reject();
    });

    expect(p.state).toBe(PromiseState.Rejected);

    return p.catch(() => {
      expect(p.state).toBe(PromiseState.Rejected);
    });
  });

  test("State when resolving asynchronously", () => {
    const p = new XPromise((resolve) => {
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
    const p = new XPromise((resolve, reject) => {
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
