import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

import { UserInfo, Vacancy, VacancyStatus } from 'common/types/common';
import { BASE_URL } from 'common/constants';
import { getToken } from 'common/utils/common';

type GetAllVacanciesParams = {
  status?: VacancyStatus
  limit?: number
  page?: number 
}

type GetAllVacanciesResponse = {
  vacancies: Array<Vacancy>
  count: number
}

type AddVacancyParams = {
  department: string
  position: string
  location: string
  description: string
  assignedTo: Pick<UserInfo, 'id' | 'name' | 'surname'>
}

type AddVacancyResponse = {}

export const VacancyApi = createApi({
  reducerPath: 'vacancyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => getToken(headers, getState)
  }),
  endpoints: (build) => ({
    getVacancies: build.query<GetAllVacanciesResponse, GetAllVacanciesParams>({
      query: (params) => ({
        url: '/jobs',
        method: 'GET',
        params,
      })
    }),
    addVacancy: build.mutation<AddVacancyResponse, AddVacancyParams>({
      query: (params) => ({
        url: '/jobs/add',
        method: 'POST',
        body: params,
      })
    }),
  })
})

export const { useGetVacanciesQuery, useAddVacancyMutation, useLazyGetVacanciesQuery } = VacancyApi
