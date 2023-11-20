import { Meta, StoryObj } from '@storybook/react'

import WithPreload from './WithPreload'

const meta: Meta = {
  title: 'ui-components/WithPreload',
  component: WithPreload,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    children: 'Some data here',
  }
}

export default meta

type Story = StoryObj<typeof WithPreload>

export const Success: Story = {
  args: {
    isSuccess: true,
    isLoading: false,
    isError: false,
  }
}

export const Loading: Story = {
  args: {
    isSuccess: false,
    isLoading: true,
    isError: false,
  }
}

export const Error: Story = {
  args: {
    isSuccess: false,
    isLoading: false,
    isError: true,
  }
}
