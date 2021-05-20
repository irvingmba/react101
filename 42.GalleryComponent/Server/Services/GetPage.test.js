import { default as getPage } from "./GetPage";

describe("Testing function to get pictures data from a gallery", () => {
  test("If a parameter is left it will throw", () => {
    expect(() => getPage()).toThrow();
    expect(() => getPage("1")).toThrow();
    expect(() => getPage("1", 5)).toThrow();
    expect(() => getPage(undefined, 5, 1)).toThrow();
  });

  test("It will throw if input is incorrect", () => {
    expect(() => getPage("1", 10, 5)).toThrow();
  });

  test("It will return an object with the data", () => {
    const data = getPage("g1", 10, 1);
    expect(data).toEqual({
      id: expect.any(String),
      images: expect.any(Array),
      page: expect.any(Number),
      total: expect.any(Number),
    });
  });

  test("It will return the requested images if the page has them", () => {
    const data = getPage("g1", 5, 1);
    const {images} = data;
    expect(images).toHaveLength(5);
  });
});
