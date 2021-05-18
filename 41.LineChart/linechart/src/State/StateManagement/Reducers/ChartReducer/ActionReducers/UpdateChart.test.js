import updateChart from "./UpdateChart";

describe("Testing reducer to update chart data", () => {
  test("When executing without data, it will throw", () => {
    expect(() => updateChart()).toThrow();
  });

  test("Function will add payload action to the object state", () => {
      const state = {previous: "state"};
      const expected = {test: "something"};
      const action = {payload: expected};
      const newState = updateChart(state, action);
      expect(newState).toMatchObject(expected)
      expect(newState).toMatchObject(state);
  });

});
