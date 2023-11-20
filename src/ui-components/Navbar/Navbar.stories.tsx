import { Meta, StoryObj } from '@storybook/react'

import Navbar from './Navbar'

const meta: Meta = {
  title: 'ui-components/Navbar',
  component: Navbar,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
}

export default meta

type Story = StoryObj<typeof Navbar>

export const Default: Story = {}
