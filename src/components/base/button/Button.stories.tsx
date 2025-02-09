import { Meta, StoryFn } from "@storybook/react";
import { Button } from "./Button";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    variant: {
      control: {
        type: "radio",
        options: ["default", "outline", "ghost", "link"],
      },
    },
    isLoading: {
      control: "boolean",
    },
    className: {
      control: "text",
    },
    children: {
      control: "text",
    },
  },
} as Meta;

const Template: StoryFn = (args) => <Button {...args}>Click</Button>;

export const Default = Template.bind({});
Default.args = {
  children: "Click Me",
  variant: "default",
  isLoading: false,
  className: "",
};

export const Outline = Template.bind({});
Outline.args = {
  children: "Outline Button",
  variant: "outline",
  isLoading: false,
  className: "",
};

export const Ghost = Template.bind({});
Ghost.args = {
  children: "Ghost Button",
  variant: "ghost",
  isLoading: false,
  className: "",
};

export const Link = Template.bind({});
Link.args = {
  children: "Link Button",
  variant: "link",
  isLoading: false,
  className: "",
};

export const Loading = Template.bind({});
Loading.args = {
  children: "Loading...",
  variant: "default",
  isLoading: true,
  className: "",
};

export const CustomClass = Template.bind({});
CustomClass.args = {
  children: "Custom Class Button",
  variant: "default",
  isLoading: false,
  className: "bg-blue-500 text-white",
};

export const OutlineLoading = Template.bind({});
OutlineLoading.args = {
  children: "Loading Outline Button",
  variant: "outline",
  isLoading: true,
  className: "",
};

export const AllProps = Template.bind({});
AllProps.args = {
  children: "Full Button",
  variant: "outline",
  isLoading: true,
  className: "px-8",
};
