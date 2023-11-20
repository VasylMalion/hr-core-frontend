import { Meta, StoryObj } from '@storybook/react'

import DatePicker from './DatePicker'

const meta: Meta = {
  title: 'ui-components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    value: '2023/11/11',
    placeholder: 'Type here...',
  }
}

export default meta

type Story = StoryObj<typeof DatePicker>

export const Default: Story = {
  args: {
    label: 'Default input'
  }
}

export const Empty: Story = {
  args: {
    label: 'Empty input',
    value: '',
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
