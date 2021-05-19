import React from "react";
import Tile from "./Tile";
import testData from "../../__test-utils__/Data/TestData";

export default {
  title: "Tile",
  component: Tile,
};

const Template = (args) => <Tile {...args} />;

export const SimpleTile = Template.bind({});
export const DoubleColumnTile = Template.bind({});
export const DoubleRowTile = Template.bind({});

SimpleTile.args = testData[0];

DoubleColumnTile.args = testData[1];

DoubleRowTile.args = testData[2];