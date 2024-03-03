import { Order } from "../../src/common";
import { Compare } from "../../src/compare";


describe("Compare", () => {

  test("Compare.asStrings()", () => {
    // #1
    let array: any[] = ["Blue", "Humpback", "Beluga"];

    array.sort(Compare.asStrings());
    expect(array).toEqual(["Beluga", "Blue", "Humpback"]);

    // #2
    array.sort(Compare.asStrings(Order.Ascending));
    expect(array).toEqual(["Beluga", "Blue", "Humpback"]);

    // #3
    array.sort(Compare.asStrings(Order.Descending));
    expect(array).toEqual(["Humpback", "Blue", "Beluga"]);

    // #4
    array = [40, 1, 5, 200];

    array.sort(Compare.asStrings());
    expect(array).toEqual([1, 200, 40, 5]);

    // #5
    array.sort(Compare.asStrings(Order.Ascending));
    expect(array).toEqual([1, 200, 40, 5]);

    // #6
    array.sort(Compare.asStrings(Order.Descending));
    expect(array).toEqual([5, 40, 200, 1]);
  });

  test("Compare.strings()", () => {
    // #1
    let array = ["Blue", "Humpback", "Beluga"];

    array.sort(Compare.strings());
    expect(array).toEqual(["Beluga", "Blue", "Humpback"]);

    // #2
    array.sort(Compare.strings(Order.Ascending));
    expect(array).toEqual(["Beluga", "Blue", "Humpback"]);

    // #3
    array.sort(Compare.strings(Order.Descending));
    expect(array).toEqual(["Humpback", "Blue", "Beluga"]);

    // #4
    array = ["80", "9", "700"];

    array.sort(Compare.strings());
    expect(array).toEqual(["700", "80", "9"]);

    // #5
    array.sort(Compare.strings(Order.Ascending));
    expect(array).toEqual(["700", "80", "9"]);

    // #6
    array.sort(Compare.strings(Order.Descending));
    expect(array).toEqual(["9", "80", "700"]);
  });

  test("Compare.numbers()", () => {
    const array = [40, 1, 5, 200];

    // #1
    array.sort(Compare.numbers());
    expect(array).toEqual([1, 5, 40, 200]);

    // #2
    array.sort(Compare.numbers(Order.Ascending));
    expect(array).toEqual([1, 5, 40, 200]);

    // #3
    array.sort(Compare.numbers(Order.Descending));
    expect(array).toEqual([200, 40, 5, 1]);
  });

  test("Compare.bigInts()", () => {
    const array = [BigInt(40), BigInt(1), BigInt(5), BigInt(200)];

    // #1
    array.sort(Compare.bigInts());
    expect(array).toEqual([BigInt(1), BigInt(5), BigInt(40), BigInt(200)]);

    // #2
    array.sort(Compare.bigInts(Order.Ascending));
    expect(array).toEqual([BigInt(1), BigInt(5), BigInt(40), BigInt(200)]);

    // #3
    array.sort(Compare.bigInts(Order.Descending));
    expect(array).toEqual([BigInt(200), BigInt(40), BigInt(5), BigInt(1)]);
  });

  test("Compare.dates()", () => {
    const date1 = new Date(2023, 3, 1);
    const date2 = new Date(2023, 6, 23);
    const date3 = new Date(2023, 9, 30);
    const array = [date3, date1, date2];

    // #1
    array.sort(Compare.dates());
    expect(array).toEqual([date1, date2, date3]);

    // #2
    array.sort(Compare.dates(Order.Ascending));
    expect(array).toEqual([date1, date2, date3]);

    // #3
    array.sort(Compare.dates(Order.Descending));
    expect(array).toEqual([date3, date2, date1]);
  });

});
