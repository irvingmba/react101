const { default: updatePointChart } = require("./updatePointChart");

describe("Testing reducer to update a point of the chart", () => {
    test("When executing without data, it will throw", () => {
      expect(() => updatePointChart()).toThrow();
    });
  
    test("Function will replace the number in updPoint", () => {
        const state = {updPoint: []};
        const expected = 45;
        const action = {payload: 45};
        updatePointChart(state, action);
        expect(state).toHaveProperty("updPoint", [expected]);
    });
  
  });