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
  prevBtn: "Previous",
  nextBtn: "Next",
};

FullDoubleColumn.args = {
  data: new Array(10).fill(testData[1]),
  prevBtn: "Previous",
  nextBtn: "Next",
};

FullDoubleRow.args = {
  data: new Array(10).fill(testData[2]),
  prevBtn: "Previous",
  nextBtn: "Next",
};
