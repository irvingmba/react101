import updateChartDataAct, { AS_UPDT_CHART_DATA } from "./UpdateChartDataAct";

describe("Testing update chart saga action", () => {
  test("Action creator returns action with type", () => {
    const action = updateChartDataAct();
    expect(action).toHaveProperty("type", AS_UPDT_CHART_DATA);
  });

  test("Action creator returns whatever is passed as payload", () => {
    const expected = { hello: "world" };
    const action = updateChartDataAct(expected);
    expect(action).toHaveProperty("payload", expected);
  });
});
