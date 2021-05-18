import React from "react";

import ChartComp from ".";

export default {
  title: "Chart component",
  component: ChartComp,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => <ChartComp {...args} />;

export const SimpleChart = Template.bind({});
SimpleChart.args = {
  title: "Default title",
  labels: ["A", "B", "C"],
  data: ["10", "20", "30"],
};
