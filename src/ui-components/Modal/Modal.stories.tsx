import { Meta, StoryObj } from '@storybook/react'

import Button from 'ui-components/Button/Button'

import Modal from './Modal'

const meta: Meta = {
  title: 'ui-components/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    isOpen: true,
    onClose: { action: 'clicked' }
  }
}

export default meta

type Story = StoryObj<typeof Modal>

export const Small: Story = {
  args: {
    title: 'Small modal',
    body: 'Description of the small modal',
  }
}

export const Large: Story = {
  args: {
    title: 'Large modal',
    body: `It is a long established fact that a reader will be distracted by the readable content of a page 
    when looking at its layout. It is a long established fact that a reader will be distracted by the readable 
    content of a page when looking at its layout. It is a long established fact that a reader will be distracted 
    by the readable content of a page when looking at its layout`,
  }
}

export const WithButtons: Story = {
  args: {
    title: 'Small modal',
    body: 'Description of the small modal',
    buttons: (
      <>
        <Button>Confirm</Button>
        <Button type='secondary'>Cancel</Button>
      </>
    )
  }
}
