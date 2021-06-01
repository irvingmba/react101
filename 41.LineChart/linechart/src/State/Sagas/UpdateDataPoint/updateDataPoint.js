import { actionChannel, call, delay, put, take } from "redux-saga/effects";
import { createAction } from "@reduxjs/toolkit";
import { chartActions } from "../../StateManagement/Reducers/ChartReducer/ChartSlice";

export const AS_UPD_DATA_POINT = "AS_UPD_DATA_POINT";

export default function* channUpdDataPoint() {
  const updChannel = yield actionChannel(AS_UPD_DATA_POINT);
  while (true) {
    yield take(updChannel);
    yield delay(2000);
    yield put(chartActions.updatePointChart(Math.floor(Math.random() * 20)));
    yield put(updDataPointAction());
  }
}

export const updDataPointAction = createAction(AS_UPD_DATA_POINT);
