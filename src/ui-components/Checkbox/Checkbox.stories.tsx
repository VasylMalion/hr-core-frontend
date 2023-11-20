import { Meta, StoryObj } from '@storybook/react'

import Checkbox from './Checkbox'

const meta: Meta = {
  title: 'ui-components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    caption: 'Some value here'
  }
}

export default meta

type Story = StoryObj<typeof Checkbox>

export const Checked: Story = {
  args: {
    checked: true
  }
}

export const NotChecked: Story = {
  args: {
    checked: false
  }
}

export const Long: Story = {
  args: {
    checked: false,
    caption: `It is a long established fact that a reader will be distracted by the readable content of a page 
    when looking at its layout. It is a long established fact that a reader will be distracted by the readable 
    content of a page when looking at its layout. It is a long established fact that a reader will be distracted 
    by the readable content of a page when looking at its layout`,
  }
}
