import { call, delay, put } from "redux-saga/effects";
import { updateChartDataAction } from ".";
import arrayGen from "../../../Data/ArrayGen";
import { chartActions } from "../../StateManagement/Reducers/ChartReducer/ChartSlice";

export default function* updateChartData() {
  try {
    const labels = yield call(arrayGen, 100);
    const data = yield call(arrayGen, 100, null, () =>
    Math.floor(Math.random() * 20)
    );
    yield put(chartActions.updateChart({ labels, data }));
    yield delay(5000);
    yield put(updateChartDataAction());
  } catch (error) {
    console.error(error);
  }
}
