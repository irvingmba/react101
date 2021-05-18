import { createAction } from "@reduxjs/toolkit";

export const AS_UPDT_CHART_DATA = "AS_UPDT_CHART_DATA";

const updateChartDataAct = createAction(AS_UPDT_CHART_DATA);

export default updateChartDataAct;