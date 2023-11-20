import { screen } from '@testing-library/react'

import Dashboard from './Dashboard'
import { renderWithProviders } from '../../../config/jest/testUtils'

describe('Dashboard component', () => {
  it('Test content', async () => {
    renderWithProviders(<Dashboard />)

    const title = screen.getByText('Welcome to our application👋')
    expect(title).toBeInTheDocument()

    const image = screen.getByAltText('Welcome image')
    expect(image).toHaveClass('mx-auto')
  })
})
