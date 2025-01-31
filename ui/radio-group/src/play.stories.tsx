import * as React from "react";
import { screen, userEvent } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { RadioGroup as Component, RadioButton } from "./";
import { styled, css, theme } from "@washingtonpost/wpds-theme";

import type { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: "RadioGroup",
  component: Component,
  subcomponents: { RadioButton },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => (
  <Component {...args}>
    <RadioButton label="Option 1" value="opt1" id="opt1" />
    <RadioButton label="Option 2" value="opt2" id="opt2" />
    <RadioButton label="Option 3" value="opt3" id="opt3" />
    <RadioButton label="Option 4" value="opt4" id="opt4" />
  </Component>
);

export const RadioGroup = Template.bind({});

RadioGroup.args = {
  legend: "Select an option",
  name: "my-value",
};

RadioGroup.argTypes = {
  errorMessage: {
    control: "text",
  },
};

RadioGroup.parameters = {
  chromatic: { disableSnapshot: true },
};

const OverflowTemplate: ComponentStory<typeof Component> = () => (
  <Component legend="RadioGroup" name="test" css={{ maxWidth: "170px" }}>
    <RadioButton
      label="Option 1 demonstrates how this text wraps to multiple lines"
      value="opt1"
      id="opt1"
    />
    <RadioButton label="Option 2" value="opt2" id="opt2" />
  </Component>
);

export const Overflow = OverflowTemplate.bind({});
Overflow.parameters = {
  chromatic: { disableSnapshot: true },
};

const ControlledTemplate: ComponentStory<typeof Component> = () => {
  const [value, setValue] = React.useState("opt1");
  function handleValueChange(val) {
    setValue(val);
  }
  return (
    <Component
      legend="Select option"
      onValueChange={handleValueChange}
      value={value}
      name="controlled template"
    >
      <RadioButton label="Option 1" value="opt1" id="opt1" />
      <RadioButton label="Option 2" value="opt2" id="opt2" />
      <RadioButton label="Option 3" value="opt3" id="opt3" />
      <RadioButton label="Option 4" value="opt4" id="opt4" />
    </Component>
  );
};

export const Controlled = ControlledTemplate.bind({});
Controlled.parameters = {
  chromatic: { disableSnapshot: true },
};

const Column = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$100",
  alignItems: "center",
  marginBlockStart: "$200",
});

const HStack = styled("section", {
  display: "flex",
  flexDirection: "row",
  gap: "$100",
  borderRadius: "$075",
});

const Heading = styled("h2", {
  color: theme.colors.primary,
  fontSize: theme.fontSizes["112"],
  marginBlock: 0,
});

const ChromaticTemplate: ComponentStory<typeof Component> = () => (
  <Column>
    <Heading>Variants</Heading>
    <HStack>
      <Component legend="Primary" variant="primary" name="pri">
        <RadioButton label="Option 1" value="opt1" id="p-opt1" checked />
        <RadioButton label="Option 2" value="opt2" id="p-opt2" />
      </Component>
      <Component legend="Secondary" variant="secondary" name="sec">
        <RadioButton label="Option 1" value="opt1" id="s-opt1" checked />
        <RadioButton label="Option 2" value="opt2" id="s-opt2" />
      </Component>
      <Component legend="CTA" variant="cta" name="cta">
        <RadioButton label="Option 1" value="opt1" id="c-opt1" checked />
        <RadioButton label="Option 2" value="opt2" id="c-opt2" />
      </Component>
    </HStack>
    <Heading>isOutline</Heading>
    <HStack>
      <Component legend="Primary" variant="primary" name="o-pri" isOutline>
        <RadioButton label="Option 1" value="opt1" id="op-opt1" checked />
        <RadioButton label="Option 2" value="opt2" id="op-opt2" />
      </Component>
      <div
        className={css({ backgroundColor: "$onSecondary", padding: "$025" })()}
      >
        <Component
          legend={
            <span className={css({ color: "$secondary" })()}>Secondary</span>
          }
          variant="secondary"
          name="o-sec"
          isOutline
        >
          <RadioButton label="Option 1" value="opt1" id="os-opt1" checked />
          <RadioButton label="Option 2" value="opt2" id="os-opt2" />
        </Component>
      </div>
      <Component legend="CTA" variant="cta" name="o-cta" isOutline>
        <RadioButton label="Option 1" value="opt1" id="oc-opt1" checked />
        <RadioButton label="Option 2" value="opt2" id="oc-opt2" />
      </Component>
    </HStack>
    <Heading>Disabled</Heading>
    <Component legend="Select an option" name="dis" disabled>
      <RadioButton label="Option 1" value="opt1" id="d-opt1" checked />
      <RadioButton label="Option 2" value="opt2" id="d-opt2" />
    </Component>
    <Heading>Error</Heading>
    <Component
      legend="Select an option"
      name="err"
      error
      errorMessage="Error message"
    >
      <RadioButton label="Option 1" value="opt1" id="e-opt1" checked />
      <RadioButton label="Option 2" value="opt2" id="e-opt2" />
    </Component>
    <Heading>Overflow</Heading>
    <Component
      legend="Select an option"
      name="overflow"
      css={{ maxWidth: "170px" }}
    >
      <RadioButton
        label="Option 1 demonstrates how this text wraps to multiple lines"
        value="opt1"
        id="o-opt1"
      />
      <RadioButton label="Option 2" value="opt2" id="o-opt2" />
    </Component>
  </Column>
);

export const Chromatic = ChromaticTemplate.bind({});
Chromatic.args = {};

const InteractionsTemplate: ComponentStory<typeof Component> = () => (
  <Component legend="RadioGroup" name="test">
    <RadioButton label="Option 1" value="opt1" id="p-opt1" />
    <RadioButton label="Option 2" value="opt2" id="p-opt2" />
  </Component>
);

export const Interactions = InteractionsTemplate.bind({});
Interactions.parameters = {
  chromatic: { disableSnapshot: true },
};

// Function to emulate pausing between interactions
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

Interactions.play = async () => {
  const input1 = screen.getByLabelText("Option 1");
  const input2 = screen.getByLabelText("Option 2");
  await userEvent.click(input1);
  await expect(input1).toBeChecked();
  await userEvent.keyboard("[ArrowDown]");
  await sleep(0);
  await userEvent.keyboard(" ");
  await expect(input2).toBeChecked();
};
