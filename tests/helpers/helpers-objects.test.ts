import { deepFreeze, shallowFreeze } from "../../src/helpers";


describe("helpers/objects/", () => {

  test("deepFreeze", () => {
    const obj: Record<string, any> = {
      foo: "foo",
      bar: {
        baz: "baz",
      },
    };

    const frozenObj = deepFreeze(obj);
    expect(frozenObj).toBe(obj);
    expect(Object.isFrozen(obj)).toBe(true);

    // can't change obj

    expect(() => { obj.foo = "one"; }).toThrow(TypeError);
    expect(() => { obj.bar = {}; }).toThrow(TypeError);
    expect(() => { obj.two = "two"; }).toThrow(TypeError);

    expect(() => { Object.defineProperty(obj, "foo", { value: "one" }); }).toThrow(TypeError);
    expect(() => { Object.defineProperty(obj, "bar", { value: {} }); }).toThrow(TypeError);
    expect(() => { Object.defineProperty(obj, "three", { value: "three" }); }).toThrow(TypeError);

    expect(() => { delete obj.foo; }).toThrow(TypeError);
    expect(() => { delete obj.bar; }).toThrow(TypeError);

    expect(() => { Object.setPrototypeOf(obj, { four: 4 }); }).toThrow(TypeError);

    // also can't change obj.bar

    expect(() => { obj.bar.baz = "one"; }).toThrow(TypeError);
    expect(() => { obj.bar.two = "two"; }).toThrow(TypeError);

    expect(() => { Object.defineProperty(obj.bar, "baz", { value: "one" }); }).toThrow(TypeError);
    expect(() => { Object.defineProperty(obj.bar, "three", { value: "three" }); }).toThrow(TypeError);

    expect(() => { delete obj.bar.baz; }).toThrow(TypeError);

    expect(() => { Object.setPrototypeOf(obj.bar, { four: 4 }); }).toThrow(TypeError);
  });

  test("shallowFreeze", () => {
    const obj: Record<string, any> = {
      foo: "foo",
      bar: {
        baz: "baz",
      },
    };

    const frozenObj = shallowFreeze(obj);
    expect(frozenObj).toBe(obj);
    expect(Object.isFrozen(obj)).toBe(true);

    // can't change obj

    expect(() => { obj.foo = "one"; }).toThrow(TypeError);
    expect(() => { obj.bar = {}; }).toThrow(TypeError);
    expect(() => { obj.two = "two"; }).toThrow(TypeError);

    expect(() => { Object.defineProperty(obj, "foo", { value: "one" }); }).toThrow(TypeError);
    expect(() => { Object.defineProperty(obj, "bar", { value: {} }); }).toThrow(TypeError);
    expect(() => { Object.defineProperty(obj, "three", { value: "three" }); }).toThrow(TypeError);

    expect(() => { delete obj.foo; }).toThrow(TypeError);
    expect(() => { delete obj.bar; }).toThrow(TypeError);

    expect(() => { Object.setPrototypeOf(obj, { four: 4 }); }).toThrow(TypeError);

    // still can change obj.bar

    obj.bar.baz = "one";
    obj.bar.two = "two";
    expect(obj.bar.baz).toBe("one");
    expect(obj.bar.two).toBe("two");

    Object.defineProperty(obj.bar, "baz", { value: 1 });
    Object.defineProperty(obj.bar, "three", { configurable: true, value: "three" });
    expect(obj.bar.baz).toBe(1);
    expect(obj.bar.three).toBe("three");

    delete obj.bar.baz;
    delete obj.bar.three;
    expect("baz" in obj.bar).toBe(false);
    expect("three" in obj.bar).toBe(false);

    const newPrototype = { four: 4 };
    Object.setPrototypeOf(obj.bar, newPrototype);
    expect(Object.prototype.isPrototypeOf.call(newPrototype, obj.bar)).toBe(true);
  });

});
