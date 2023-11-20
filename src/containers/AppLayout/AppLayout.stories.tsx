import { Meta, StoryObj } from '@storybook/react'

import AppLayout from './AppLayout'

const meta: Meta = {
  title: 'containers/AppLayout',
  component: AppLayout,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    caption: 'Some value here',
  },
}

export default meta

type Story = StoryObj<typeof AppLayout>

export const Default: Story = {}
