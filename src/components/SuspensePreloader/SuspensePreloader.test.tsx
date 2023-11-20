import { render, screen } from '@testing-library/react'

import SuspensePreloader from './SuspensePreloader'

describe('SuspensePreloader component', () => {
  it('Test component with the default view', async () => {
    render(<SuspensePreloader />)

    const component = screen.getByTestId('suspense-preloader')
    expect(component).toHaveClass('h-full')

    const loading = screen.getByTestId('loading')
    expect(component).toContainElement(loading)
  })

  it('Test component with the full view', async () => {
    render(<SuspensePreloader fullView />)

    const component = screen.getByTestId('suspense-preloader')
    expect(component).toHaveClass('h-screen')

    const loading = screen.getByTestId('loading')
    expect(component).toContainElement(loading)
  })
})
