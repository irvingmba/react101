import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import {
  Chart,
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Title,
} from "chart.js";

Chart.register(
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Title
);

function ChartComp({ title, labels, data, updPoint }) {
  const canvasRef = useRef(null);

  const chartRef = useRef(null);

  useEffect(() => {
    const collected = {
      labels,
      datasets: [
        {
          data: [...data],
          fill: false,
          borderColor: "rgb(75, 192, 192)",
        },
      ],
    };
    const options = { plugins: { title: { display: true, text: title } } };
    const chart = new Chart(canvasRef.current, {
      type: "line",
      data: collected,
      options,
    });

    chartRef.current = chart;

    return function cleanup() {
      chart.destroy();
    };
  }, []);

  useEffect(() => {
    const [point] = updPoint;
    if(typeof point === "number"){
      chartRef.current.data.datasets[0].data.shift();
      chartRef.current.data.datasets[0].data.push(point);
    }
    chartRef.current.update();
  }, [updPoint]);

  return (
    <div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

ChartComp.propTypes = {
  title: PropTypes.string,
  labels: PropTypes.array,
  data: PropTypes.array,
  updPoint: PropTypes.array
};

ChartComp.defaultProps = {
  title: "",
  labels: [],
  data: [],
  updPoint: []
};

export default ChartComp;
