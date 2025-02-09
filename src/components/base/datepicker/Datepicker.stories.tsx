import { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import { onDatePickerChangePayload } from "zaman/dist/types";
import { Datepicker } from "./Datepicker";

export default {
  title: "Components/Datepicker",
  component: Datepicker,
  argTypes: {
    onChange: { action: "changed" },
  },
} as Meta;

const Template: StoryFn<any> = (args) => {
  const [value, setValue] = useState<onDatePickerChangePayload | null>(null);

  const handleChange = (payload: onDatePickerChangePayload) => {
    setValue(payload);
  };

  return <Datepicker {...args} value={value} onChange={handleChange} />;
};

export const Default = Template.bind({});
Default.args = {
  label: "Select Date",
  placeholder: "Choose a date",
  className: "",
};

export const WithCustomClass = Template.bind({});
WithCustomClass.args = {
  label: "Custom Class Datepicker",
  placeholder: "Select a custom date",
  className: "bg-blue-500",
};

export const WithoutLabel = Template.bind({});
WithoutLabel.args = {
  placeholder: "No label",
  className: "",
  label: "",
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: "Disabled Datepicker",
  placeholder: "Can't select a date",
  className: "",
  value: null,
  onChange: undefined,
};
