import { call, takeEvery } from "redux-saga/effects";
import updateChartData from "./UpdateChartData";
import { AS_UPDT_CHART_DATA } from "./UpdateChartData/UpdateChartDataAct";

export default function* rootSaga() {
  yield takeEvery(AS_UPDT_CHART_DATA, updateChartData);
}
