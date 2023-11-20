import { Meta, StoryObj } from '@storybook/react'
import PlusIcon from 'assets/svgs/PlusIcon'

import Button from './Button'

const meta: Meta = {
  title: 'ui-components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    type: 'primary',
  }
}

export default meta

type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    children: 'Primary button',
  }
}

export const Secondary: Story = {
  args: {
    type: 'secondary',
    children: 'Secondary button',
  }
}

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled button',
  }
}

export const WithLoading: Story = {
  args: {
    isLoading: true,
    children: 'Button with loading',
  }
}

export const WithIcon: Story = {
  args: {
    type: 'primary',
    children: 'Secondary button',
    icon: <PlusIcon />
  }
}
