import arrayGen from "./ArrayGen";

describe("Testing function to generate an array full of values", () => {
  test("When function does not get any parameter, it will return an empty array", () => {
    expect(arrayGen()).toEqual(expect.any(Array));
  });

  test("When it gets just the limit, it will return an array with a serie", () => {
    expect(arrayGen(5)).toEqual([1, 2, 3, 4, 5]);
  });

  test("When it gets a limit and a value it will return an array filled with that value", () => {
    expect(arrayGen(5, 1)).toEqual([1, 1, 1, 1, 1]);
  });

  test("When it gets all arguments, it will prefer a value", () => {
    expect(arrayGen(5, 1, () => 5)).toEqual([1, 1, 1, 1, 1]);
  });

  test("When it gets a function, it fills the value with the returned value", () => {
    expect(arrayGen(3, null, () => 3)).toEqual([3, 3, 3]);
  });
});
