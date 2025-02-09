import { Alert } from "./Alert";

export default {
  title: "Components/Alert",
  component: Alert,
};

// Default alert story
export const Default = () => (
  <Alert>This is a default alert with an info icon and a message.</Alert>
);

// Alert with long text
export const LongText = () => (
  <Alert>
    This is a longer text alert. It contains more details to showcase how the
    Alert component handles longer text content. This is useful for testing how
    the component responds to larger amounts of content.
  </Alert>
);

export const CustomContent = () => (
  <Alert>
    <strong>Warning:</strong> This is a custom alert with rich content inside!
  </Alert>
);
