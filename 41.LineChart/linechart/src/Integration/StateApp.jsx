import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { updateChartDataAction } from "../State/Sagas/UpdateChartData";
import { updDataPointAction } from "../State/Sagas/UpdateDataPoint/updateDataPoint";
import ChartComp from "../View/Components/ChartComp";

const mapStateToProps = (state) => {
  const { title, labels, data, updPoint } = state.chart;
  return { title, labels, data, updPoint };
};

const FullChartComp = connect(mapStateToProps)(ChartComp);

export default function StateApp() {
  const dispatch = useDispatch();
  dispatch(updateChartDataAction());
  // useEffect(() => {
  // });

  return <FullChartComp />;
}
