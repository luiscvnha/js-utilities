import { mod, clamp } from "../../src/helpers";


describe("Testing math helpers", () => {

  test("mod", () => {
    expect(mod(-6, 4)).toBe(2);
    expect(mod(-5, 4)).toBe(3);
    expect(mod(-4, 4)).toBe(0);
    expect(mod(-3, 4)).toBe(1);
    expect(mod(-2, 4)).toBe(2);
    expect(mod(-1, 4)).toBe(3);
    expect(mod(0, 4)).toBe(0);
    expect(mod(1, 4)).toBe(1);
    expect(mod(2, 4)).toBe(2);
    expect(mod(3, 4)).toBe(3);
    expect(mod(4, 4)).toBe(0);
    expect(mod(5, 4)).toBe(1);

    expect(mod(-2, 1)).toBe(0);
    expect(mod(-1, 1)).toBe(0);
    expect(mod(0, 1)).toBe(0);
    expect(mod(1, 1)).toBe(0);
    expect(mod(2, 1)).toBe(0);

    expect(mod(NaN, -2)).toBe(NaN);
    expect(mod(NaN, 0)).toBe(NaN);
    expect(mod(NaN, 2)).toBe(NaN);
    expect(mod(NaN, NaN)).toBe(NaN);
    expect(mod(NaN, Infinity)).toBe(NaN);
    expect(mod(NaN, -Infinity)).toBe(NaN);
    expect(mod(Infinity, -2)).toBe(NaN);
    expect(mod(Infinity, 0)).toBe(NaN);
    expect(mod(Infinity, 2)).toBe(NaN);
    expect(mod(Infinity, NaN)).toBe(NaN);
    expect(mod(Infinity, Infinity)).toBe(NaN);
    expect(mod(Infinity, -Infinity)).toBe(NaN);
    expect(mod(-Infinity, -2)).toBe(NaN);
    expect(mod(-Infinity, 0)).toBe(NaN);
    expect(mod(-Infinity, 2)).toBe(NaN);
    expect(mod(-Infinity, NaN)).toBe(NaN);
    expect(mod(-Infinity, Infinity)).toBe(NaN);
    expect(mod(-Infinity, -Infinity)).toBe(NaN);

    expect(mod(-2, NaN)).toBe(NaN);
    expect(mod(0, NaN)).toBe(NaN);
    expect(mod(2, NaN)).toBe(NaN);
    expect(mod(-2, Infinity)).toBe(NaN);
    expect(mod(0, Infinity)).toBe(NaN);
    expect(mod(2, Infinity)).toBe(NaN);
    expect(mod(-2, -Infinity)).toBe(NaN);
    expect(mod(0, -Infinity)).toBe(NaN);
    expect(mod(2, -Infinity)).toBe(NaN);

    expect(mod(-2, -1)).toBe(NaN);
    expect(mod(-1, -1)).toBe(NaN);
    expect(mod(0, -1)).toBe(NaN);
    expect(mod(1, -1)).toBe(NaN);
    expect(mod(2, -1)).toBe(NaN);

    expect(mod(-2, 0)).toBe(NaN);
    expect(mod(-1, 0)).toBe(NaN);
    expect(mod(0, 0)).toBe(NaN);
    expect(mod(1, 0)).toBe(NaN);
    expect(mod(2, 0)).toBe(NaN);
  });

  test("clamp", () => {
    expect(clamp(-2, 0, 4)).toBe(0);
    expect(clamp(-1, 0, 4)).toBe(0);
    expect(clamp(0, 0, 4)).toBe(0);
    expect(clamp(1, 0, 4)).toBe(1);
    expect(clamp(2, 0, 4)).toBe(2);
    expect(clamp(3, 0, 4)).toBe(3);
    expect(clamp(4, 0, 4)).toBe(4);
    expect(clamp(5, 0, 4)).toBe(4);
    expect(clamp(6, 0, 4)).toBe(4);

    expect(clamp(1, 3, 3)).toBe(3);
    expect(clamp(2, 3, 3)).toBe(3);
    expect(clamp(3, 3, 3)).toBe(3);
    expect(clamp(4, 3, 3)).toBe(3);
    expect(clamp(5, 3, 3)).toBe(3);

    expect(clamp(NaN, NaN, NaN)).toBe(NaN);

    expect(clamp(2, NaN, NaN)).toBe(NaN);
    expect(clamp(NaN, 0, NaN)).toBe(NaN);
    expect(clamp(NaN, NaN, 4)).toBe(NaN);

    expect(clamp(NaN, 0, 4)).toBe(NaN);
    expect(clamp(2, NaN, 4)).toBe(NaN);
    expect(clamp(2, 0, NaN)).toBe(NaN);

    expect(clamp(2, 1, 0)).toBe(NaN);
  });

});
