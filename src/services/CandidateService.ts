import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

import { BASE_URL } from 'common/constants';
import { Candidate, UserInfo } from 'common/types/common';
import { getToken } from 'common/utils/common';

export type AddCandidateParams = Omit<Candidate, 'id'>

export type AddCandidateResponse = {}

export type FindCandidateParams = {
  username: string
}

export type FindCandidateResponse = Pick<Candidate, 'id' | 'name'>


type GetAllResponse = {
  candidates: Array<Candidate>
  count: number
}

type GetAllParams = {
  limit: number
  page: number
  filter: string
  onlyMine: boolean
}

type GetOneParams = {
  id: string
}

type GetOneResponse = Candidate

type DeleteOneParams = {
  id: string
}

type DeleteOneResponse = Candidate

export const CandidateApi = createApi({
  reducerPath: 'candidateApi',
  tagTypes: ['Candidate'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/candidates`,
    prepareHeaders: (headers, { getState }) => getToken(headers, getState)
  }),
  endpoints: (build) => ({
    addCandidate: build.mutation<AddCandidateResponse, AddCandidateParams>({
      query: (params) => ({
        url: '/add',
        method: 'POST',
        body: params,
      }),
    }),
    findCandidate: build.query<Array<FindCandidateResponse>, FindCandidateParams>({
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
          filter: params.filter,
          onlyMine: params.onlyMine ? 1 : 0,
        }
      }),
    }),
    getOne: build.query<GetOneResponse, GetOneParams>({
      query: (params) => ({
        url: `/${params.id}`,
        method: 'GET',
      }),
    }),
    deleteOne: build.query<DeleteOneResponse, DeleteOneParams>({
      query: (params) => ({
        url: `/${params.id}`,
        method: 'DELETE',
      }),
    }),
  })
})

export const {
  useAddCandidateMutation,
  useLazyFindCandidateQuery,
  useLazyGetAllQuery,
  useGetOneQuery,
  useLazyDeleteOneQuery,
  util
} = CandidateApi
