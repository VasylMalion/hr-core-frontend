import { Meta, StoryObj } from '@storybook/react'

import TabNavigation from './TabNavigation'

const meta: Meta = {
  title: 'ui-components/TabNavigation',
  component: TabNavigation,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    value: 'Active',
    options: [
      {
        title: 'All',
        value: 'All'
      },
      {
        title: 'Active',
        value: 'Active'
      },
      {
        title: 'Closed',
        value: 'Closed'
      },
    ]
  }
}

export default meta

type Story = StoryObj<typeof TabNavigation>

export const Default: Story = {}
