import { Meta, StoryObj } from '@storybook/react'

import SuspensePreloader from './SuspensePreloader'

const meta: Meta = {
  title: 'components/SuspensePreloader',
  component: SuspensePreloader,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
}

export default meta

type Story = StoryObj<typeof SuspensePreloader>

export const Default: Story = {
  args: {
    fullView: false,
  },
}

export const FullView: Story = {
  args: {
    fullView: true,
  },
}
