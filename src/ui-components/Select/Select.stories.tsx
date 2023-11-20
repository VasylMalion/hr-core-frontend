import { Meta, StoryObj } from '@storybook/react'

import Select from './Select'

const meta: Meta = {
  title: 'ui-components/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    value: 'Some value here',
    placeholder: 'Select...',
    options: [
      {
        title: 'First option',
        value: 'First option',
      },
      {
        title: 'Second option',
        value: 'Second option',
      },
      {
        title: 'Third option',
        value: 'Third option',
      },
    ]
  }
}

export default meta

type Story = StoryObj<typeof Select>

export const Default: Story = {
  args: {
    label: 'Default input'
  }
}

export const WithError: Story = {
  args: {
    label: 'Input with error',
    validation: {
      isValid: false,
      errors: ['Value is invalid']
    }
  }
}
