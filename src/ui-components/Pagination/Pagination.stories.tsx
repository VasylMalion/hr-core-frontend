import { Meta, StoryObj } from '@storybook/react'

import Pagination from './Pagination'

const meta: Meta = {
  title: 'ui-components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    pagesCount: 5,
  },
}

export default meta

type Story = StoryObj<typeof Pagination>

export const First: Story = {
  args: {
    currentPage: 1
  }
}

export const Middle: Story = {
  args: {
    currentPage: 3
  }
}

export const Last: Story = {
  args: {
    currentPage: 5
  }
}
