import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { BASE_URL } from 'common/constants';
import { RootState } from 'store/store';

export type AddEmployeeParams = {
  gender: string
  name: string
  surname: string
  birthDate: Date
  email: string
  mobile: string
  address: string
  department: string
  position: string
  role: string
  startDate: Date
}

export type FindEmployeeParams = {
  username: string
}

export type FindEmployeeResponse = {
  id: string
  name: string
  surname: string
}

type User = {
  _id: string
  name: string
  surname: string
  birthDate: Date
  mobileNumber: string
  position: string
  address: string
  email: string
  gender: string
  startDate: Date
  department: string
  role: string
}

export type GetAllResponse = {
  users: Array<Partial<User>>
  count: number
}

export type GetAllParams = {
  limit: number
  page: number
}

export type GetOneParams = {
  id: string
}

export type GetOneResponse = User

type AddEmployeeResponse = {}

export const EmployeeApi = createApi({
  reducerPath: 'employeeApi',
  tagTypes: ['Employee'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/employees`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.userToken

      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      return headers
    }
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
          limit: 10,
          page: params.page,
        }
      }),
    }),
    getOne: build.query<GetOneResponse, GetOneParams>({
      query: (params) => ({
        url: `/${params.id}`,
        method: 'GET',
      }),
    }),
  })
})

export const { useAddEmployeeMutation, util, useFindEmployeeQuery, useGetAllQuery, useGetOneQuery } = EmployeeApi
