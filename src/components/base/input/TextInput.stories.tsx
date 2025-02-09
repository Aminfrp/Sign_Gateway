import { Meta, StoryFn } from "@storybook/react";
import React, { useState } from "react";
import { TextInput } from "./TextInput";

export default {
  title: "Components/TextInput",
  component: TextInput,
  argTypes: {
    onChange: { action: "changed", description: "onChange Event" },
  },
} as Meta;

const Template: StoryFn<any> = (args) => {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return <TextInput {...args} value={value} onChange={handleChange} />;
};

export const Default = Template.bind({});
Default.args = {
  label: "Enter text",
  placeholder: "Type something...",
  className: "",
  containerClassName: "",
};

export const WithError = Template.bind({});
WithError.args = {
  label: "Enter text with error",
  placeholder: "Type something...",
  error: "This field is required.",
  className: "",
  containerClassName: "",
};

export const WithoutLabel = Template.bind({});
WithoutLabel.args = {
  placeholder: "No label here",
  className: "",
  containerClassName: "",
};

export const WithCustomClass = Template.bind({});
WithCustomClass.args = {
  label: "Custom Styled Input",
  placeholder: "Type in custom styled input",
  className: "bg-gray-100 border border-gray-300 rounded-lg",
  containerClassName: "",
};
