import { runSaga } from "redux-saga";
import { fork, takeEvery } from "redux-saga/effects";
import rootSaga from "./RootSaga";
import updateChartData from "./UpdateChartData";
import { AS_UPDT_CHART_DATA } from "./UpdateChartData/UpdateChartDataAct";

const spyError = jest.spyOn(console, "error");

describe("Testing root saga", () => {
  test("When calling the saga, it waits for an action to trigger another saga", () => {
    const watcher = rootSaga();
    const watchFn = watcher.next();
    expect(watchFn.value).toEqual(
      takeEvery(AS_UPDT_CHART_DATA, updateChartData)
    );
  });

  test("Testing errors within saga", () => {
    spyError.mockImplementationOnce(jest.fn());
    const watcher = rootSaga();
  });
});
