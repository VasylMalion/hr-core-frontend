import { rest } from 'msw'
import { fireEvent, screen, waitFor } from '@testing-library/react'

import { renderWithProviders } from 'common/jest/renderWithProviders'
import { mockTranslations } from 'common/jest/mockModules'
import { authSliceAdminMock, userMock } from 'common/mockData'
import { RoutePaths } from 'containers/AppRouter'

import EmployeeAdding from './EmployeeAdding'
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
      <EmployeeAdding />,
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
    // const addressInput = screen.getByLabelText('address')
    // const departmentInput = screen.getByLabelText('department')
    // const postionInput = screen.getByLabelText('position')
    // const roleInput = screen.getByLabelText('role')
    // const startDateInput = screen.getByLabelText('startDate')

    // fireEvent.change(nameInput, { target: { value: 'John' } })
    // fireEvent.change(surnameInput, { target: { value: 'Doe' } })
    // fireEvent.change(genderInput, { target: { value: 'MALE' } })
    // fireEvent.change(birthDateInput, { target: { value: '1990-05-14T10:00:00.000Z' } })
    // fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    // fireEvent.change(mobileInput, { target: { value: '+1234567890' } })
    // fireEvent.change(addressInput, { target: { value: '123 Main Street' } })
    // fireEvent.change(departmentInput, { target: { value: 'Engineering' } })
    // fireEvent.change(postionInput, { target: { value: 'Software Developer' } })
    // fireEvent.change(roleInput, { target: { value: 'USER' } })
    // fireEvent.change(startDateInput, { target: { value: '2018-07-01T10:00:00.000Z' } })

    // server.use(
    //   rest.post(`*`, (req, res, ctx) => {
    //     return res(ctx.status(200), ctx.json(userMock))
    //   })
    // )

    // await user.click(screen.getByRole('button'))
    // await waitFor(() => expect(getByText('successTitle')).toBeInTheDocument)

    // await user.click(getByText('ok'))
    // await waitFor(() => expect(navigate).toHaveBeenCalledWith(RoutePaths.CANDIDATES))
  })

  // it('Test component with the failed request', async () => {
  //   const { user, getByText } = renderWithProviders(
  //     <EmployeeAdding />,
  //     {
  //       preloadedState: {
  //         auth: authSliceAdminMock,
  //       },
  //     }
  //   )

  //   expect(getByText('title')).toBeInTheDocument()

  //   const nameInput = screen.getByLabelText('name')
  //   const surnameInput = screen.getByLabelText('surname')
  //   const genderInput = screen.getByLabelText('genderTitle')
  //   const birthDateInput = screen.getByLabelText('birthDate')
  //   const emailInput = screen.getByLabelText('email')
  //   const mobileInput = screen.getByLabelText('mobile')
  //   const addressInput = screen.getByLabelText('address')
  //   const departmentInput = screen.getByLabelText('department')
  //   const postionInput = screen.getByLabelText('position')
  //   const roleInput = screen.getByLabelText('role')
  //   const startDateInput = screen.getByLabelText('startDate')

  //   fireEvent.change(nameInput, { target: { value: 'John' } })
  //   fireEvent.change(surnameInput, { target: { value: 'Doe' } })
  //   fireEvent.change(genderInput, { target: { value: 'MALE' } })
  //   fireEvent.change(birthDateInput, { target: { value: '1990-05-14T10:00:00.000Z' } })
  //   fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
  //   fireEvent.change(mobileInput, { target: { value: '+1234567890' } })
  //   fireEvent.change(addressInput, { target: { value: '123 Main Street' } })
  //   fireEvent.change(departmentInput, { target: { value: 'Engineering' } })
  //   fireEvent.change(postionInput, { target: { value: 'Software Developer' } })
  //   fireEvent.change(roleInput, { target: { value: 'USER' } })
  //   fireEvent.change(startDateInput, { target: { value: '2018-07-01T10:00:00.000Z' } })

  //   server.use(
  //     rest.post(`*`, (req, res, ctx) => {
  //       return res(ctx.status(500), ctx.json('GENERAL_ERROR'))
  //     })
  //   )

  //   await user.click(getByText('add'))
  //   waitFor(() => expect(getByText('failTitle')).toBeInTheDocument)

  //   await user.click(getByText('ok'))
  //   waitFor(() => expect(getByText('failTitle')).not.toBeInTheDocument)
  // })
})
