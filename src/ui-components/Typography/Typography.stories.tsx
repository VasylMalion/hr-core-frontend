import { Meta, StoryObj } from '@storybook/react'

import Typography from './Typography'

const meta: Meta = {
  title: 'ui-components/Typography',
  component: Typography,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    children: 'Some title',
  }
}

export default meta

type Story = StoryObj<typeof Typography>

export const Title: Story = {
  args: {
    appearance: 'title'
  }
}

export const Subtitle: Story = {
  args: {
    appearance: 'subtitle'
  }
}
