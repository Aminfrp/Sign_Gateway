import { Meta, StoryFn } from "@storybook/react";
import { SelectChips } from "./SelectChips";

export default {
  title: "Components/SelectChips",
  component: SelectChips,
  argTypes: {
    onClick: { action: "clicked", description: "onClick Event" },
  },
} as Meta;

const Template: StoryFn<any> = (args) => <SelectChips {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "Select Chip",
  isActive: false,
  className: "",
};

export const Active = Template.bind({});
Active.args = {
  title: "Active Chip",
  isActive: true,
  className: "",
};

export const WithCustomClass = Template.bind({});
WithCustomClass.args = {
  title: "Custom Styled Chip",
  isActive: false,
  className: "bg-blue-500 text-white",
};
