import { rest } from 'msw'
import { fireEvent, screen } from '@testing-library/react'
import { generatePath } from 'react-router-dom'

import { renderWithProviders } from 'common/jest/renderWithProviders'
import { RoutePaths } from 'containers/AppRouter'
import { mockRedux, mockTranslations, mockUuid } from 'common/jest/mockModules'
import {
  authSliceAdminMock,
  authSliceMock,
  mockEmployeesLarge,
  mockEmployeesShort,
} from 'common/mockData'

import { server } from '../../../config/jest/mockHttpServer'
import Employees from './Employees'

const navigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => navigate,
}))

beforeAll(() => {
  mockRedux
  mockTranslations
  mockUuid
})

describe('Employees component', () => {
  it('Test content of the heading (admin)', async () => {
    const { user } = renderWithProviders(<Employees />, {
      preloadedState: {
        auth: authSliceAdminMock,
      },
    })

    const title = screen.getByText('title')
    expect(title).toBeInTheDocument()

    await user.click(screen.getByRole('button'))
    expect(navigate).toHaveBeenCalledWith(RoutePaths.EMPLOYEE_ADDING)
  })

  it('Test content of the heading (user)', async () => {
    renderWithProviders(<Employees />, {
      preloadedState: {
        auth: authSliceMock,
      },
    })

    const title = screen.getByText('title')
    expect(title).toBeInTheDocument()

    const button = screen.queryByRole('button')
    expect(button).toBeNull()
  })

  it('Test component with the successfull request', async () => {
    server.use(
      rest.get('*', (req, res, ctx) => {
        return res(ctx.json(mockEmployeesShort))
      })
    )

    const { user } = renderWithProviders(<Employees />)

    const loading = screen.getByTestId('loading')
    expect(loading).toBeInTheDocument()

    const rows = await screen.findAllByRole('row')
    expect(rows.length).toEqual(4)

    const column = await screen.findByText('John Doe')
    expect(column).toBeInTheDocument()

    await user.click(rows[1])
    expect(navigate).toHaveBeenCalledWith(
      generatePath(RoutePaths.EMPLOYEE_DETAILS, { id: 1 })
    )
  })

  it('Test component with the successfull request without data', async () => {
    server.use(
      rest.get('*', (req, res, ctx) => {
        return res(
          ctx.json({
            users: [],
            count: '0',
          })
        )
      })
    )

    renderWithProviders(<Employees />)

    const loading = screen.getByTestId('loading')
    expect(loading).toBeInTheDocument()

    const element = await screen.findByTestId('empty-list')
    expect(element).toBeInTheDocument()
  })

  it('Test component with the successfull request with pagination', async () => {
    server.use(
      rest.get('*', (req, res, ctx) => {
        return res(ctx.json(mockEmployeesLarge))
      })
    )

    renderWithProviders(<Employees />)

    const loading = screen.getByTestId('loading')
    expect(loading).toBeInTheDocument()

    const rows = await screen.findAllByRole('row')
    expect(rows.length).toEqual(5)

    const element = await screen.findByTestId('pagination')
    expect(element).toBeInTheDocument()
  })

  it('Test component with the failed request', async () => {
    server.use(
      rest.get('*', (req, res, ctx) => {
        return res(ctx.status(500))
      })
    )

    renderWithProviders(<Employees />)

    const loading = screen.getByTestId('loading')
    expect(loading).toBeInTheDocument()

    const element = await screen.findByTestId('fail')
    expect(element).toBeInTheDocument()
  })
})
