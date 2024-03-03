import { PromiseState, DeferredXPromise } from "../../src/xpromises";
import { expectToBeInstanceOfXPromise, expectXPromiseToBe } from "./test-helpers";


describe("DeferredXPromise", () => {

  test("unsettled", () => {
    const p = new DeferredXPromise();

    expectXPromiseToBe(p, PromiseState.Pending);
  });

  test("resolving synchronously", () => {
    const p = new DeferredXPromise<boolean>();
    p.resolve(true);

    expectXPromiseToBe(p, PromiseState.Fulfilled, true);

    return p.then(() => {
      expectXPromiseToBe(p, PromiseState.Fulfilled, true);
    });
  });

  test("resolving asynchronously", () => {
    const p = new DeferredXPromise<boolean>();
    global.setTimeout(() => {
      p.resolve(true);
    });

    expectXPromiseToBe(p, PromiseState.Pending);

    return p.then(() => {
      expectXPromiseToBe(p, PromiseState.Fulfilled, true);
    });
  });

  test("resolving asynchronously via another promise", () => {
    const p = new DeferredXPromise<boolean>();
    p.resolve(Promise.resolve(true));

    expectXPromiseToBe(p, PromiseState.Pending);

    return p.then(() => {
      expectXPromiseToBe(p, PromiseState.Fulfilled, true);
    });
  });

  test("rejecting synchronously", () => {
    const p = new DeferredXPromise<boolean>();
    p.reject(false);

    expectXPromiseToBe(p, PromiseState.Rejected, false);

    return p.catch(() => {
      expectXPromiseToBe(p, PromiseState.Rejected, false);
    });
  });

  test("rejecting asynchronously", () => {
    const p = new DeferredXPromise<boolean>();
    global.setTimeout(() => {
      p.reject(false);
    });

    expectXPromiseToBe(p, PromiseState.Pending);

    return p.catch(() => {
      expectXPromiseToBe(p, PromiseState.Rejected, false);
    });
  });

  test("rejecting asynchronously via another promise", () => {
    const p = new DeferredXPromise<boolean>();
    p.resolve(Promise.reject(false));

    expectXPromiseToBe(p, PromiseState.Pending);

    return p.catch(() => {
      expectXPromiseToBe(p, PromiseState.Rejected, false);
    });
  });

  test("return value of DeferredXPromise.prototype.then()", () => {
    const p1 = new DeferredXPromise();

    const p2 = p1.then(() => {});

    expectToBeInstanceOfXPromise(p2);
  });

  test("return value of DeferredXPromise.prototype.catch()", () => {
    const p1 = new DeferredXPromise();

    const p2 = p1.catch(() => {});

    expectToBeInstanceOfXPromise(p2);
  });

  test("return value of DeferredXPromise.prototype.finally()", () => {
    const p1 = new DeferredXPromise();

    const p2 = p1.finally(() => {});

    expectToBeInstanceOfXPromise(p2);
  });

});
