import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { updateChartDataAction } from "../State/Sagas/UpdateChartData";
import ChartComp from "../View/Components/ChartComp";

const mapStateToProps = (state) => {
  const { title, labels, data } = state.chart;
  return { title, labels, data };
};

const FullChartComp = connect(mapStateToProps)(ChartComp);

export default function StateApp() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateChartDataAction());
  });
  return <FullChartComp />;
}
