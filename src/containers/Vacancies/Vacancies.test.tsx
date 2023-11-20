import { rest } from 'msw'
import { screen } from '@testing-library/react'
import { generatePath } from 'react-router-dom'

import { renderWithProviders } from 'common/jest/renderWithProviders'
import { RoutePaths } from 'containers/AppRouter'

import { server } from '../../../config/jest/mockHttpServer'
import Vacancies from './Vacancies'

import {
  mockCandidatesLarge,
  mockCandidatesSmall,
  mockVacanciesLarge,
  mockVacanciesShort,
} from 'common/mockData'
import { mockTranslations } from 'common/jest/mockModules'

const navigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => navigate,
}))

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

describe('Vacancies component', () => {
  it('Test content of the heading', async () => {
    const { user } = renderWithProviders(<Vacancies />)

    const title = screen.getByText('title')
    expect(title).toBeInTheDocument()

    const navigation = screen.getByTestId('tab-navigation')
    expect(navigation).toBeInTheDocument()

    await user.click(screen.getByRole('button'))
    expect(navigate).toHaveBeenCalledWith(RoutePaths.VACANCY_ADDING)
  })

  it('Test component with the successfull request', async () => {
    server.use(
      rest.get(`*`, (req, res, ctx) => {
        return res(ctx.json(mockVacanciesShort))
      })
    )

    const { user } = renderWithProviders(<Vacancies />)

    const loading = screen.getByTestId('loading')
    expect(loading).toBeInTheDocument()

    const vacancies = await screen.findAllByTestId('vacancy')
    expect(vacancies.length).toEqual(3)

    expect(screen.getByText('Software Engineer')).toBeInTheDocument()
    expect(screen.getByText('New York')).toBeInTheDocument()
    expect(
      screen.getByText('Join our talented team as a Software Engineer!')
    ).toBeInTheDocument()

    await user.click(vacancies[0])
    expect(navigate).toHaveBeenCalledWith(
      generatePath(RoutePaths.VACANCY_DETAILS, { id: 1 })
    )
  })

  it('Test component with the successfull request without data', async () => {
    server.use(
      rest.get(`*`, (req, res, ctx) => {
        return res(
          ctx.json({
            vacancies: [],
            count: '0',
          })
        )
      })
    )

    renderWithProviders(<Vacancies />)

    const loading = screen.getByTestId('loading')
    expect(loading).toBeInTheDocument()

    const element = await screen.findByTestId('empty-list')
    expect(element).toBeInTheDocument()
  })

  it('Test component with the successfull request with pagination', async () => {
    server.use(
      rest.get(`*`, (req, res, ctx) => {
        return res(ctx.json(mockVacanciesLarge))
      })
    )

    renderWithProviders(<Vacancies />)

    const loading = screen.getByTestId('loading')
    expect(loading).toBeInTheDocument()

    const vacancies = await screen.findAllByTestId('vacancy')
    expect(vacancies.length).toEqual(4)

    expect(screen.getByText('Software Engineer')).toBeInTheDocument()
    expect(screen.getByText('New York')).toBeInTheDocument()
    expect(
      screen.getByText('Join our talented team as a Software Engineer!')
    ).toBeInTheDocument()

    const element = await screen.findByTestId('pagination')
    expect(element).toBeInTheDocument()
  })

  it('Test component with the failed request', async () => {
    server.use(
      rest.get(`*`, (req, res, ctx) => {
        return res(ctx.status(500))
      })
    )

    renderWithProviders(<Vacancies />)

    const loading = screen.getByTestId('loading')
    expect(loading).toBeInTheDocument()

    const element = await screen.findByTestId('fail')
    expect(element).toBeInTheDocument()
  })
})
