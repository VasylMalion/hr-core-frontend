import { Meta, StoryObj } from '@storybook/react'

import EmptyList from './EmptyList'

const meta: Meta = {
  title: 'components/EmptyList',
  component: EmptyList,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
}

export default meta

type Story = StoryObj<typeof EmptyList>

export const Default: Story = {}
