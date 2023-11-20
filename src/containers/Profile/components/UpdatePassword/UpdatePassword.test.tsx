import { rest } from 'msw'
import { fireEvent, screen } from '@testing-library/react'

import { mockTranslations } from 'common/jest/mockModules'
import { authSliceMock } from 'common/mockData'

import UpdatePassword from './UpdatePassword'
import { server } from '../../../../../config/jest/mockHttpServer'
import { renderWithProviders } from '../../../../../config/jest/testUtils'

beforeAll(() => mockTranslations)

describe('Update password component', () => {
  it('Success request', async () => {
    const { user } = renderWithProviders(<UpdatePassword />, {
      preloadedState: {
        auth: authSliceMock,
      },
    })

    const currentPassInput = screen.getByLabelText('passwordOld')
    const newPassInput = screen.getByLabelText('passwordNew')
    const repeatNewPassInput = screen.getByLabelText('passwordNewAgain')

    fireEvent.change(currentPassInput, { target: { value: 'password123' } })
    fireEvent.change(newPassInput, { target: { value: 'password123New' } })
    fireEvent.change(repeatNewPassInput, {
      target: { value: 'password123New' },
    })

    server.use(
      rest.post(`*`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({}))
      })
    )

    await user.click(screen.getByText('update'))

    const successTitle = screen.getByText('successTitle')
    expect(successTitle).toBeInTheDocument

    await user.click(screen.getByText('ok'))

    expect(successTitle).not.toBeInTheDocument
  })

  it('Fail request', async () => {
    const { user } = renderWithProviders(<UpdatePassword />, {
      preloadedState: {
        auth: authSliceMock,
      },
    })

    const currentPassInput = screen.getByLabelText('passwordOld')
    const newPassInput = screen.getByLabelText('passwordNew')
    const repeatNewPassInput = screen.getByLabelText('passwordNewAgain')

    fireEvent.change(currentPassInput, { target: { value: 'password123' } })
    fireEvent.change(newPassInput, { target: { value: 'password123New' } })
    fireEvent.change(repeatNewPassInput, {
      target: { value: 'password123New' },
    })

    server.use(
      rest.post(`*`, (req, res, ctx) => {
        return res(ctx.status(400), ctx.json('INVALID_PASSWORD'))
      })
    )

    await user.click(screen.getByText('update'))

    const failTitle = screen.getByText('failTitle')
    expect(failTitle).toBeInTheDocument

    const failDescription = screen.getByText('errors.INVALID_PASSWORD')
    expect(failDescription).toBeInTheDocument

    await user.click(screen.getByText('ok'))

    expect(failTitle).not.toBeInTheDocument
  })
})
