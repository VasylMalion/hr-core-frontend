import { Meta, StoryObj } from '@storybook/react'

import FieldErrors from './FieldErrors'

const meta: Meta = {
  title: 'ui-components/FieldErrors',
  component: FieldErrors,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    isValid: false,
  }
}

export default meta

type Story = StoryObj<typeof FieldErrors>

export const Single: Story = {
  args: {
    errors: ['Some error message']
  }
}

export const Multiple: Story = {
  args: {
    errors: ['First error message', 'Second error message']
  }
}
