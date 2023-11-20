import { rest } from 'msw'
import { screen } from '@testing-library/react'
import { generatePath } from 'react-router-dom'

import Candidates from 'containers/Candidates/Candidates'
import { renderWithProviders } from 'common/jest/renderWithProviders'
import { RoutePaths } from 'containers/AppRouter'

import { server } from '../../../config/jest/mockHttpServer'
import { mockCandidatesLarge, mockCandidatesSmall } from 'common/mockData'
import { mockTranslations } from 'common/jest/mockModules'
import Employees from './Employees'

const navigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => navigate,
}))

jest.mock('react-redux', () => ({
  ...(jest.requireActual('react-redux') as any),
  useDispatch: () => jest.fn(),
}))

jest.mock('uuid', () => ({ v4: () => jest.fn() }))

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    }
  },
  initReactI18next: {
    type: '3rdParty',
    init: () => {},
  },
}))

describe('Employees component', () => {
  it('Test content of the heading', async () => {
    const { user } = renderWithProviders(<Employees />)

    const title = screen.getByText('title')
    expect(title).toBeInTheDocument()

    // await user.click(screen.getByRole('button'))
    // expect(navigate).toHaveBeenCalledWith(RoutePaths.EMPLOYEE_ADDING)
  })

  // it('Test component with the successfull request', async () => {
  //   server.use(
  //     rest.get(`*`, (req, res, ctx) => {
  //       return res(ctx.json(mockCandidatesSmall))
  //     })
  //   )

  //   const { user } = renderWithProviders(<Candidates />)

  //   const loading = screen.getByTestId('loading')
  //   expect(loading).toBeInTheDocument()

  //   const rows = await screen.findAllByRole('row')
  //   expect(rows.length).toEqual(4)

  //   const column = await screen.findByText('John Doe')
  //   expect(column).toBeInTheDocument()

  //   await user.click(rows[1])
  //   expect(navigate).toHaveBeenCalledWith(
  //     generatePath(RoutePaths.CANDIDATE_DETAILS, { id: 1 })
  //   )
  // })

  // it('Test component with the successfull request without data', async () => {
  //   server.use(
  //     rest.get(`*`, (req, res, ctx) => {
  //       return res(
  //         ctx.json({
  //           candidates: [],
  //           count: '0',
  //         })
  //       )
  //     })
  //   )

  //   renderWithProviders(<Candidates />)

  //   const loading = screen.getByTestId('loading')
  //   expect(loading).toBeInTheDocument()

  //   const element = await screen.findByTestId('empty-list')
  //   expect(element).toBeInTheDocument()
  // })

  // it('Test component with the successfull request with pagination', async () => {
  //   server.use(
  //     rest.get(`*`, (req, res, ctx) => {
  //       return res(ctx.json(mockCandidatesLarge))
  //     })
  //   )

  //   renderWithProviders(<Candidates />)

  //   const loading = screen.getByTestId('loading')
  //   expect(loading).toBeInTheDocument()

  //   const rows = await screen.findAllByRole('row')
  //   expect(rows.length).toEqual(4)

  //   const element = await screen.findByTestId('pagination')
  //   expect(element).toBeInTheDocument()
  // })

  // it('Test component with the failed request', async () => {
  //   server.use(
  //     rest.get(`*`, (req, res, ctx) => {
  //       return res(ctx.status(500))
  //     })
  //   )

  //   renderWithProviders(<Candidates />)

  //   const loading = screen.getByTestId('loading')
  //   expect(loading).toBeInTheDocument()

  //   const element = await screen.findByTestId('fail')
  //   expect(element).toBeInTheDocument()
  // })
})
