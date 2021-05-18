import { useEffect, useRef } from "react";
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

function ChartComp({ title, labels, data }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const collected = {
      labels,
      datasets: [
        {
          data,
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
    return function cleanup() {
      chart.destroy();
    };
  });

  return (
    <div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

ChartComp.propTypes = {
  labels: PropTypes.array,
  data: PropTypes.array,
};

ChartComp.defaultProps = {
  labels: [],
  data: [],
};

export default ChartComp;
