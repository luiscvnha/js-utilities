import { PromiseState, XPromise } from "../../src/xpromises";
import { expectToBeInstanceOfXPromise, expectXPromiseToBe } from "./test-helpers";


describe("XPromise", () => {

  test("unsettled", () => {
    const p = new XPromise(() => {});

    expectXPromiseToBe(p, PromiseState.Pending);
  });

  test("resolving synchronously", () => {
    const p = new XPromise<boolean>((resolve) => {
      resolve(true);
    });

    expectXPromiseToBe(p, PromiseState.Fulfilled, true);

    return p.then(() => {
      expectXPromiseToBe(p, PromiseState.Fulfilled, true);
    });
  });

  test("resolving asynchronously", () => {
    const p = new XPromise<boolean>((resolve) => {
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
    const p = new XPromise<boolean>((resolve) => {
      resolve(Promise.resolve(true));
    });

    expectXPromiseToBe(p, PromiseState.Pending);

    return p.then(() => {
      expectXPromiseToBe(p, PromiseState.Fulfilled, true);
    });
  });

  test("rejecting synchronously", () => {
    const p = new XPromise<boolean>((resolve, reject) => {
      reject(false);
    });

    expectXPromiseToBe(p, PromiseState.Rejected, false);

    return p.catch(() => {
      expectXPromiseToBe(p, PromiseState.Rejected, false);
    });
  });

  test("rejecting asynchronously", () => {
    const p = new XPromise<boolean>((resolve, reject) => {
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
    const p = new XPromise<boolean>((resolve) => {
      resolve(Promise.reject(false));
    });

    expectXPromiseToBe(p, PromiseState.Pending);

    return p.catch(() => {
      expectXPromiseToBe(p, PromiseState.Rejected, false);
    });
  });

  test("return value of XPromise.prototype.then()", () => {
    const p1 = new XPromise((resolve) => {
      resolve();
    });

    const p2 = p1.then(() => {});

    expectToBeInstanceOfXPromise(p2);
  });

  test("return value of XPromise.prototype.catch()", () => {
    const p1 = new XPromise((resolve) => {
      resolve();
    });

    const p2 = p1.catch(() => {});

    expectToBeInstanceOfXPromise(p2);
  });

  test("return value of XPromise.prototype.finally()", () => {
    const p1 = new XPromise((resolve) => {
      resolve();
    });

    const p2 = p1.finally(() => {});

    expectToBeInstanceOfXPromise(p2);
  });

});
