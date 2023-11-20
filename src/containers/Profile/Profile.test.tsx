import { screen } from '@testing-library/react'

import { mockTranslations } from 'common/jest/mockModules'
import { authSliceMock } from 'common/mockData'

import { renderWithProviders } from '../../../config/jest/testUtils'
import Profile from './Profile'

beforeAll(() => mockTranslations)

describe('Profile component', () => {
  it('Test content', async () => {
    const { user } = renderWithProviders(<Profile />, {
      preloadedState: {
        auth: authSliceMock,
      },
    })

    const title = screen.getByText('title')
    expect(title).toBeInTheDocument()

    const tabs = screen
      .getByTestId('tab-navigation')
      .querySelectorAll('.whitespace-pre')
    expect(tabs[0]).toHaveClass('border-b-green')
    expect(tabs[1]).not.toHaveClass('border-b-green')

    const detailsTabContent = screen.getByText('personalInfo')
    expect(detailsTabContent).toBeInTheDocument()

    await user.click(tabs[1])

    expect(tabs[0]).not.toHaveClass('border-b-green')
    expect(tabs[1]).toHaveClass('border-b-green')

    const passwordTabContent = screen.getByText('update')
    expect(passwordTabContent).toBeInTheDocument()
  })
})
