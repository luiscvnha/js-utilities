import { Lazy } from "../../src/lazy";


describe("Lazy", () => {

  test("Lazy() constructor", () => {
    let executed = 0;

    const lazy = new Lazy(() => {
      ++executed;
      return 200;
    });

    expect(lazy.hasValue).toBe(false);
    expect(executed).toBe(0);

    expect(lazy.value).toBe(200);

    expect(lazy.hasValue).toBe(true);
    expect(executed).toBe(1);

    expect(lazy.value).toBe(200);

    expect(lazy.hasValue).toBe(true);
    expect(executed).toBe(1);
  });

  test("Lazy.prototype.toString()", () => {
    const lazy = new Lazy(() => [1, 2, 3]);

    expect(lazy.toString()).toBe("Value is not created");

    lazy.value;

    expect(lazy.toString()).toBe(lazy.value.toString());
  });

});
