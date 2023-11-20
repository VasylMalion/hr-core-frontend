import { mockTranslations } from 'common/jest/mockModules'
import { authSliceMock } from 'common/mockData'

import Details from './Details'
import { renderWithProviders } from '../../../../../config/jest/testUtils'

beforeAll(() => mockTranslations)

describe('Profile details component', () => {
  it('Test content', async () => {
    const { getByText } = renderWithProviders(<Details />, {
      preloadedState: {
        auth: authSliceMock,
      },
    })

    expect(getByText('personalInfo')).toBeInTheDocument()
    expect(getByText('contactInfo')).toBeInTheDocument()
    expect(getByText('workInfo')).toBeInTheDocument()

    expect(getByText('John')).toBeInTheDocument()
    expect(getByText('Doe')).toBeInTheDocument()
    expect(getByText('gender.MALE')).toBeInTheDocument()
    expect(getByText('1990-05-14')).toBeInTheDocument()

    expect(getByText('test@example.com')).toBeInTheDocument()
    expect(getByText('+1234567890')).toBeInTheDocument()
    expect(getByText('123 Main Street')).toBeInTheDocument()

    expect(getByText('Engineering')).toBeInTheDocument()
    expect(getByText('Software Developer')).toBeInTheDocument()
    expect(getByText('2018-07-01')).toBeInTheDocument()
  })
})
