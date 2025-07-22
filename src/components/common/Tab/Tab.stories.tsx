import React from 'react';
import { Meta, Story } from '@storybook/react';
import Tab, { TabProps } from './Tab';

export default {
  title: 'Common/Tab',
  component: Tab,
  argTypes: {
    active: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
} as Meta;

const Template: Story<TabProps> = (args) => <Tab {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Tab Label',
};

export const Active = Template.bind({});
Active.args = {
  label: 'Active Tab',
  active: true,
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  label: 'Tab with Icon',
  icon: <span>📁</span>,
};