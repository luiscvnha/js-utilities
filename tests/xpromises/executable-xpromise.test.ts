import { PromiseState, ExecutableXPromise } from "../../src/xpromises";
import { expectToBeInstanceOfXPromise, expectXPromiseToBe } from "./test-helpers";


describe("ExecutableXPromise", () => {

  test("unsettled", () => {
    const p = new ExecutableXPromise();

    expectXPromiseToBe(p, PromiseState.Pending);

    p.execute(() => {});

    expectXPromiseToBe(p, PromiseState.Pending);
  });

  test("resolving synchronously", () => {
    const p = new ExecutableXPromise<boolean>();
    p.execute((resolve) => {
      resolve(true);
    });

    expectXPromiseToBe(p, PromiseState.Fulfilled, true);

    return p.then(() => {
      expectXPromiseToBe(p, PromiseState.Fulfilled, true);
    });
  });

  test("resolving asynchronously", () => {
    const p = new ExecutableXPromise<boolean>();
    p.execute((resolve) => {
      global.setTimeout(() => {
        resolve(true);
      });
    });

    expectXPromiseToBe(p, PromiseState.Pending);

    return p.then(() => {
      expectXPromiseToBe(p, PromiseState.Fulfilled, true);
    });
  });

  test("resolving asynchronously via another promise", () => {
    const p = new ExecutableXPromise<boolean>();
    p.execute((resolve) => {
      resolve(Promise.resolve(true));
    });

    expectXPromiseToBe(p, PromiseState.Pending);

    return p.then(() => {
      expectXPromiseToBe(p, PromiseState.Fulfilled, true);
    });
  });

  test("rejecting synchronously", () => {
    const p = new ExecutableXPromise<boolean>();
    p.execute((resolve, reject) => {
      reject(false);
    });

    expectXPromiseToBe(p, PromiseState.Rejected, false);

    return p.catch(() => {
      expectXPromiseToBe(p, PromiseState.Rejected, false);
    });
  });

  test("rejecting asynchronously", () => {
    const p = new ExecutableXPromise<boolean>();
    p.execute((resolve, reject) => {
      global.setTimeout(() => {
        reject(false);
      });
    });

    expectXPromiseToBe(p, PromiseState.Pending);

    return p.catch(() => {
      expectXPromiseToBe(p, PromiseState.Rejected, false);
    });
  });

  test("rejecting asynchronously via another promise", () => {
    const p = new ExecutableXPromise<boolean>();
    p.execute((resolve) => {
      resolve(Promise.reject(false));
    });

    expectXPromiseToBe(p, PromiseState.Pending);

    return p.catch(() => {
      expectXPromiseToBe(p, PromiseState.Rejected, false);
    });
  });

  test("return value of ExecutableXPromise.prototype.then()", () => {
    const p1 = new ExecutableXPromise();

    const p2 = p1.then(() => {});

    expectToBeInstanceOfXPromise(p2);
  });

  test("return value of ExecutableXPromise.prototype.catch()", () => {
    const p1 = new ExecutableXPromise();

    const p2 = p1.catch(() => {});

    expectToBeInstanceOfXPromise(p2);
  });

  test("return value of ExecutableXPromise.prototype.finally()", () => {
    const p1 = new ExecutableXPromise();

    const p2 = p1.finally(() => {});

    expectToBeInstanceOfXPromise(p2);
  });

});
