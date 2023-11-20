import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

import { UserInfo, Vacancy, VacancyStatus } from 'common/types/common'
import { BASE_URL } from 'common/constants'
import { getToken } from 'common/utils/common'

type GetAllVacanciesParams = {
  status?: VacancyStatus
  limit?: number
  page?: number
  filter?: string
  onlyMine?: boolean
}

type GetAllVacanciesResponse = {
  vacancies: Array<Vacancy>
  count: number
}

type GetOneParams = {
  id: string
}

type GetOneResponse = Vacancy

type DeactivateParams = {
  id: string
}

type AddVacancyParams = {
  department: string
  position: string
  location: string
  description: string
  assignedTo: Pick<UserInfo, 'id' | 'name' | 'surname'>
  salaryMin: string
  salaryMax: string
  deadlineDate: Date
}

type AddTaskParams = {
  id: string
  boardId: string
  candidate: {
    id: string
    name: string
  }
}

type AddTaskResponse = Vacancy

type UpdateTaskParams = {
  vacancyId: string
  id: string
  column: string
}

type DeleteTaskParams = {
  vacancyId: string
  id: string
}

export const VacancyApi = createApi({
  reducerPath: 'vacancyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => getToken(headers, getState),
  }),
  endpoints: (build) => ({
    getAll: build.query<GetAllVacanciesResponse, GetAllVacanciesParams>({
      query: (params) => ({
        url: '/jobs',
        method: 'GET',
        params: {
          ...params,
          onlyMine: params.onlyMine ? 1 : 0,
        },
      }),
    }),
    getOne: build.query<GetOneResponse, GetOneParams>({
      query: ({ id }) => ({
        url: `/jobs/${id}`,
        method: 'GET',
      }),
    }),
    deactivate: build.query<{}, DeactivateParams>({
      query: ({ id }) => ({
        url: `/jobs/${id}/deactivate`,
        method: 'GET',
      }),
    }),
    addOne: build.mutation<{}, AddVacancyParams>({
      query: (params) => ({
        url: '/jobs/add',
        method: 'POST',
        body: {
          department: params.department,
          position: params.position,
          location: params.location,
          description: params.description,
          assignedTo: params.assignedTo,
          salaryMin: parseInt(params.salaryMin),
          salaryMax: parseInt(params.salaryMax),
          deadlineDate: params.deadlineDate,
        },
      }),
    }),
    addTask: build.mutation<AddTaskResponse, AddTaskParams>({
      query: (params) => ({
        url: `/jobs/${params.id}/task`,
        method: 'POST',
        body: {
          boardId: params.boardId,
          candidate: params.candidate,
        },
      }),
    }),
    deleteTask: build.mutation<{}, DeleteTaskParams>({
      query: (params) => ({
        url: `/jobs/${params.vacancyId}/task`,
        method: 'DELETE',
        body: {
          id: params.id,
        },
      }),
    }),
    updateTask: build.mutation<{}, UpdateTaskParams>({
      query: (params) => ({
        url: `/jobs/${params.vacancyId}/updateTask`,
        method: 'POST',
        body: {
          id: params.id,
          column: params.column,
        },
      }),
    }),
  }),
})

export const {
  useGetOneQuery,
  useLazyGetOneQuery,
  useDeactivateQuery,
  useLazyDeactivateQuery,
  useAddOneMutation,
  useLazyGetAllQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  util,
} = VacancyApi
