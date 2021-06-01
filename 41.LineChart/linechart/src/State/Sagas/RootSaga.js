import {  fork, takeEvery } from "redux-saga/effects";
import updateChartData from "./UpdateChartData";
import { AS_UPDT_CHART_DATA } from "./UpdateChartData/UpdateChartDataAct";
import channUpdDataPoint from "./UpdateDataPoint/updateDataPoint";

export default function* rootSaga() {
  yield takeEvery(AS_UPDT_CHART_DATA, updateChartData);
  yield fork(channUpdDataPoint);
}
