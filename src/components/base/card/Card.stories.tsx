import { Meta, StoryFn } from "@storybook/react";
import { Card } from "./Card";

export default {
  title: "Components/Card",
  component: Card,
  argTypes: {
    className: { control: "text", description: "Custom Class" },
    children: { control: "text", description: "Card Content" },
  },
} as Meta;

const Template: StoryFn = (args) => <Card {...args}>Card</Card>;
const CardHeaderTemplate: StoryFn = (args) => (
  <Card.Header {...args}>Card Header</Card.Header>
);
const CardBodyTemplate: StoryFn = (args) => (
  <Card.Body {...args}>Card Body</Card.Body>
);

export const DefaultCard = Template.bind({});
DefaultCard.args = {
  children: (
    <>
      <Card.Header>Card Header</Card.Header>
      <Card.Body>This is the body of the card</Card.Body>
    </>
  ),
  className: "",
};

export const CustomClassCard = Template.bind({});
CustomClassCard.args = {
  children: (
    <>
      <Card.Header>Custom Card Header</Card.Header>
      <Card.Body>Custom Card Body content</Card.Body>
    </>
  ),
  className: "bg-blue-100",
};

export const HeaderAndBody = Template.bind({});
HeaderAndBody.args = {
  children: (
    <>
      <Card.Header>Only Header and Body</Card.Header>
      <Card.Body>This is just a simple card with header and body.</Card.Body>
    </>
  ),
  className: "",
};

export const CardHeaderStory = CardHeaderTemplate.bind({});
CardHeaderStory.args = {
  children: "Card Header Content",
  className: "bg-gray-200",
};

export const CardBodyStory = CardBodyTemplate.bind({});
CardBodyStory.args = {
  children: "Card Body Content",
  className: "text-gray-700",
};
