import { Meta, StoryObj } from '@storybook/react'

import Input from './Input'

const meta: Meta = {
  title: 'ui-components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    value: 'Some value here',
    placeholder: 'Type here...'
  }
}

export default meta

type Story = StoryObj<typeof Input>

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

export const Password: Story = {
  args: {
    label: 'Password',
    value: 'Password123',
    type: 'password',
  }
}
