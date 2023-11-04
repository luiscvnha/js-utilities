import { mod, clamp, round } from "../../src/helpers";


describe("Testing math helpers", () => {

  test("mod", () => {
    expect(mod(-6, 4)).toBe(2);
    expect(mod(-5, 4)).toBe(3);
    expect(mod(-4, 4)).toBe(0);
    expect(mod(-3, 4)).toBe(1);
    expect(mod(-2, 4)).toBe(2);
    expect(mod(-1, 4)).toBe(3);
    expect(mod( 0, 4)).toBe(0);
    expect(mod( 1, 4)).toBe(1);
    expect(mod( 2, 4)).toBe(2);
    expect(mod( 3, 4)).toBe(3);
    expect(mod( 4, 4)).toBe(0);
    expect(mod( 5, 4)).toBe(1);

    expect(mod(-2, 1)).toBe(0);
    expect(mod(-1, 1)).toBe(0);
    expect(mod( 0, 1)).toBe(0);
    expect(mod( 1, 1)).toBe(0);
    expect(mod( 2, 1)).toBe(0);

    expect(() => mod(-Infinity,       NaN)).toThrow(RangeError);
    expect(() => mod(-Infinity, -Infinity)).toThrow(RangeError);
    expect(() => mod(-Infinity,        -2)).toThrow(RangeError);
    expect(() => mod(-Infinity,         0)).toThrow(RangeError);
    expect(() => mod(-Infinity,         2)).toThrow(RangeError);
    expect(() => mod(-Infinity,  Infinity)).toThrow(RangeError);
    expect(() => mod( Infinity,       NaN)).toThrow(RangeError);
    expect(() => mod( Infinity, -Infinity)).toThrow(RangeError);
    expect(() => mod( Infinity,        -2)).toThrow(RangeError);
    expect(() => mod( Infinity,         0)).toThrow(RangeError);
    expect(() => mod( Infinity,         2)).toThrow(RangeError);
    expect(() => mod( Infinity,  Infinity)).toThrow(RangeError);

    expect(() => mod(NaN, -Infinity)).toThrow(RangeError);
    expect(() => mod( -2, -Infinity)).toThrow(RangeError);
    expect(() => mod(  0, -Infinity)).toThrow(RangeError);
    expect(() => mod(  2, -Infinity)).toThrow(RangeError);
    expect(() => mod(NaN,        -1)).toThrow(RangeError);
    expect(() => mod( -2,        -1)).toThrow(RangeError);
    expect(() => mod(  0,        -1)).toThrow(RangeError);
    expect(() => mod(  2,        -1)).toThrow(RangeError);
    expect(() => mod(NaN,         0)).toThrow(RangeError);
    expect(() => mod( -2,         0)).toThrow(RangeError);
    expect(() => mod(  0,         0)).toThrow(RangeError);
    expect(() => mod(  2,         0)).toThrow(RangeError);
    expect(() => mod(NaN,  Infinity)).toThrow(RangeError);
    expect(() => mod( -2,  Infinity)).toThrow(RangeError);
    expect(() => mod(  0,  Infinity)).toThrow(RangeError);
    expect(() => mod(  2,  Infinity)).toThrow(RangeError);

    expect(mod(NaN, NaN)).toBeNaN();
    expect(mod(NaN,  12)).toBeNaN();
    expect(mod(  2, NaN)).toBeNaN();
  });

  test("clamp", () => {
    expect(clamp(-2, 0, 4)).toBe(0);
    expect(clamp(-1, 0, 4)).toBe(0);
    expect(clamp( 0, 0, 4)).toBe(0);
    expect(clamp( 1, 0, 4)).toBe(1);
    expect(clamp( 2, 0, 4)).toBe(2);
    expect(clamp( 3, 0, 4)).toBe(3);
    expect(clamp( 4, 0, 4)).toBe(4);
    expect(clamp( 5, 0, 4)).toBe(4);
    expect(clamp( 6, 0, 4)).toBe(4);

    expect(clamp(1, 3, 3)).toBe(3);
    expect(clamp(2, 3, 3)).toBe(3);
    expect(clamp(3, 3, 3)).toBe(3);
    expect(clamp(4, 3, 3)).toBe(3);
    expect(clamp(5, 3, 3)).toBe(3);

    expect(clamp(-Infinity,         1, Infinity)).toBe(        1);
    expect(clamp(       -2,         1, Infinity)).toBe(        1);
    expect(clamp(        0,         1, Infinity)).toBe(        1);
    expect(clamp(        2,         1, Infinity)).toBe(        2);
    expect(clamp( Infinity,         1, Infinity)).toBe( Infinity);
    expect(clamp(-Infinity, -Infinity,        1)).toBe(-Infinity);
    expect(clamp(       -2, -Infinity,        1)).toBe(       -2);
    expect(clamp(        0, -Infinity,        1)).toBe(        0);
    expect(clamp(        2, -Infinity,        1)).toBe(        1);
    expect(clamp( Infinity, -Infinity,        1)).toBe(        1);
    expect(clamp(-Infinity, -Infinity, Infinity)).toBe(-Infinity);
    expect(clamp(       -2, -Infinity, Infinity)).toBe(       -2);
    expect(clamp(        0, -Infinity, Infinity)).toBe(        0);
    expect(clamp(        2, -Infinity, Infinity)).toBe(        2);
    expect(clamp( Infinity, -Infinity, Infinity)).toBe( Infinity);

    expect(() => clamp(      NaN, 10, 1)).toThrow(RangeError);
    expect(() => clamp(-Infinity, 10, 1)).toThrow(RangeError);
    expect(() => clamp(       -2, 10, 1)).toThrow(RangeError);
    expect(() => clamp(        0, 10, 1)).toThrow(RangeError);
    expect(() => clamp(        2, 10, 1)).toThrow(RangeError);
    expect(() => clamp( Infinity, 10, 1)).toThrow(RangeError);

    expect(clamp(NaN, NaN, NaN)).toBeNaN();
    expect(clamp(  2, NaN, NaN)).toBeNaN();
    expect(clamp(NaN,   0, NaN)).toBeNaN();
    expect(clamp(NaN, NaN,   4)).toBeNaN();
    expect(clamp(NaN,   0,   4)).toBeNaN();
    expect(clamp(  2, NaN,   4)).toBeNaN();
    expect(clamp(  2,   0, NaN)).toBeNaN();
  });

  test("round", () => {
    expect(round(     10, 2)).toBe(  10);
    expect(round( 1.7777, 2)).toBe(1.78);
    expect(round(  1.005, 2)).toBe(1.01);
    expect(round(  1.005, 0)).toBe(   1);
    expect(round(1.77777, 1)).toBe( 1.8);

    expect(round(-Infinity,   0)).toBe(-Infinity);
    expect(round(-Infinity,   1)).toBe(-Infinity);
    expect(round(-Infinity,  99)).toBe(-Infinity);
    expect(round(-Infinity, 100)).toBe(-Infinity);
    expect(round( Infinity,   0)).toBe( Infinity);
    expect(round( Infinity,   1)).toBe( Infinity);
    expect(round( Infinity,  99)).toBe( Infinity);
    expect(round( Infinity, 100)).toBe( Infinity);

    expect(() => round(      NaN, -Infinity)).toThrow(RangeError);
    expect(() => round(-Infinity, -Infinity)).toThrow(RangeError);
    expect(() => round(       -2, -Infinity)).toThrow(RangeError);
    expect(() => round(        0, -Infinity)).toThrow(RangeError);
    expect(() => round(        2, -Infinity)).toThrow(RangeError);
    expect(() => round( Infinity, -Infinity)).toThrow(RangeError);
    expect(() => round(      NaN,        -1)).toThrow(RangeError);
    expect(() => round(-Infinity,        -1)).toThrow(RangeError);
    expect(() => round(       -2,        -1)).toThrow(RangeError);
    expect(() => round(        0,        -1)).toThrow(RangeError);
    expect(() => round(        2,        -1)).toThrow(RangeError);
    expect(() => round( Infinity,        -1)).toThrow(RangeError);
    expect(() => round(      NaN,       101)).toThrow(RangeError);
    expect(() => round(-Infinity,       101)).toThrow(RangeError);
    expect(() => round(       -2,       101)).toThrow(RangeError);
    expect(() => round(        0,       101)).toThrow(RangeError);
    expect(() => round(        2,       101)).toThrow(RangeError);
    expect(() => round( Infinity,       101)).toThrow(RangeError);
    expect(() => round(      NaN,  Infinity)).toThrow(RangeError);
    expect(() => round(-Infinity,  Infinity)).toThrow(RangeError);
    expect(() => round(       -2,  Infinity)).toThrow(RangeError);
    expect(() => round(        0,  Infinity)).toThrow(RangeError);
    expect(() => round(        2,  Infinity)).toThrow(RangeError);
    expect(() => round( Infinity,  Infinity)).toThrow(RangeError);

    expect(round(  NaN, NaN)).toBeNaN();
    expect(round(  NaN,   2)).toBeNaN();
    expect(round(1.234, NaN)).toBeNaN();
  });

});
