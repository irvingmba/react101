import { runSaga } from "redux-saga";
import { fork, takeEvery } from "redux-saga/effects";
import rootSaga from "./RootSaga";
import updateChartData from "./UpdateChartData";
import { AS_UPDT_CHART_DATA } from "./UpdateChartData/UpdateChartDataAct";
import channUpdDataPoint from "./UpdateDataPoint/updateDataPoint";

describe("Testing root saga", () => {
  test("When calling the saga, it waits for an action to trigger another saga", () => {
    const watcher = rootSaga();
    const watchFn = watcher.next();
    expect(watchFn.value).toEqual(
      takeEvery(AS_UPDT_CHART_DATA, updateChartData)
    );
    const watchChannel = watcher.next();
    expect(watchChannel.value).toEqual(fork(channUpdDataPoint));
  });
});
