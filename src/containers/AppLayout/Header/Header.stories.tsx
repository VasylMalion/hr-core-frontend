import { Meta, StoryObj } from '@storybook/react'

import Header from './Header'

const meta: Meta = {
  title: 'containers/Header',
  component: Header,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    caption: 'Some value here',
  },
}

export default meta

type Story = StoryObj<typeof Header>

export const Default: Story = {}
