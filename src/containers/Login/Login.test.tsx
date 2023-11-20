import { rest } from 'msw'
import { fireEvent, screen, waitFor } from '@testing-library/react'

import { mockTranslations } from 'common/jest/mockModules'
import { authSliceMock } from 'common/mockData'
import { RoutePaths } from 'containers/AppRouter'

import { renderWithProviders } from '../../../config/jest/testUtils'
import { server } from '../../../config/jest/mockHttpServer'
import Login from './Login'

const navigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => navigate,
}))

beforeAll(() => {
  mockTranslations
})

describe('Login component', () => {
  it('Success request', async () => {
    const { user } = renderWithProviders(<Login />)

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })

    server.use(
      rest.post(`*`, (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            userToken: authSliceMock.userToken,
            userInfo: authSliceMock.userInfo,
          })
        )
      })
    )

    await user.click(screen.getByRole('button'))

    await waitFor(() => expect(navigate).toHaveBeenCalledWith(RoutePaths.DASHBOARD))
  })

  it('Fail request', async () => {
    server.use(
      rest.post(`*`, (req, res, ctx) => {
        return res(ctx.status(400), ctx.json('INVALID_BODY'))
      })
    )

    const { user } = renderWithProviders(<Login />)

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })

    await user.click(screen.getByRole('button'))

    await waitFor(() => {
      expect(screen.getByText('errors.INVALID_BODY')).toBeInTheDocument
      expect(navigate).not.toHaveBeenCalledWith(RoutePaths.DASHBOARD)
    })
  })
})
