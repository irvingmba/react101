import { call, delay, put } from "redux-saga/effects";
import arrayGen from "../../../Data/ArrayGen";
import { chartActions } from "../../StateManagement/Reducers/ChartReducer/ChartSlice";
import { updDataPointAction } from "../UpdateDataPoint/updateDataPoint";

export default function* updateChartData() {
  try {
    const labels = yield call(arrayGen, 100);
    const data = yield call(arrayGen, 100, null, () =>
    Math.floor(Math.random() * 20)
    );
    yield put(chartActions.updateChart({ labels, data }));
    yield put(updDataPointAction());
  } catch (error) {
    console.error(error);
  }
}
