import gallerySlice from "./GallerySlice";

describe("Testing slice functions", () => {
  test("Slice is exporting reducer and actions", () => {
    expect(gallerySlice).toHaveProperty("reducer", expect.any(Function));
    expect(gallerySlice).toHaveProperty("actions.init", expect.any(Function));
    expect(gallerySlice).toHaveProperty(
      "actions.updateImages",
      expect.any(Function)
    );
    expect(gallerySlice).toHaveProperty(
      "actions.updatePage",
      expect.any(Function)
    );
  });
});

describe("Testing reducer from slice", () => {
  test("When reducer does not recognize action, it will return same object", () => {
    const state = {};
    const action = { type: "" };
    expect(gallerySlice.reducer(state, action)).toBe(state);
  });

  test("On init action, it will initialize state", () => {
    const state = { page: 1, images: [[1, 2]] };
    const action = gallerySlice.actions.init({ page: 2, images: [100, 200] });
    expect(gallerySlice.reducer(state, action)).toEqual({
      page: 2,
      images: [
        [1, 2],
        [100, 200],
      ],
    });
  });

  test("On update images, it will store images", () => {
    const state = { page: 1, images: [[1, 2]] };
    const action = gallerySlice.actions.updateImages([
      {
        page: 2,
        images: [100, 200],
      },
    ]);
    expect(gallerySlice.reducer(state, action)).toEqual({
      page: 1,
      images: [
        [1, 2],
        [100, 200],
      ],
    });
  });

  test("On update page, it will change the page number", () => {
      const state = {page: 1};
      const action = gallerySlice.actions.updatePage(5);
      expect(gallerySlice.reducer(state, action)).toEqual({page: 5});
  });
});
