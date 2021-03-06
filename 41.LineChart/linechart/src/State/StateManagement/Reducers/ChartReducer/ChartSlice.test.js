import chartReducer, { chartActions } from "./ChartSlice";

describe("Testing chart slice operations object", () => {
  test("Calling chart reducer without arguments, it will throw", () => {
    expect(() => chartReducer()).toThrow();
  });

  test("Calling chart with incorrect action will return same state", () => {
    const prevState = { prev: "state" };
    const expected = { expect: "this" };
    const currState = chartReducer(prevState, { payload: expected });
    expect(currState).toBe(prevState);
  });
});

describe("Testing update chart action and reducer", () => {
  test("Calling chart with its action, will update state", () => {
    const prevState = { prev: "state" };
    const expected = { expect: "this" };
    const action = chartActions.updateChart(expected);
    const currState = chartReducer(prevState, action);
    expect(currState).toMatchObject(expected);
    expect(currState).toMatchObject(prevState);
  });

  test("Calling chart action, it will return a type and a payload properties within object", () => {
    const expected = { hello: "world" };
    const action = chartActions.updateChart(expected);
    expect(action).toHaveProperty("type", "chart/updateChart");
    expect(action).toHaveProperty("payload", expected);
  });
});

describe("Testing update point chart action and reducer", () => {
  test("When pass update point chart, it will change updPoint in state", () => {
    const prevState = { updPoint: [] };
    const expected = 50;
    const action = chartActions.updatePointChart(expected);
    const currState = chartReducer(prevState, action);
    expect(currState).toHaveProperty("updPoint", [expected]);
  });

  test("Calling update point chart action, it will an action object", () => {
    const expected = { hello: "world" };
    const action = chartActions.updatePointChart(expected);
    expect(action).toHaveProperty("type", "chart/updatePointChart");
    expect(action).toHaveProperty("payload", expected);
  });
});
