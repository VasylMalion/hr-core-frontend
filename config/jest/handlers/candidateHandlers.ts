import { rest } from 'msw'

import { BASE_URL } from '../../../src/common/constants'

// const loginSuccess = rest.post(`${BASE_URL}/login`, async (req, res, ctx) =>
//   res(ctx.status(200))
// )

// const loginFail = rest.post(`${BASE_URL}/login`, async (req, res, ctx) =>
//   res(ctx.status(500))
// )

const getCandidatesSuccess = rest.get(
  `${BASE_URL}/candidates`,
  async (req, res, ctx) => res(ctx.status(200))
)

const getCandidatesFail = rest.get(
  `${BASE_URL}/candidates`,
  async (req, res, ctx) => res(ctx.status(500))
)

const candidateAddingSuccess = rest.post(
  `${BASE_URL}/candidates/add`,
  async (req, res, ctx) => res(ctx.status(200))
)

const candidateAddingFail = rest.post(
  `${BASE_URL}/candidates/add`,
  async (req, res, ctx) => res(ctx.status(500))
)

const getCandidateDetailsSuccess = rest.get(
  `${BASE_URL}/candidates/:id`,
  async (req, res, ctx) => {
    const { id } = req.params
    // Return mock data for the specific candidate ID
    return res(
      ctx.status(200),
      ctx.json({
        id,
        name: 'John',
        surname: 'Doe',
        gender: 'MALE',
        birthDate: '1990-01-01',
        email: 'john@example.com',
        mobileNumber: '1234567890',
        location: 'Some Location',
        position: 'Software Engineer',
        salary: 50000,
      })
    )
  }
)

const getCandidateDetailsFail = rest.get(
  `${BASE_URL}/candidates/1`,
  async (req, res, ctx) => res(ctx.status(500))
)

// const deleteCandidateSuccess = rest.delete(
//   `${BASE_URL}/candidates/1`,
//   async (req, res, ctx) => res(ctx.status(200))
// )

// const deleteCandidateFail = rest.delete(
//   `${BASE_URL}/candidates/1`,
//   async (req, res, ctx) => res(ctx.status(500))
// )

export const handlers = [
  // loginSuccess,
  // loginFail,
  getCandidatesSuccess,
  getCandidatesFail,
  getCandidateDetailsSuccess,
  getCandidateDetailsFail,
  candidateAddingSuccess,
  candidateAddingFail,
  // deleteCandidateSuccess,
  // deleteCandidateFail,
]
