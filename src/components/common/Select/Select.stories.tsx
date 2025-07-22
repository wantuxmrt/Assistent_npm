import React from 'react';
import { Meta, Story } from '@storybook/react';
import Select, { SelectProps } from './Select';

export default {
  title: 'Common/Select',
  component: Select,
  argTypes: {
    value: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    onChange: { action: 'changed' },
  },
} as Meta;

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

const Template: Story<SelectProps> = (args) => <Select {...args} options={options} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Select an option',
};

export const WithValue = Template.bind({});
WithValue.args = {
  value: 'option2',
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};