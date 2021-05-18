import { runSaga } from "redux-saga";
import { updateChartDataAction } from ".";
import updateChartData from "./UpdateChartData";

describe("Testing saga for update chart data", () => {
  test("Calling saga", async () => {
    const dispatched = [];
    const saga = await runSaga({
        dispatch: (action)=>dispatched.push(action),
        getState: ()=>({value:"test"})
    }, updateChartData).toPromise();
    expect(dispatched).toEqual(expect.arrayContaining([updateChartDataAction()]));
  }, 5500);
});
