import { Meta, StoryObj } from '@storybook/react'

import SelectInput from './SelectInput'

const meta: Meta = {
  title: 'ui-components/SelectInput',
  component: SelectInput,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    value: 'First option First option',
    placeholder: 'Select...',
    data: [
      {
        id: 'First option',
        name: 'First option',
        surname: 'First option',
      },
      {
        id: 'First option',
        name: 'First option',
        surname: 'First option',
      },
      {
        id: 'First option',
        name: 'First option',
        surname: 'First option',
      },
    ]
  }
}

export default meta

type Story = StoryObj<typeof SelectInput>

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
