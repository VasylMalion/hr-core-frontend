import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

import { BASE_URL } from 'common/constants'
import { FindedUser, UserInfo } from 'common/types/common'
import { getToken } from 'common/utils/common'

type GetAllResponse = {
  users: Array<Partial<UserInfo>>
  count: number
}

type GetAllParams = {
  limit?: number
  page?: number
  filter?: string
}

type GetOneParams = {
  id: string
}

type GetOneResponse = UserInfo

type AddEmployeeParams = Partial<UserInfo>

type AddEmployeeResponse = {}

type FindEmployeeParams = {
  username: string
}

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
    addOne: build.mutation<AddEmployeeResponse, AddEmployeeParams>({
      query: (params) => ({
        url: '/add',
        method: 'POST',
        body: params,
      }),
    }),
    findEmployee: build.query<Array<FindedUser>, FindEmployeeParams>({
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
  useAddOneMutation,
  useFindEmployeeQuery,
  useLazyFindEmployeeQuery,
  useLazyGetAllQuery,
  useGetOneQuery,
  useDeleteOneMutation,
  util
} = EmployeeApi
