import { rest } from 'msw'
import { screen, waitFor } from '@testing-library/react'

import { renderWithProviders } from 'common/jest/renderWithProviders'
import { mockTranslations } from 'common/jest/mockModules'
import { authSliceAdminMock, mockCandidate } from 'common/mockData'
import { RoutePaths } from 'containers/AppRouter'

import CandidateDetails from './CandidateDetails'
import { server } from '../../../../config/jest/mockHttpServer'

const navigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => navigate,
}))

beforeAll(() => mockTranslations)

describe('Candidate details component', () => {
  it('Test component with the successful request', async () => {
    const { getByText, findByText, getByTestId } = renderWithProviders(
      <CandidateDetails />
    )

    server.use(
      rest.get(`*`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(mockCandidate))
      })
    )

    expect(getByTestId('loading')).toBeInTheDocument()
    expect(await findByText('title')).toBeInTheDocument()

    expect(getByText('personalInfo')).toBeInTheDocument()
    expect(getByText('contactInfo')).toBeInTheDocument()
    expect(getByText('workInfo')).toBeInTheDocument()

    expect(getByText('John')).toBeInTheDocument()
    expect(getByText('Doe')).toBeInTheDocument()
    expect(getByText('gender.MALE')).toBeInTheDocument()
    expect(getByText('1990-05-14')).toBeInTheDocument()

    expect(getByText('john@example.com')).toBeInTheDocument()
    expect(getByText('+1234567890')).toBeInTheDocument()
    expect(getByText('Some City')).toBeInTheDocument()

    expect(getByText('Software Developer')).toBeInTheDocument()
    expect(getByText('salaryValue')).toBeInTheDocument()
  })

  it('Test component with the failed request', async () => {
    const { findByTestId, getByTestId } = renderWithProviders(
      <CandidateDetails />
    )

    server.use(
      rest.get(`*`, (req, res, ctx) => {
        return res(ctx.status(500), ctx.json('GENERAL_ERROR'))
      })
    )

    expect(getByTestId('loading')).toBeInTheDocument()

    const element = await findByTestId('fail')
    expect(element).toBeInTheDocument()
  })

  it('Testing for successful removal of the candidate', async () => {
    const { user, getByTestId, getByText, findByText } = renderWithProviders(
      <CandidateDetails />,
      {
        preloadedState: {
          auth: authSliceAdminMock,
        },
      }
    )

    server.use(
      rest.delete(`*`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({}))
      })
    )

    expect(getByTestId('loading')).toBeInTheDocument()

    const button = await findByText('deleteCandidate')
    await user.click(button)
    waitFor(() => expect(getByText('deletingTitle')).toBeInTheDocument)

    await user.click(await findByText('yes'))
    waitFor(() => expect(findByText('successTitle')).toBeInTheDocument)

    await user.click(screen.getByText('ok'))
    waitFor(() => expect(navigate).toHaveBeenCalledWith(RoutePaths.CANDIDATES))
  })

  it('Testing the failed removal of the candidate', async () => {
    const { user, getByTestId, getByText, findByText } = renderWithProviders(
      <CandidateDetails />,
      {
        preloadedState: {
          auth: authSliceAdminMock,
        },
      }
    )

    server.use(
      rest.delete(`*`, (req, res, ctx) => {
        return res(ctx.status(500), ctx.json('GENERAL_ERROR'))
      })
    )

    expect(getByTestId('loading')).toBeInTheDocument()

    const button = await findByText('deleteCandidate')
    await user.click(button)
    waitFor(() => expect(getByText('deletingTitle')).toBeInTheDocument)

    await user.click(await findByText('yes'))
    waitFor(() => expect(findByText('failTitle')).toBeInTheDocument)

    await user.click(screen.getByText('ok'))
    waitFor(() => expect(findByText('failTitle')).not.toBeInTheDocument)
  })
})
