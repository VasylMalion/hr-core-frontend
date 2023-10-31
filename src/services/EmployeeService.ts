import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

import { BASE_URL } from 'common/constants'
import { UserInfo } from 'common/types/common'
import { getToken } from 'common/utils/common'

export type GetAllResponse = {
  users: Array<Partial<UserInfo>>
  count: number
}

export type GetAllParams = {
  limit: number
  page: number
  filter: string
}

export type GetOneParams = {
  id: string
}

export type GetOneResponse = UserInfo

export type AddEmployeeParams = Partial<UserInfo>

export type AddEmployeeResponse = {}

export type FindEmployeeParams = {
  username: string
}

export type FindEmployeeResponse = Pick<UserInfo, 'id' | 'name' | 'surname'>

type DeleteOneParams = {
  id: string
}

type DeleteOneResponse = UserInfo

export const EmployeeApi = createApi({
  reducerPath: 'employeeApi',
  tagTypes: ['Employee'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/employees`,
    prepareHeaders: (headers, { getState }) => getToken(headers, getState)
  }),
  endpoints: (build) => ({
    addEmployee: build.mutation<AddEmployeeResponse, AddEmployeeParams>({
      query: (params) => ({
        url: '/add',
        method: 'POST',
        body: params,
      }),
      invalidatesTags: ['Employee']
    }),
    findEmployee: build.query<Array<FindEmployeeResponse>, FindEmployeeParams>({
      query: (params) => ({
        url: '/search',
        method: 'GET',
        params: {
          username: params.username,
        }
      }),
    }),
    getAll: build.query<GetAllResponse, GetAllParams>({
      query: (params) => ({
        url: '/',
        method: 'GET',
        params: {
          limit: params.limit,
          page: params.page,
          filter: params.filter,
        }
      }),
    }),
    getOne: build.query<GetOneResponse, GetOneParams>({
      query: (params) => ({
        url: `/${params.id}`,
        method: 'GET',
      }),
    }),
    deleteOne: build.mutation<DeleteOneResponse, DeleteOneParams>({
      query: (params) => ({
        url: `/${params.id}`,
        method: 'DELETE',
      }),
    }),
  })
})

export const {
  useAddEmployeeMutation,
  useFindEmployeeQuery,
  useLazyGetAllQuery,
  useGetOneQuery,
  useDeleteOneMutation,
  util
} = EmployeeApi
