import React from "react";
import testData from "../../__test-utils__/Data/TestData";
import Gallery from "./Gallery";

export default {
  title: "Gallery",
  component: Gallery,
};

const Template = (args) => <Gallery {...args} />;

export const SimpleFull = Template.bind({});
export const FullDoubleColumn = Template.bind({});
export const FullDoubleRow = Template.bind({});

SimpleFull.args = {
  data: new Array(10).fill(testData[0]),
};

FullDoubleColumn.args = {
  data: new Array(10).fill(testData[1]),
};

FullDoubleRow.args = {
  data: new Array(10).fill(testData[2]),
};
