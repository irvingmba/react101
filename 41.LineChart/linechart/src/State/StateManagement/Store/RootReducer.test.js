import rootReducer from "./RootReducer";

describe("Testing root reducer object", () => {
  test("Root reducer with its proper namespaces", () => {
    expect(rootReducer).toHaveProperty("chart", expect.any(Function));
  });
});
