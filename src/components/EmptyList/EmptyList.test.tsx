import { render, screen } from '@testing-library/react'

import { mockTranslations } from 'common/jest/mockModules'

import EmptyList from './EmptyList'

beforeAll(() => mockTranslations)

describe('EmptyList component', () => {
  it('Test content', async () => {
    render(<EmptyList />)

    const component = screen.getByTestId('empty-list')

    const svgIcon = component.querySelector(
      "[data-icon='no-result']"
    ) as HTMLImageElement
    const title = screen.getByText('sorry')
    const description = screen.getByText('noResult')

    expect(component).toContainElement(svgIcon)
    expect(component).toContainElement(title)
    expect(component).toContainElement(description)
  })
})
