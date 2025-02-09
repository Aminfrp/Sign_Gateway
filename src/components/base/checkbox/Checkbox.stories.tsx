import { Meta, StoryFn } from "@storybook/react";
import { CheckBox } from "./Checkbox";

export default {
  title: "Components/CheckBox",
  component: CheckBox,
  argTypes: {
    label: {
      control: "text",
    },
    containerClassName: {
      control: "text",
    },
    id: {
      control: "text",
    },
  },
} as Meta;

const Template: StoryFn = (args) => <CheckBox {...args} />;

export const DefaultCheckBox = Template.bind({});
DefaultCheckBox.args = {
  label: "Default CheckBox",
  containerClassName: "bg-gray-100 p-2",
  id: "",
};

export const CustomClassCheckBox = Template.bind({});
CustomClassCheckBox.args = {
  label: "CheckBox with Custom Class",
  containerClassName: "bg-blue-200 p-4 rounded-md",
  id: "",
};

export const CustomLabelCheckBox = Template.bind({});
CustomLabelCheckBox.args = {
  label: "Custom Label Text Here",
  containerClassName: "bg-green-200 p-4",
  id: "",
};

export const NoLabelCheckBox = Template.bind({});
NoLabelCheckBox.args = {
  label: "",
  containerClassName: "bg-yellow-200 p-4",
  id: "",
};

export const WithSpecificID = Template.bind({});
WithSpecificID.args = {
  label: "CheckBox with Specific ID",
  containerClassName: "bg-red-200 p-4",
  id: "custom-id-1234",
};
