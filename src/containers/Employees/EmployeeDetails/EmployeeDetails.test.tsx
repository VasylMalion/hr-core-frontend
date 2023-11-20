import { rest } from 'msw'
import { screen, waitFor } from '@testing-library/react'

import { renderWithProviders } from 'common/jest/renderWithProviders'
import { mockTranslations } from 'common/jest/mockModules'
import {
  authSliceMock,
  adminMock,
  mockCandidate,
  userMock,
  authSliceAdminMock,
} from 'common/mockData'
import { RoutePaths } from 'containers/AppRouter'

import EmployeeDetails from './EmployeeDetails'
import { server } from '../../../../config/jest/mockHttpServer'

const navigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => navigate,
}))

beforeAll(() => mockTranslations)

describe('Candidate details component', () => {
  it('Test component with the successful request', async () => {
    server.use(
      rest.get(`*`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(adminMock))
      })
    )

    const { getByText, findByText, getByTestId } = renderWithProviders(
      <EmployeeDetails />
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

    expect(getByText('test@example.com')).toBeInTheDocument()
    expect(getByText('+1234567890')).toBeInTheDocument()
    expect(getByText('123 Main Street')).toBeInTheDocument()

    expect(getByText('Engineering')).toBeInTheDocument()
    expect(getByText('Software Developer')).toBeInTheDocument()
    expect(getByText('2018-07-01')).toBeInTheDocument()
  })

  it('Test component with the failed request', async () => {
    server.use(
      rest.get(`*`, (req, res, ctx) => {
        return res(ctx.status(500), ctx.json('GENERAL_ERROR'))
      })
    )
    const { findByTestId, getByTestId } = renderWithProviders(
      <EmployeeDetails />
    )

    expect(getByTestId('loading')).toBeInTheDocument()

    const element = await findByTestId('fail')
    expect(element).toBeInTheDocument()
  })

  it('Testing for successful removal of the candidate', async () => {
    server.use(
      rest.get(`*`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(adminMock))
      })
    )

    const { user, getByTestId, getByText, findByText } = renderWithProviders(
      <EmployeeDetails />,
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

    const button = await findByText('deleteEmployee')
    await user.click(button)
    waitFor(() => expect(getByText('deletingTitle')).toBeInTheDocument)

    await user.click(await findByText('yes'))
    waitFor(() => expect(findByText('successTitle')).toBeInTheDocument)

    await user.click(screen.getByText('ok'))
    waitFor(() => expect(navigate).toHaveBeenCalledWith(RoutePaths.EMPLOYEES))
  })

  it('Testing the failed removal of the candidate', async () => {
    server.use(
      rest.get(`*`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(adminMock))
      })
    )

    const { user, getByTestId, getByText, findByText } = renderWithProviders(
      <EmployeeDetails />,
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

    const button = await findByText('deleteEmployee')
    await user.click(button)
    waitFor(() => expect(getByText('deletingTitle')).toBeInTheDocument)

    await user.click(await findByText('yes'))
    waitFor(() => expect(findByText('failTitle')).toBeInTheDocument)

    await user.click(screen.getByText('ok'))
    waitFor(() => expect(findByText('failTitle')).not.toBeInTheDocument)
  })

  it('Testing the failed removal of the candidate', async () => {
    server.use(
      rest.get(`*`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(userMock))
      })
    )

    const { getByTestId, findByText } = renderWithProviders(
      <EmployeeDetails />,
      {
        preloadedState: {
          auth: authSliceMock,
        },
      }
    )

    expect(getByTestId('loading')).toBeInTheDocument()

    waitFor(() => {
      expect(findByText('deleteEmployee')).not.toBeInTheDocument()
    })
  })
})
