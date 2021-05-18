import { createSlice } from "@reduxjs/toolkit";
import updateChart from "./ActionReducers/UpdateChart";

const initialState = {
  title: "",
  labels: [],
  data: [],
};

const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: { updateChart },
});

const chartReducer = chartSlice.reducer;

export const chartActions = chartSlice.actions;

export default chartReducer;
