import { render, screen } from '@testing-library/react'

import Button from './Button'

describe('Button component', () => {
  test('Test default button', () => {
    render(<Button>Text</Button>)

    expect(screen.getByText('Text')).toBeInTheDocument()
    expect(screen.getByText('Text')).toHaveClass('bg-blue')
  })

  test('Test disabled button', () => {
    render(<Button disabled>Text</Button>)

    expect(screen.getByText('Text')).toHaveAttribute('disabled')
  })

  test('Test loading button', () => {
    render(<Button isLoading>Text</Button>)

    expect(screen.getByText('Text')).toBeInTheDocument()
    expect(screen.getByTestId('loading-svg')).toBeInTheDocument()
  })
})
