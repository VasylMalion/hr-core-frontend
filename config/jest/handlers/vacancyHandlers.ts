import { rest } from 'msw'

import { BASE_URL } from '../../../src/common/constants'

const getVacanciesSuccess = rest.get(
  `${BASE_URL}/jobs`,
  async (req, res, ctx) => res(ctx.status(200))
)

const getVacanciesFail = rest.get(
  `${BASE_URL}/jobs`,
  async (req, res, ctx) => res(ctx.status(500))
)

export const handlers = [
  getVacanciesSuccess,
  getVacanciesFail,
]
