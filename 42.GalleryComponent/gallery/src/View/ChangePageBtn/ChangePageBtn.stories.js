import React from "react";
import ChangePageBtn from "./ChangePageBtn";

export default {
  title: "Change Page Button",
  component: ChangePageBtn,
};

const Template = (args) => <ChangePageBtn {...args} />;

export const SimpleButton = Template.bind({});

SimpleButton.args = {
  text: "Next Page",
};
