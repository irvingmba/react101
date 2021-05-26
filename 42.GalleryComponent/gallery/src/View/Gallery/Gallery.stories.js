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
export const Mixed = Template.bind({});

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

Mixed.args = {
  data: new Array(10).fill(1).map((val, index) => {
    const rdmNum = Math.floor(Math.random() * 10);
    return {
      src:
        rdmNum > 6
          ? `https://picsum.photos/600/300?random=${index + 1}`
          : rdmNum < 4
          ? `https://picsum.photos/300/600?random=${index + 1}`
          : `https://picsum.photos/400?random=${index + 1}`,
      width: rdmNum > 6 ? 600 : rdmNum < 4 ? 300 : 400,
      height: rdmNum > 6 ? 300 : rdmNum < 4 ? 600 : 400,
    };
  }),
  prevBtn: "Previous",
  nextBtn: "Next",
  pages: 5,
  page: 3
};
