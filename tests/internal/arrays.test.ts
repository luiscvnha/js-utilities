import { join } from "../../src/internal";


describe("Testing internal array helpers", () => {

  test("join", () => {
    const arrayLike: ArrayLike<number> = {
      0: 1,
      1: 2,
      2: 3,
      length: 3
    };

    const iterable: Iterable<number> = {
      [Symbol.iterator]: function() {
        let index = 0;
        const length = arrayLike.length;

        return {
          next: function() {
            return index < length
              ? { value: arrayLike[index++], done: false }
              : { value: undefined, done: true };
          }
        };
      }
    };

    expect(join(arrayLike, ", ", String)).toBe("1, 2, 3");
    expect(join(arrayLike, "", String)).toBe("123");

    expect(join(iterable, ", ", String)).toBe("1, 2, 3");
    expect(join(iterable, "", String)).toBe("123");
  });

});
