import { Meta, StoryObj } from '@storybook/react'

import TextArea from './TextArea'

const meta: Meta = {
  title: 'ui-components/TextArea',
  component: TextArea,
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

type Story = StoryObj<typeof TextArea>


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
