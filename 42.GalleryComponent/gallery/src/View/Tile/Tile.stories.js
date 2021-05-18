import React from "react";
import Tile from "./Tile";

export default {
  title: "Tile",
  component: Tile,
};

const Template = (args) => <Tile {...args} />;

export const SimpleTile = Template.bind({});
export const DoubleColumnTile = Template.bind({});
export const DoubleRowTile = Template.bind({});

SimpleTile.args = {
  src:
    "https://i.pinimg.com/originals/56/f7/e0/56f7e05383e2430e0757cbf01b81521a.jpg",
  width: 900,
  height: 900,
};

DoubleColumnTile.args = {
  src:
    "https://i0.wp.com/www.bitme.gg/wp-content/uploads/2021/03/Raphtalia-de-The-Rising-of-the-Shield-Hero-llega-a-la-vida-en-este-cosplay.jpg?fit=1280%2C720&ssl=1",
  width: 1280,
  height: 600,
};

DoubleRowTile.args = {
    src: "https://i.pinimg.com/564x/2f/29/7d/2f297d08d7fc2b1b9337b8cabadd9e88.jpg",
    width: 300,
    height: 768
};