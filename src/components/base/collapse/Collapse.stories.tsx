import { Meta, StoryFn } from "@storybook/react";
import { Collapse } from "./Collapse";

export default {
  title: "Components/Collapse",
  component: Collapse,
  argTypes: {
    className: { control: "text" },
  },
} as Meta;

const Template: StoryFn = (args) => <Collapse {...args} />;

export const DefaultCollapse = Template.bind({});
DefaultCollapse.args = {
  className: "bg-gray-100 p-4",
};

export const CustomClassCollapse = Template.bind({});
CustomClassCollapse.args = {
  className: "bg-blue-200 p-6",
};

export const CustomContentCollapse = Template.bind({});
CustomContentCollapse.args = {
  className: "bg-green-100 p-4",
};
