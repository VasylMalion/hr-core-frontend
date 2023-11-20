import { rest } from 'msw'
import { fireEvent, screen, waitFor } from '@testing-library/react'

import { renderWithProviders } from 'common/jest/renderWithProviders'
import { mockTranslations } from 'common/jest/mockModules'
import { authSliceAdminMock } from 'common/mockData'
import { RoutePaths } from 'containers/AppRouter'

import CandidateAdding from './CandidateAdding'
import { server } from '../../../../config/jest/mockHttpServer'

const navigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => navigate,
}))

beforeAll(() => mockTranslations)

describe('Candidate adding component', () => {
  it('Test component with the successful request', async () => {
    const { user, getByText, findByText } = renderWithProviders(
      <CandidateAdding />,
      {
        preloadedState: {
          auth: authSliceAdminMock,
        },
      }
    )

    expect(getByText('title')).toBeInTheDocument()

    // const nameInput = screen.getByLabelText('name')
    // const surnameInput = screen.getByLabelText('surname')
    // const genderInput = screen.getByLabelText('genderTitle')
    // const birthDateInput = screen.getByLabelText('birthDate')
    // const emailInput = screen.getByLabelText('email')
    // const mobileInput = screen.getByLabelText('mobile')
    // const locationInput = screen.getByLabelText('location')
    // const postionInput = screen.getByLabelText('position')
    // const salaryInput = screen.getByLabelText('salary')

    // fireEvent.change(nameInput, { target: { value: 'John' } })
    // fireEvent.change(surnameInput, { target: { value: 'Doe' } })
    // fireEvent.change(genderInput, { target: { value: 'MALE' } })
    // fireEvent.change(birthDateInput, {
    //   target: { value: '1990-05-14T10:00:00.000Z' },
    // })
    // fireEvent.change(emailInput, { target: { value: 'john@example.com' } })
    // fireEvent.change(mobileInput, { target: { value: '+1234567890' } })
    // fireEvent.change(locationInput, { target: { value: 'Some City' } })
    // fireEvent.change(postionInput, { target: { value: 'Software Developer' } })
    // fireEvent.change(salaryInput, { target: { value: 50000 } })

    // server.use(
    //   rest.get(`*`, (req, res, ctx) => {
    //     return res(ctx.status(200), ctx.json({}))
    //   })
    // )

    // await user.click(getByText('create'))
    // waitFor(() => expect(getByText('successTitle')).toBeInTheDocument)

    // await user.click(getByText('ok'))
    // waitFor(() => expect(navigate).toHaveBeenCalledWith(RoutePaths.CANDIDATES))
  })

  // it('Test component with the failed request', async () => {
  //   const { user, getByText } = renderWithProviders(<CandidateAdding />, {
  //     preloadedState: {
  //       auth: authSliceAdminMock,
  //     },
  //   })

  //   expect(getByText('title')).toBeInTheDocument()

  //   const nameInput = screen.getByLabelText('name')
  //   const surnameInput = screen.getByLabelText('surname')
  //   const genderInput = screen.getByLabelText('genderTitle')
  //   const birthDateInput = screen.getByLabelText('birthDate')
  //   const emailInput = screen.getByLabelText('email')
  //   const mobileInput = screen.getByLabelText('mobile')
  //   const locationInput = screen.getByLabelText('location')
  //   const postionInput = screen.getByLabelText('position')
  //   const salaryInput = screen.getByLabelText('salary')

  //   fireEvent.change(nameInput, { target: { value: 'John' } })
  //   fireEvent.change(surnameInput, { target: { value: 'Doe' } })
  //   fireEvent.change(genderInput, { target: { value: 'MALE' } })
  //   fireEvent.change(birthDateInput, {
  //     target: { value: '1990-05-14T10:00:00.000Z' },
  //   })
  //   fireEvent.change(emailInput, { target: { value: 'john@example.com' } })
  //   fireEvent.change(mobileInput, { target: { value: '+1234567890' } })
  //   fireEvent.change(locationInput, { target: { value: 'Some City' } })
  //   fireEvent.change(postionInput, { target: { value: 'Software Developer' } })
  //   fireEvent.change(salaryInput, { target: { value: 50000 } })

  //   server.use(
  //     rest.post(`*`, (req, res, ctx) => {
  //       return res(ctx.status(500), ctx.json('GENERAL_ERROR'))
  //     })
  //   )

  //   await user.click(getByText('create'))
  //   waitFor(() => expect(getByText('failTitle')).toBeInTheDocument)

  //   await user.click(getByText('ok'))
  //   waitFor(() => expect(getByText('failTitle')).not.toBeInTheDocument)
  // })
})
