import { Meta, StoryObj } from '@storybook/react'

import ToolTip from './ToolTip'

const meta: Meta = {
  title: 'ui-components/ToolTip',
  component: ToolTip,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    children: <div className='bg-red h-8 w-8'></div>,
    placeholder: 'Tooltip'
  }
}

export default meta

type Story = StoryObj<typeof ToolTip>

export const Default: Story = {}
