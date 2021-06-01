import { createSlice } from "@reduxjs/toolkit";
import updateChart from "./ActionReducers/UpdateChart";
import updatePointChart from "./ActionReducers/updatePointChart";

const initialState = {
  title: "",
  labels: [],
  data: [],
  updPoint: [null]
};

const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: { updateChart, updatePointChart },
});

const chartReducer = chartSlice.reducer;

export const chartActions = chartSlice.actions;

export default chartReducer;
